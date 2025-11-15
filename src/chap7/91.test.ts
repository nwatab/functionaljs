import expect from 'expect.js';
import { maybe, MAYBE, Maybe } from './91';

describe('maybe monad', () => {
  it('addition', () => {
    const add = (maybeA: Maybe<number>, maybeB: Maybe<number>) =>
      MAYBE.flatMap(maybeA)((a) =>
        MAYBE.flatMap(maybeB)((b) => MAYBE.unit(a + b))
      );
    const justOne = maybe.just(1);
    const justTwo = maybe.just(2);
    expect(MAYBE.getOrElse(add(justOne, justOne))(null)).to.eql(2);
    expect(MAYBE.getOrElse(add(justOne, justTwo))(null)).to.eql(3); // 書籍にはないexpection
    expect(MAYBE.getOrElse(add(justOne, maybe.nothing()))(null)).to.eql(null);
  });
});
