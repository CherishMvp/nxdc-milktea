// 根据手机号码和入会时间，生成一个唯一的用户账号，类似P493870288469970945
// 然后在做其他请求的时候，根据此ID去操作。同时在注册后第二次登录或其他平台登录时，
// 由手机号码发起查询，若有这个手机号码对应的账号，则返回这个账号的信息
function generateUniqueAccount(phoneNumber, nickname) {
  const str = phoneNumber + nickname; // 拼接字符串
  const hash = Math.abs(hashCode(str)); // 计算哈希值（取绝对值避免负数）
  const timestamp = new Date().getTime(); // 获取当前时间戳
  const account = `P${toBase36(timestamp).padStart(10, '0')}${toBase36(hash)}`; // 组合账号
  return account;
}

// 哈希函数：将字符串转换为整数哈希值
function hashCode(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// 将十进制整数转换为 36 进制字符串
function toBase36(num) {
  return num.toString(36);
}
const phoneNumber = '19812345678';
const nickname = 'Alice';
const account = generateUniqueAccount(phoneNumber, nickname);
console.log('account', account); // 输出类似 "P493870288469970945" 的唯一账号
