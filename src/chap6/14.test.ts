import expect from 'expect.js';
import { list, stream } from './14';
import type { Stream } from './14';

describe('サンクで無限を表現する', () => {
  const enumFrom = (n: number): Stream<number> => {
    return stream.cons(n, () => enumFrom(n + 1));
  };

  it('ストリーム型のテスト', () => {
    var theStream = stream.cons(1, () => {
      return stream.cons(2, () => {
        return stream.empty();
      });
    });
    expect(stream.head(theStream)).to.eql(1);
  });
  it('1が無限に続くストリーム', () => {
    const ones: Stream<number> = stream.cons(1, () => ones);
    expect(stream.head(ones)).to.eql(1);
    expect(stream.head(stream.tail(ones)!)).to.eql(1);
  });
  it('自然数列のストリーム', () => {
    expect(stream.head(enumFrom(1))).to.eql(1);
    expect(stream.head(stream.tail(enumFrom(1))!)).to.eql(2);
  });
  it('無限の整数列から4個の要素を取り出す', () => {
    expect(list.toArray(stream.take(enumFrom(1), 4))).to.eql([1, 2, 3, 4]);
  });
});
