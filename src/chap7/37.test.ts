import expect from 'expect.js';
import { primes, stream37 } from './37';

describe('generators', () => {
  it('Sieve of Eratosthenes', () => {
    expect(stream37.toArray(stream37.take(primes)(10))).to.eql([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    ]);
  });
});
