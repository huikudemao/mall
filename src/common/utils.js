// 防抖函数,解决重复频繁调用问题
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
//不足两位，用0补足，substr从左往右截取，取右边的字符串
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间格式化
export function formatDate(date, fmt) {
  //获取年份
  //+ 一到多（最少1） *零到多（可以没有） ? 零到1（要不有一个，要不就没有）
  //正则表达式：自定义规则，根据规则选择符合的字符串
  if (/(y+)/.test(fmt)) {
    //RegExp.$1匹配/(y+)/，'yyyy'
    //date.getFullYear() + ""   数字加空字符串变成全部为字符串
    //substr截取年份的位数
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
