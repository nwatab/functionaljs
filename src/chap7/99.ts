const fs = require('fs');

export type IO<A> = () => A;

export const IOOps = {
  unit:
    <A>(v: A): IO<A> =>
    () =>
      v,
  flatMap:
    <A, B>(instanceA: IO<A>) =>
    (actionAB: (a: A) => IO<B>): IO<B> =>
    () =>
      IOOps.run(actionAB(IOOps.run(instanceA))),
  done: <A>(v: A): IO<void> => IOOps.unit(undefined),
  run: <A>(instance: IO<A>): A => instance(),
  readFile:
    (path: string): IO<IO<string>> =>
    () =>
      IOOps.unit(fs.readFileSync(path, 'utf8')),
  println:
    (message: string): IO<null> =>
    () => {
      console.log(message);
      return IOOps.unit(null)();
    },
  writeFile:
    (path: string) =>
    (content: string): IO<null> =>
    () => {
      fs.writeFileSync(path, content);
      return IOOps.unit(null)();
    },
};
