import moment from 'moment';
import _ from 'lodash';

const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const utils = {
  /**
    例如url为: /sample
    传入的参数为: {id:123,typeId:2343}
    /sample?id=123&typeId=2343
  **/
  buildQueryUrl(url, params) {
    // 判断url是否带参数
    let arrs = url.split("?");
    if (arrs[1] && arrs[1].length > 0) {
      let ps = arrs[1].split("&");
      // 解析参数
      _.each(ps, v => {
        let pa = v.split("=");
        if (pa.length === 2) {
          params[pa[0]] = unescape(pa[1]);
        }
      });
    }

    // url
    let paramsUrl = arrs[0];
    if (_.size(params) > 0 && paramsUrl) {
      paramsUrl += '?';
      let first = true;
      _.each(params, (v, k) => {
        if (v) {
          if (first) {
            paramsUrl += k + '=' + v;
            first = false;
          } else {
            paramsUrl += '&' + k + '=' + v;
          }
        }
      });
    }
    return paramsUrl;
  },

  /**
   * 将数字转化成大些数字
   * @param {*} n
   */
  digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    let num = Math.abs(n);
    let s = '';
    fraction.forEach((item, index) => {
      s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
      let p = '';
      for (let j = 0; j < unit[1].length && num > 0; j += 1) {
        p = digit[num % 10] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  },

  /**
   * 前补0
   * @param {*} val
   */
  fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
  },

  /**
   * 获取一个时间距离,一天，一周，一月，一年
   * @param {*} type
   */
  getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
      let day = now.getDay();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }
      const beginTime = now.getTime() - (day * oneDay);
      return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))];
    }

    if (type === 'month') {
      const year = now.getFullYear();
      const month = now.getMonth();
      const nextDate = moment(now).add(1, 'months');
      const nextYear = nextDate.year();
      const nextMonth = nextDate.month();
      return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)];
    }

    if (type === 'year') {
      const year = now.getFullYear();
      return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
    }
  },

  /**
   * 用于把用utf16编码的字符转换成实体字符，以供后台存储
   * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
   * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
   */
  utf16toEntities(str) {
    let patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function(char) {
      let H,
        L,
        code;
      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位
        L = char.charCodeAt(1); // 取出低位
        code = ((H - 0xD800) * 0x400) + 0x10000 + L - 0xDC00; // 转换算法
        return "&#" + code + ";";
      } else {
        return char;
      }
    });
    return str;
  },

  base64encode(str) {
    let out, i, len;
    let c1, c2, c3;
    i = 0;
    out = "";

    len = str.length;
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        //out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        //out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
  },

  // 用于解析出 emoji表情 把上面转的16位 直接转出来
  entitiestoUtf16(str) {
    // 检测出形如&#12345;形式的字符串
    let strObj = utils.utf16toEntities(str);
    let patt = /&#\d+;/g;
    let H, L, code;
    let arr = strObj.match(patt) || [];
    for (let i = 0; i < arr.length; i++) {
      code = arr[i];
      code = code.replace('&#', '').replace(';', '');
      // 高位
      H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
      // 低位
      L = ((code - 0x10000) % 0x400) + 0xDC00;
      code = "&#" + code + ";";
      let s = String.fromCharCode(H, L);
      strObj = strObj.replace(code, s);
    }
    return strObj;
  }
};

export default utils;
