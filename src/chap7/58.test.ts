import expect from 'expect.js';
import { sum, length, product, all, any, listFoldr, reverse, find } from './58';
import { isEven } from './13';

describe('foldr', () => {
  const seq = listFoldr.cons(
    1,
    listFoldr.cons(2, listFoldr.cons(3, listFoldr.cons(4, listFoldr.empty())))
  );
  const allTrueList = listFoldr.cons(
    true,
    listFoldr.cons(true, listFoldr.cons(true, listFoldr.empty()))
  );
  const someFalseList = listFoldr.cons(
    true,
    listFoldr.cons(true, listFoldr.cons(false, listFoldr.empty()))
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
    expect(listFoldr.toArray(reverse(seq))).to.eql([4, 3, 2, 1]);
  });
  it('find', () => {
    expect(find(seq)(isEven)).to.eql(2);
  });
});
