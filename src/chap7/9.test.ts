import expect from 'expect.js';
import { add, one, succ, three, two, zero } from './9';

const counter = (init: number) => {
  let _init = init;
  return () => {
    _init = _init + 1;
    return _init;
  };
};

describe('Church numeral', () => {
  it('one', () => {
    // 書籍では expect(one(counter(0))()).to.eql(1); となっているが、それではtypeが合わない。渡しても使わない0を与える必要がある
    expect(one(counter(0))(0)).to.eql(1);
  });
  it('two', () => {
    expect(two(counter(0))(0)).to.eql(2);
  });
  it('tree', () => {
    expect(three(counter(0))(0)).to.eql(3);
  });
  it('succ', () => {
    expect(succ(one)(counter(0))(0)).to.eql(2);
    expect(succ(two)(counter(0))(0)).to.eql(3);
  });
  it('add', () => {
    expect(add(zero)(one)(counter(0))(0)).to.eql(1);
    expect(add(one)(two)(counter(0))(0)).to.eql(3);
    expect(add(two)(three)(counter(0))(0)).to.eql(5);
  });
});
