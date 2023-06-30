import { toFixedRound, toFixedTrunc, addDelimiter, addUnit } from ".";

describe("number", () => {
  test("toFixedRound: 전달 받은 자리수 다음에서 반올림하여 리턴한다.", () => {
    expect(toFixedRound(0.123123)).toBe("0.1");
    expect(toFixedRound(0.15123123)).toBe("0.2");
    expect(toFixedRound(1)).toBe("1.0");
    expect(toFixedRound(1.5, 0)).toBe("2");
  });

  test("toFixedTrunc: 반올림 없이 버림 처리하여 전달 받은 소수 부분 자릿수 값으로 고정한다.", () => {
    expect(toFixedTrunc(0.123)).toBe(0.1);
    expect(toFixedTrunc(0.12345, 2)).toBe(0.12);
    expect(toFixedTrunc(0.12345, 4)).toBe(0.1234);
  });

  test("addDelimiter: 3자리마다 구분자를 추가한다.", () => {
    expect(addDelimiter(0)).toBe("0");
    expect(addDelimiter(1234567.89)).toBe("1,234,567.89");
    expect(addDelimiter(-1234567.89)).toBe("-1,234,567.89");
  });

  test("addUnit: 만, 억, 조, 경이 들어간 꼴로 숫자를 문자열로 변환한다.", () => {
    expect(addUnit(123123213123213)).toBe("123조 1232억 1312만 3213");
    expect(addUnit(12312)).toBe("1만 2312");
    expect(addUnit(1231)).toBe("1231");
  });
});
