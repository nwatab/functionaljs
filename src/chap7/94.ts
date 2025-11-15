type World = any;

type Pair<A, B> = <R>(pattern: { cons: (left: A, right: B) => R }) => R;

type IOAction<A> = (world: World) => Pair<A, World>;

const match = <A, B, R>(
  data: Pair<A, B>,
  pattern: { cons: (left: A, right: B) => R }
): R => data(pattern);

const pair = {
  cons:
    <A, B>(left: A, right: B): Pair<A, B> =>
    (pattern) =>
      pattern.cons(left, right),
  right: <A, B>(tuple: Pair<A, B>): B =>
    match(tuple, {
      cons: (left, right) => right,
    }),
  left: <A, B>(tuple: Pair<A, B>): A =>
    match(tuple, {
      cons: (left, right) => left,
    }),
};

const IO = {
  unit:
    <A>(value: A): IOAction<A> =>
    (world) =>
      pair.cons(value, world),
  flatMap:
    <A, B>(instanceA: IOAction<A>) =>
    (actionAB: (value: A) => IOAction<B>): IOAction<B> =>
    (world) =>
      match(instanceA(world), {
        cons: (value, newWorld) => actionAB(value)(newWorld),
      }),
  done: () => IO.unit(null),
  run:
    <A>(instance: IOAction<A>) =>
    (world: World): A =>
      pair.left(instance(world)),
  println:
    (message: string): IOAction<null> =>
    (world) => {
      console.log(message);
      return IO.unit(null)(world);
    },
};

export { IO };
