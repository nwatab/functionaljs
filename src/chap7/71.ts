import { stream, Stream } from '../chap6/14';

export type ContinuesOnSuccess<T> = (item: T | null) => T | null;
export type ContinuesOnFailure<T> = (
  aStream: Stream<T>,
  predicate: (item: T) => boolean,
  continuesOnFailure: ContinuesOnFailure<T>,
  continuesOnSuccess: ContinuesOnSuccess<T>
) => T | null;

export const find = <T>(
  aStream: Stream<T>,
  predicate: (item: T) => boolean,
  continuesOnFailure: ContinuesOnFailure<T>,
  continuesOnSuccess: ContinuesOnSuccess<T>
) =>
  stream.match(aStream, {
    empty: () => continuesOnSuccess(null),
    cons: (head, tailThunk) =>
      predicate(head)
        ? continuesOnSuccess(head)
        : continuesOnFailure(
            tailThunk(),
            predicate,
            continuesOnFailure,
            continuesOnSuccess
          ),
  });
