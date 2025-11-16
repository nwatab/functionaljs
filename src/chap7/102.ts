import { List, match } from '../chap5/12';
import { list } from '../chap6/14';
import { foldr } from './58';
import { IO, IOOps } from './99';

const IOSeq = {
  ...IOOps,
  seq:
    <A, B>(instanceA: IO<A>) =>
    (instanceB: IO<B>): IO<B> =>
      IOOps.flatMap<A, B>(instanceA)((_a: A) => instanceB),
  seqs: <A>(alist: List<IO<A>>): IO<void> =>
    foldr(alist)(IOOps.done(undefined))(
      (item: IO<A>) => (acc: IO<void>) => IOSeq.seq(item)(acc)
    ),
  putc:
    (character: string): IO<null> =>
    () => {
      process.stdout.write(character);
      return null;
    },
  puts: (alist: List<string>): IO<void> =>
    match(alist, {
      empty: () => IOOps.done(undefined),
      cons: (head, tail) => IOSeq.seq(IOSeq.putc(head))(IOSeq.puts(tail)),
    }),
  getc: (): any => {
    const continuation = () => process.stdin.read();
    process.stdin.setEncoding('utf8');
    return process.stdin.on('readable', continuation);
  },
};

export const stringOps = {
  head: (s: string) => s?.[0],
  tail: (s: string) => s.substring(1),
  isEmpty: (s: string) => s.length === 0,
  toList: (s: string): List<string> =>
    stringOps.isEmpty(s)
      ? list.empty()
      : list.cons(stringOps.head(s), stringOps.toList(stringOps.tail(s))),
};
