import expect from 'expect.js';
import { fromArray } from './62';
import { listFoldr } from './58';

describe('fromArray', () => {
  it('[0, 1, 2, 3]', () => {
    const theList = fromArray([0, 1, 2, 3]);
    expect(listFoldr.toArray(theList)).to.eql([0, 1, 2, 3]);
  });
});
