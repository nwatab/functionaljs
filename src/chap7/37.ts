import { enumFrom, Stream, stream } from '../chap6/14';
import { multipleOf } from './10';
import { not } from './13';

export const stream37 = {
  ...stream,
  toArray: <T>(aStream: Stream<T>) =>
    stream.match(aStream, {
      empty: () => [],
      cons: (head, tailThunk): T[] =>
        stream.match(tailThunk(), {
          empty: () => [head],
          cons: (_head, _tailThunk) =>
            [head].concat(stream37.toArray(tailThunk())),
        }),
    }),
  take:
    <T>(aStraem: Stream<T>) =>
    (n: number): Stream<T> =>
      stream.match(aStraem, {
        empty: () => stream.empty(),
        cons: (head, tailThunk) =>
          n <= 0
            ? stream.empty()
            : stream.cons(head, () => stream37.take(tailThunk())(n - 1)),
      }),
  filter:
    <T>(predicate: (arg: T) => boolean) =>
    (aStream: Stream<T>): Stream<T> =>
      stream.match(aStream, {
        empty: () => stream.empty(),
        cons: (head, tailThunk) =>
          predicate(head)
            ? stream.cons(head, () => stream37.filter(predicate)(tailThunk()))
            : stream37.filter(predicate)(tailThunk()),
      }),
  remove:
    <T>(predicate: (arg: T) => boolean) =>
    (aStream: Stream<T>) =>
      stream37.filter(not(predicate))(aStream),
};

export const sieve = (aStream: Stream<number>): Stream<number> =>
  stream37.match(aStream, {
    empty: () => stream.empty(),
    cons: (head, tailThunk) =>
      stream.cons(head, () =>
        sieve(
          stream37.remove<number>((item) => multipleOf(head)(item))(tailThunk())
        )
      ),
  });

export const primes = sieve(enumFrom(2));
