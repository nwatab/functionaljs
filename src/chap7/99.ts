const fs = require('fs');

type IO<A> = () => A;

export const IO = {
  unit:
    <A>(v: A): IO<A> =>
    () =>
      v,
  flatMap:
    <A, B>(instanceA: IO<A>) =>
    (actionAB: (a: A) => IO<B>): IO<B> =>
    () =>
      IO.run(actionAB(IO.run(instanceA))),
  done: <A>(v: A): IO<void> => IO.unit(undefined),
  run: <A>(instance: IO<A>): A => instance(),
  readFile:
    (path: string): IO<IO<string>> =>
    () =>
      IO.unit(fs.readFileSync(path, 'utf8')),
  println:
    (message: string): IO<null> =>
    () => {
      console.log(message);
      return IO.unit(null)();
    },
  writeFile:
    (path: string) =>
    (content: string): IO<null> =>
    () => {
      fs.writeFileSync(path, content);
      return IO.unit(null)();
    },
};
