import { compoundInterest } from "./19";
import expect from 'expect.js';

describe("再帰による反復処理19", () => {
    it("複利の計算", ()=> {
      expect(
        compoundInterest(100000, 0.02, 1)
      ).to.eql(
        102000
      );
      expect(
        compoundInterest(100000, 0.02, 2)
      ).to.eql(
        104040  // 10万円を預けてから2年後には10万4040円が銀行口座に入っている
      );
      expect(
        compoundInterest(100000, 0.02, 25)
      ).to.eql(
        164060.59944647306
      );
    });
  });