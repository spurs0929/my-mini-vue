// 淺拷貝
export const extend = Object.assign;

// 判斷傳入值的型別是否為object
export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

// 判斷傳入的兩個值是否相等
export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue);
};

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);
