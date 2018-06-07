'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto_tool = require('../utils/crypto_tool');

var _crypto_tool2 = _interopRequireDefault(_crypto_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ossTool = {
  // 获取bucket path
  getOSSCnf: function getOSSCnf(mode) {
    var baseDir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test';
    var custom = arguments[2];

    var ossCnf = {
      custom: false,
      region: 'oss-cn-shenzhen',
      baseDir: baseDir
    };

    if (custom) {
      ossCnf.custom = true;
      ossCnf.region = custom.region;
      ossCnf.bucket = custom.bucket;
      ossCnf.hostUrl = custom.hostUrl;
    } else {
      if (mode === 'production') {
        // 产品模式
        ossCnf.bucket = 'hjfmytest';
        ossCnf.hostUrl = '//hjfmytest.oss-cn-shenzhen.aliyuncs.com';
      } else {
        // 开发模式
        ossCnf.bucket = 'hjfmytest-test';
        ossCnf.hostUrl = '//hjf-test.oss-cn-shenzhen.aliyuncs.com';
      }
    }

    return ossCnf;
  },


  // 处理路径
  dealWithURL: function dealWithURL(path) {
    if (path.indexOf('hjfmytest.oss-cn-shenzhen.aliyuncs.com') > 0) {
      path = path.replace(/hjfmytest.oss-cn-shenzhen.aliyuncs.com/g, 'img.hjfmytest.com');
      if (!path.startsWith('http:') && !path.startsWith('https:')) {
        path = 'https:' + path;
      }
    } else if (path.indexOf('hjfmytest-test.oss-cn-shenzhen.aliyuncs.com') > 0) {
      path = path.replace(/hjfmytest-test.oss-cn-shenzhen.aliyuncs.com/g, 'testimg.hjfmytest.com');
      if (!path.startsWith('http:') && !path.startsWith('https:')) {
        path = 'https:' + path;
      }
    } else {
      if (!path.startsWith('http:') && !path.startsWith('https:')) {
        path = 'http:' + path;
      }
    }

    return path;
  },


  // 根据图片路径获取水印，当前图片会作为水印图片
  getWatermarkWithPath: function getWatermarkWithPath(path) {
    var ct = path.match(/\.com\/(\S*)/);
    if (ct) {
      return '/watermark,image_' + _crypto_tool2.default.base64encode(ct[1]) + ',t_50,g_se,y_10,x_10';
    }
    // 获取一个默认的水印
    return '';
  },


  // 等比例缩放: 固定高度，宽度自适应
  dealWith_GD_H_W: function dealWith_GD_H_W(height) {
    var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

    var imageOption = '';
    if (height === '100%') {
      imageOption = '?x-oss-process=image/auto-orient,0';
    } else {
      imageOption = '?x-oss-process=image/resize,m_lfit,h_' + height + ',limit_0/auto-orient,0';
    }

    if (quality < 100) {
      imageOption += '/quality,q_' + quality;
    }
    return imageOption;
  },


  // 等比例缩放: 固定宽度，高度自适应
  dealWith_GD_W_H: function dealWith_GD_W_H(width) {
    var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

    var imageOption = '';
    if (width === '100%') {
      imageOption = '?x-oss-process=image/auto-orient,0';
    } else {
      imageOption = '?x-oss-process=image/resize,m_lfit,w_' + width + ',limit_0/auto-orient,0';
    }

    if (quality < 100) {
      imageOption += '/quality,q_' + quality;
    }
    return imageOption;
  },


  // 等比例缩放: 限定宽高，按长边缩放
  dealWith_GD_HW_L: function dealWith_GD_HW_L(width, height) {
    var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var imageOption = '';
    if (height !== '100%' && width !== '100%') {
      imageOption = '?x-oss-process=image/resize,m_lfit,w_' + width + ',h_' + height + ',limit_0/auto-orient,0';
    } else {
      imageOption = '?x-oss-process=image/auto-orient,0';
    }

    if (quality < 100) {
      imageOption += '/quality,q_' + quality;
    }
    return imageOption;
  },


  // 等比例缩放: 限定宽高，按短边缩放
  dealWith_GD_HW_S: function dealWith_GD_HW_S(width, height) {
    var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var imageOption = '';
    if (height !== '100%' && width !== '100%') {
      imageOption = '?x-oss-process=image/resize,m_mfit,w_' + width + ',h_' + height + ',limit_0/auto-orient,0';
    } else {
      imageOption = '?x-oss-process=image/auto-orient,0';
    }

    if (quality < 100) {
      imageOption += '/quality,q_' + quality;
    }
    return imageOption;
  },


  // 限定宽高: 按长边缩放，缩略填充
  dealWith_GD_L_S: function dealWith_GD_L_S(width, height) {
    var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var imageOption = '';
    if (height !== '100%' && width !== '100%') {
      imageOption = '?x-oss-process=image/resize,m_pad,w_' + width + ',h_' + height + ',limit_0/auto-orient,0';
    } else {
      imageOption = '?x-oss-process=image/auto-orient,0';
    }

    if (quality < 100) {
      imageOption += '/quality,q_' + quality;
    }
    return imageOption;
  },


  // 限定宽高: 按短边缩放，居中裁剪
  dealWith_GD_S_S: function dealWith_GD_S_S(width, height) {
    var quality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var imageOption = '';
    if (height !== '100%' && width !== '100%') {
      imageOption = '?x-oss-process=image/resize,m_fill,w_' + width + ',h_' + height + ',limit_0/auto-orient,0';
    } else {
      imageOption = '?x-oss-process=image/auto-orient,0';
    }

    if (quality < 100) {
      imageOption += '/quality,q_' + quality;
    }
    return imageOption;
  }
};

exports.default = ossTool;
module.exports = exports['default'];