import { stream, Stream } from '../chap6/14';

export const generate = <T>(aStream: Stream<T>) => {
  let _stream = aStream;
  return () =>
    stream.match(_stream, {
      empty: () => null,
      cons: (head, tailThunk) => {
        _stream = tailThunk();
        return head;
      },
    });
};
