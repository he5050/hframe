import moment from 'moment';
import _ from 'lodash';

const utils = {
  // 例如url为: /sample
  // 传入的参数为: {id:123,typeId:2343}
  // /sample?id=123&typeId=2343
  buildQueryUrl(url, params) {
    // 判断url是否带参数
    let arrs = url.split("?");
    if (arrs[1] && arrs[1].length > 0) {
      let ps = arrs[1].split("&");
      // 解析参数
      _.each(ps, (v, k) => {
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
  }
};

export default utils;
