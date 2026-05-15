describe.skip('Tree Iterators', () => {

  // For this task, we need a datatype that will define a tree
  // Tree<T> should be a recursive and generic datatype, use sample data below

  // define Tree<T> datatype here

  const tree: Tree<string> = {
    value: 'A',
    children: [{
      value: 'B',
      children: [{
        value: 'E'
      }, {
        value: 'F'
      }, {
        value: 'G'
      }]
    }, {
      value: 'C',
      children: [{
        value: 'M',
        children: [{
          value: 'R'
        }]
      }, {
        value: 'N',
        children: [{
          value: 'S'
        }]
      }]
    }, {
      value: 'D',
      children: []
    }]
  }

  const getConcat = (result = '') => ({
    concat: (item: string) => { result += item; },
    getResult: () => result,
  })

  const getPusher = (result = [] as string[]) => ({
    push: (item: string) => { result.push(item); },
    getResult: () => result,
  })

  describe('with functions', () => {

    // implement a function that will do a depth-first traversal on a given tree (1st param)
    // and execute the callback (2nd param) on each node, in appropriate order

    // define traverseDepth function here

    it('performs depth-first traversal (concat)', () => {
      const { concat, getResult } = getConcat()
      traverseDepth(tree, concat);
      expect(getResult()).toEqual('ABEFGCMRNSD');
    })

    it('performs depth-first traversal (push)', () => {
      const { push, getResult } = getPusher()
      traverseDepth(tree, push);
      expect(getResult()).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);
    })

    // implement a function that will do a breadth-first traversal on a given tree (1st param)
    // and execute the callback (2nd param) on each node, in appropriate order

    // define traverseBreadth function here

    it('performs breadth-first traversal (concat)', () => {
      const { concat, getResult } = getConcat()
      traverseBreadth(tree, concat);
      expect(getResult()).toEqual('ABCDEFGMNRS');
    })

    it('performs breadth-first traversal (push)', () => {
      const { push, getResult } = getPusher()
      traverseBreadth(tree, push);
      expect(getResult()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);
    })

  })

  describe('with generators', () => {

    // define StringTreeIterator datatype

    it('performs depth-first traversal', () => {
      // now, instead of a function, implement a generator that will iterate over
      // the tree structure, in depth-first order

      // implement iterateDepthFirst generator here

      let iterator: StringTreeIterator;
      iterator = iterateDepthFirst(tree);
      expect([...iterator]).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);

      iterator = iterateDepthFirst(tree);
      expect(iterator.next().value).toEqual('A');
      expect(iterator.next().value).toEqual('B');
      expect(iterator.next().value).toEqual('E');
      expect(iterator.next().value).toEqual('F');
    })

    it('performs breadth-first traversal', () => {
      // same as above, instead of a function, implement a generator for a breadth-first order

      // implement iterateBreadthFirst generator here

      let iterator: StringTreeIterator;
      iterator = iterateBreadthFirst(tree);
      expect([...iterator]).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);

      iterator = iterateBreadthFirst(tree);
      expect(iterator.next().value).toEqual('A');
      expect(iterator.next().value).toEqual('B');
      expect(iterator.next().value).toEqual('C');
      expect(iterator.next().value).toEqual('D');
    })

  })

})
