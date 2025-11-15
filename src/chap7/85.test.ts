import expect from 'expect.js';
import { ID } from './85';
import { compose } from './16';

describe('Identity Monad', () => {
  it('identity monad unit', () => {
    expect(ID.unit(1)).to.eql(1);
  });
  it('identity monad flatMap', () => {
    const succ = (n: number): number => n + 1;
    const double = (n: number): number => n * 2;

    expect(
      ID.flatMap(ID.unit(1))((one) =>
        ID.flatMap(ID.unit(succ(one)))((two) => ID.unit(double(two)))
      )
    ).to.eql(compose(double, succ)(1));
  });
});

describe("Identity Monad's Monad laws", () => {
  it('flatMap(instanceM)(unit) === instanceM', () => {
    const instanceM = ID.unit(1);
    expect(ID.flatMap(instanceM)(ID.unit)).to.eql(instanceM);
  });
  it('flatMap(unit(value))(f) === f(value)', () => {
    const f = (n: number) => ID.unit(n + 1);
    expect(ID.flatMap(ID.unit(1))(f)).to.eql(f(1));
  });
  it('flatMap(flatMap(instanceM)(f))(g) === flatMap(instanceM)((x) => flatMap(f(x))(g))', () => {
    const f = (n: number) => ID.unit(n + 1);
    const g = (n: number) => ID.unit(-n);
    const instanceM = ID.unit(1);
    expect(ID.flatMap(ID.flatMap(instanceM)(f))(g)).to.eql(
      ID.flatMap(instanceM)((x) => ID.flatMap(f(x))(g))
    );
  });
});
