import { effect } from "../effect";
import { ref } from "../ref";

describe("ref", () => {
  it("happy pass", () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });

  it("should be reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    // 同樣的值不會觸發改變
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });
});