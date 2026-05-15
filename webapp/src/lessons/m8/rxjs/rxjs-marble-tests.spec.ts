import { TestScheduler } from 'rxjs/testing'
import { merge, concat } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'

const createScheduler = () => new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

/**
 * 🔥 MARBLE TESTS
 * 
 * expectObservable: asercje na strumieniu wynikowym
 * expectSubscriptions: asercje na subskrypcji jako takiej (od kiedy, do kiedy)
 * 
 * cold - symulowany “cold”, subskrypcja automatycznie przy starcie testu
 * hot - symulowany “hot”, który działa wcześniej, subskrypcja w punkcie oznaczonym przez ^
 * 
 * | - standardowo oznacza COMPLETE
 * ! - oznacza zakończenie subskrypcji
 * - - pierwszy element osi (pierwszy frame) - tzw. "zero frame"
 */

describe('RxJS subscriptions', () => {

  it('should apply operators and then emit', () => {
    // elementy na wejściu, przechodzą przez operator `map`
    // i na wyjściu przemapowane elementy
    const testScheduler = createScheduler();
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const a =   cold("--2--3--|");
      const asub =     "^-------!";
      const expected = "--4--9--|";
      const result = a.pipe(
        map(x => String(Number(x)**2)) // 🔥 konwersja na stringa (potrzebne dla marble'i)
      )
      expectObservable(result).toBe(expected);
      expectSubscriptions(a.subscriptions).toBe(asub);
    });
  });

  it('should emit three notifications at the same time', () => {
    // a, b, c - cold - więc emitowanie elementów wynikowych zaczyna się wraz z początkiem subskrypcji (nie wcześniej)
    // merge - więc łączymy w czasie rzeczywistym
    // (135) - oznacza, że w tym punkcie (oznaczonym przez otwarcie nawiasu) leci WIELE eventów jednocześnie
    // ot, po prostu połączone po 3 eventy w tym samym punkcie czasu
    // dodatkowo, expectSubscriptions sprawdza, jak długo trwają subskrypcje
    const testScheduler = createScheduler();
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const a =   cold("-1-------2-----|");
      const b =   cold("-3-------4-----|");
      const c =   cold("-5-------6-----|");
      const asub =     "^--------------!";
      const bsub =     "^--------------!";
      const csub =     "^--------------!";
      const expected = "-(135)---(246)-|";

      const result = merge(a, b, c);

      expectObservable(result).toBe(expected);
      expectSubscriptions(a.subscriptions).toBe(asub);
      expectSubscriptions(b.subscriptions).toBe(bsub);
      expectSubscriptions(c.subscriptions).toBe(csub);
    });
  });

  it('should re-emit events according to concat result', () => {
    // analogicznie jak z merge - tylko tutaj `concat` - sekwencyjnie
    // (najpierw jeden strumień musi się skończyć emitowanie, aby drugi mógł rozpocząć)
    // wynik:
    // - z jednej strony emitowane elementy są odpowiednio przesunięte na wynikowej osi czasu
    // - z drugiej - co jest logiczne - subskrypcje na poszczególnych składowych concata nie następują obie od razu. Tylko - znowu - najpierw jedno skończy, aby drugie dopiero mogło zacząć (osie subskrypcji to ilustrują)
    const testScheduler = createScheduler();
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const a =   cold("-1-2-|");
      const b =   cold(     "-3-4-|");
      const c =   cold(          "-5-6-|");
      const asub =     "^----!";
      const bsub =     "-----^----!";
      const csub =     "----------^----!";
      const expected = "-1-2--3-4--5-6-|";
      const result$ = concat(a, b, c);

      expectObservable(result$).toBe(expected);

      expectSubscriptions(a.subscriptions).toBe(asub);
      expectSubscriptions(b.subscriptions).toBe(bsub);
      expectSubscriptions(c.subscriptions).toBe(csub);
    });
  });

  it('should re-emit only throttled events', () => {
    // tutaj "throttlujemy" 🙃 tzn. przepuszczamy pierwszy event
    //   a potem przez "odcinek czasu" nie puszczamy nic - a po jego upływie - zwalniamy blokadę
    // i tak się dzieje, że "a" się łapie, a b i c są blokowane. Potem X się łapie, a d i e są blokowane
    const testScheduler = createScheduler();
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 =  cold('-a-b-cXd-e-|');
      const subs =     '^----------!';
      const expected = '-a----X----|';

      const result$ = e1.pipe(
        throttleTime(4, testScheduler)
      )

      expectObservable(result$).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  });

  it('should start notifying only after the subscription is active ', () => {
    // wchodzi hot, będzie 🔥🔥🔥
    // połączenie `hot` oraz `expectObservable(source, sub)`:
    //   strumień, skoro hot, to emituje wcześniej - ale subskrypcja zaczyna się _dopiero_ w momencie określonym w `sub`
    //   i tak oto expect1 - nie zawiera e, f, g - bo wprawdzie subskrypcja rozpoczęła się odpowiednio wcześnie - ale zakończyła się przed zamknięciem strumienia i niektóre elementy "przepadły"
    //   z kolei expect2 - nie zawiera a, b, c - bo subskrypcja rozpoczęła się później - A strumień hot już emitował
    const testScheduler = createScheduler();
    testScheduler.run(({ cold, hot, expectObservable }) => {
      const source = hot('--a--b--c--d--e--f--g--');
      const sub1 = '      --^-----------!';
      const sub2 = '      ---------^--------!';
      const expect1 = '   --a--b--c--d--';
      const expect2 = '   -----------d--e--f-';
      expectObservable(source, sub1).toBe(expect1);
      expectObservable(source, sub2).toBe(expect2);
    });
  });

  describe('hot', () => {
    it('should re-emit events only after "frame zero"', () => {
      // ^ - tzw. offet, oznaczenie punktu, kiedy testowany observable subskrybują hot stream
      // 🔥 brak subskrypcji przed ^, więc elementy "przepadają"
      // (hot emituje, ale nikt na początku nie subskrybuje)
      const testScheduler = createScheduler();
      testScheduler.run(({ hot, expectObservable }) => {
        const a = hot( "0-^-1-2-|");
        const expected = "--1-2-|";
        expectObservable(a).toBe(expected);
      });
    });

    it('should re-emit events according to cold or hot subscription', () => {
      const testScheduler = createScheduler();
      testScheduler.run(({ cold, hot, expectObservable, expectSubscriptions }) => {
        // soczysta kombinacja hot i cold streams w 1 sekwencji `concat`
        // najpierw jest A `cold`, więc startujemy wraz z początkiem  subskrypcji (frame zero) - przechodzi do wyniku
        // potem jest B `hot`, który rozpoczyna emisję również na frame zero
        //    ALE z racji że ostateczny wynik to concat, to wynikowy strumień rozpocznie subskrybowanie na B dopiero jak zakończy na A
        //    i sęk w tym, że - kiedy wynik jeszcze nie subskrybuje B, to B już emituje. I te elementy "przepadają" (3)
        // potem jest C `hot`, analogicznie; dopóki B jest aktywnie subskrybowany, wszystko co `hot` C wypchnie zanim samo będzie subskrybowanee, przepada
        // na koniec D `cold`. Rozpoczyna emisję, kiedy jest subskrybowane. A to następuje, kiedy concat (wynikowy) przepnie się z C na D.
        //    i dlatego oś D jest niejako "doklejana" na koniec wynikowej osi        
        const a =   cold("--1--2--|");
        const b =    hot("^----3----4--|");
        const c =    hot("^-------5---6---7---8-|");
        const d =   cold("-9-|");
        const asub =     "^-------!";
        const bsub =     "--------^----!";
        const csub =     "-------------^--------!";
        const dsub =     "----------------------^--!";
        const expected = "--1--2----4-----7---8--9-|";
        const result = concat(a, b, c, d);
        expectObservable(result).toBe(expected);
        expectSubscriptions(a.subscriptions).toBe(asub);
        expectSubscriptions(b.subscriptions).toBe(bsub);
        expectSubscriptions(c.subscriptions).toBe(csub);
        expectSubscriptions(d.subscriptions).toBe(dsub);
      });
    });

  })

});
