# Moduł 9 - Obsługa Błędów - PRACA DOMOWA

## Chaos Engineering

- wypróbuj różne podejścia do inżynierii chaosu z setupu ANF
- spróbuj je potem zastosować w projekcie, przy którym pracujesz.

## Własny Projekt

- zrób audyt projektu, przy którym obecnie pracujesz, pod kątem obsługi błędów. Przygotuj listę rekomendacji, co należałoby w tej kwestii poprawić. Ustal również listę priorytetów.
- wybierz jeden proces biznesowy z projektu, przy którym pracujesz i **zaprojektuj logi**, jakie chciał(a)byś, aby system przechowywał. Tak, abyś w razie awarii (zarówno tych, których się spodziewasz, jak i niespodziewanych) - był(a) w stanie odtworzyć co się wydarzyło + dlaczego.

## Implementacja + testy

- wybierz jeden z procesów biznesowych, które przewinęły się przez nasze szkolenie: change limits, egzamin, plany kadrowe, etc.
- dodaj do wybranego procesu **logowanie**. Znajdź przypadki brzegowe w procesie - i uwzględnij je w logach. Na koniec - pokryj logowanie testami, aby mieć pewność, że nie masz na nich regresji.
- analogicznie - **obsługa błędów**. Dodaj do wybranego procesu wywołania try..catche, wznawianie żądań, obsłuż to z perspektywy UI-a… i finalnie - napisz testy.
- dodaj **error recovery** (czyli odblokowanie UI - jeśli błędy są **niekrytyczne**)
- przeklikaj wybrany proces biznesowy, **symulując faile HTTP** (przy użyciu inżynierii chaosu). Dodaj w odpowiednich miejscach **retry**. Dodaj odpowiednie testy.

## Storybook

- dla wybranego procesu biznesowego skonfiguruj **nowe story**, które będzie **demonstrowało obsługę błędów**
- można zahardkodować, które żądanie HTTP ma failować, można też je w jakiś sposób skonfigurować. Może `msw`, a może inaczej. Może faile będą dotyczyły zerwanego połączenia - a może faili po stronie backendu. Decyzja należy do Ciebie, jak to rozwiązać
- cel, jaki chcemy osiągnąć przez tworzenie tego nowego story: klientowi (np. biznesowy, UX designerowi itp) ma być wygodnie i łatwo **przeklikać** przez ten proces - i zobaczyć, jak się **zachowa**, jeśli coś się nie powiodło. Uwzględniamy "sad paths".
