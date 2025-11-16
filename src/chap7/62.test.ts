import expect from 'expect.js';
import { fromArray } from './62';
import { list } from './58';

describe('fromArray', () => {
  it('[0, 1, 2, 3]', () => {
    const theList = fromArray([0, 1, 2, 3]);
    expect(list.toArray(theList)).to.eql([0, 1, 2, 3]);
  });
});
