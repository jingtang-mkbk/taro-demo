/**
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 * @description 两数字相乘 保持精度
 */
export const accMul = (arg1, arg2) => {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
};

/**
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 * @description 两数字相加 保持精度
 */
export const accAdd = (arg1, arg2) => {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
};

/**
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 * @description 两数字相减 保持精度
 */
export const accSub = (arg1, arg2) => {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

/**
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 * @description 两数字相除 保持精度
 */
export const accDiv = (arg1, arg2) => {
  let t1 = 0;
  let t2 = 0;
  let r1, r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  let intDiv = r1 / r2;
  let pow = Math.pow(10, t2 - t1);
  return accMul(intDiv, pow); // 这里用上面定义好的乘法运算
};
