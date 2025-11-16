import expect from 'expect.js';
import { sum, length, product, all, any, list, reverse, find } from './58';
import { isEven } from './13';

describe('foldr', () => {
  const seq = list.cons(
    1,
    list.cons(2, list.cons(3, list.cons(4, list.empty())))
  );
  const allTrueList = list.cons(
    true,
    list.cons(true, list.cons(true, list.empty()))
  );
  const someFalseList = list.cons(
    true,
    list.cons(true, list.cons(false, list.empty()))
  );
  it('sum', () => {
    expect(sum(seq)).to.eql(10);
  });
  it('length', () => {
    expect(length(seq)).to.eql(4);
  });
  it('product', () => {
    expect(product(seq)).to.eql(24);
  });
  it('all', () => {
    expect(all(allTrueList)).to.eql(true);
    expect(all(someFalseList)).to.eql(false);
  });
  it('any', () => {
    expect(any(allTrueList)).to.eql(true);
    expect(any(someFalseList)).to.eql(true);
  });
  it('reverse', () => {
    expect(list.toArray(reverse(seq))).to.eql([4, 3, 2, 1]);
  });
  it('find', () => {
    expect(find(seq)(isEven)).to.eql(2);
  });
});
