export type Environment = (name: string) => any;

export const env = {
  empty: (() => undefined) as Environment,
  lookup: (name: string, environment: Environment) => environment(name),
  extend:
    <T>(identifier: string, value: T, environment: Environment): Environment =>
    (queryIdentifier: string) =>
      identifier === queryIdentifier
        ? value
        : env.lookup(queryIdentifier, environment),
};
