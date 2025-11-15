import expect from 'expect.js';
import { ContinuesOnFailure, find } from './71';
import { enumFrom, stream } from '../chap6/14';

describe('break by continues', () => {
  const identity = <T>(x: T): T => x;
  const continuesOnSuccess = identity;
  const continuesOnFailure: ContinuesOnFailure<number> = (
    aStream,
    predicate,
    continuesOnRecursion,
    escapesFromRecursion
  ) => find(aStream, predicate, continuesOnRecursion, escapesFromRecursion);

  it('find returns null if not found', () => {
    const upto3 = stream.cons(1, () =>
      stream.cons(2, () => stream.cons(3, () => stream.empty()))
    );
    expect(
      find(upto3, (item) => item === 4, continuesOnFailure, continuesOnSuccess)
    ).to.be(null);
  });
  it('finds 100 from infinite int stream', () => {
    const integers = enumFrom(0);
    expect(
      find(
        integers,
        (item) => item === 100,
        continuesOnFailure,
        continuesOnSuccess
      )
    ).to.eql(100);
  });
});
