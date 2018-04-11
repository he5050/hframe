"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeUrl = exports.EmImgProcessType = exports.default = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _oss_tool = require("../../utils/oss_tool");

var _oss_tool2 = _interopRequireDefault(_oss_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 图片处理方式枚举
 * */
var EmImgProcessType = {
  emGD_NONE: 0,
  emGD_H_W: 1,
  emGD_W_H: 2,
  emGD_HW_L: 3,
  emGD_HW_S: 4,
  emGD_L_S: 5,
  emGD_S_S: 6
};

var computeUrl = function computeUrl(props) {
  var _props$imageUrl = props.imageUrl,
      imageUrl = _props$imageUrl === undefined ? '' : _props$imageUrl,
      width = props.width,
      height = props.height,
      quality = props.quality,
      processType = props.processType,
      aspectRatio = props.aspectRatio,
      water = props.water,
      waterUrl = props.waterUrl;

  // 图片路径为空，不做处理

  if (imageUrl === '') {
    return '';
  }

  // 处理路径
  imageUrl = _oss_tool2.default.dealWithURL(imageUrl);

  // 判断后缀，之处理jpg,gif的后缀
  var fileExtend = imageUrl.substring(imageUrl.lastIndexOf('.')).toLowerCase();
  if (fileExtend === '.jpg' || fileExtend === '.jpeg' || fileExtend === '.gif') {
    // 获取文件后缀名,图片服务只针对jpg类型才有效
    // 根据比例计算
    var factors = aspectRatio.split(':');
    if (factors[0] === '-1' || factors[1] === '-1') {
      width = '100%';
      height = '100%';
    } else {
      if (width) {
        height = parseInt(width * (parseFloat(factors[1]) / parseFloat(factors[0])), 10);
      } else if (height) {
        width = parseInt(height * (parseFloat(factors[0]) / parseFloat(factors[1])), 10);
      } else {
        console.log('高度或者宽度必须指定一个啊.');
        return '';
      }
    }

    // 图片处理参数
    var imageOption = '';
    switch (processType) {
      case EmImgProcessType.emGD_H_W:
        {
          // 等比例缩放: 固定高度，宽度自适应
          imageOption = _oss_tool2.default.dealWith_Gd_H_W(height, quality);
          break;
        }
      case EmImgProcessType.emGD_W_H:
        {
          // 等比例缩放: 固定宽度，高度自适应
          imageOption = _oss_tool2.default.dealWith_GD_W_H(width, quality);
          break;
        }
      case EmImgProcessType.emGD_HW_L:
        {
          // 等比例缩放: 限定宽高，按长边缩放
          imageOption = _oss_tool2.default.dealWith_GD_HW_L(width, height, quality);
          break;
        }
      case EmImgProcessType.emGD_HW_S:
        {
          // 等比例缩放: 限定宽高，按短边缩放
          imageOption = _oss_tool2.default.dealWith_GD_HW_S(width, height, quality);
          break;
        }
      case EmImgProcessType.emGD_L_S:
        {
          // 限定宽高: 按长边缩放，缩略填充
          imageOption = _oss_tool2.default.dealWith_GD_L_S(width, height, quality);
          break;
        }
      case EmImgProcessType.emGD_S_S:
        {
          // 限定宽高: 按短边缩放，居中裁剪
          imageOption = _oss_tool2.default.dealWith_GD_S_S(width, height, quality);
          break;
        }
      default:
        {
          // 不做限定,自由显示
          break;
        }
    }

    // gif的不能加水印
    if (water && imageOption !== '' && fileExtend !== '.gif') {
      // 如果waterUrl没有传值，会得到一个默认的水印
      imageOption += _oss_tool2.default.getWatermarkWithPath(waterUrl || '');
    }

    return imageUrl + imageOption;
  }

  return imageUrl;
};

var HFImage = function (_PureComponent) {
  (0, _inherits3.default)(HFImage, _PureComponent);

  function HFImage() {
    (0, _classCallCheck3.default)(this, HFImage);
    return (0, _possibleConstructorReturn3.default)(this, (HFImage.__proto__ || (0, _getPrototypeOf2.default)(HFImage)).apply(this, arguments));
  }

  (0, _createClass3.default)(HFImage, [{
    key: "render",
    value: function render() {
      var factImageUrl = computeUrl(this.props);
      if (factImageUrl === '') {
        return null;
      }

      var _props$linkUrl = this.props.linkUrl,
          linkUrl = _props$linkUrl === undefined ? '' : _props$linkUrl;

      if (linkUrl.length > 0) {
        return _react2.default.createElement(
          "div",
          { className: "img-box" },
          _react2.default.createElement(
            "a",
            { href: linkUrl, target: "blank_" },
            _react2.default.createElement("img", { src: factImageUrl })
          )
        );
      }

      return _react2.default.createElement(
        "div",
        { className: "img-box" },
        _react2.default.createElement("img", { src: factImageUrl })
      );
    }
  }]);
  return HFImage;
}(_react.PureComponent);

/*
 imageUrl      : 图片地址
 linkUrl       : 链接地址
 aspectRatio   : 宽高比例 宽:高
 width         : 视频容器的宽度
 height        : 视频容器的高度
 quality       : 质量
 processType   : 处理方式
 water         : 是否有水印
 waterUrl      : 水印图片地址(此地址与图片地址需在同一个bucket里面)
 * */


HFImage.propTypes = {
  imageUrl: _propTypes2.default.string,
  linkUrl: _propTypes2.default.string,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  quality: _propTypes2.default.number,
  processType: _propTypes2.default.number,
  aspectRatio: _propTypes2.default.string.isRequired,
  water: _propTypes2.default.bool,
  waterUrl: _propTypes2.default.string
};

// <HFImage
//   imageUrl='http://img2.jsbn.com/venus/canmeramanHosterPro/20160321/1458535211448078720150929170217934776_1200x800.jpg'
//   linkUrl='http://www.baidu.com'
//   width={600}
//   aspectRatio='3:2'
//   quality={80}
//   processType={EmImgProcessType.emGD_HW_L}
//   water={false}
// />

exports.default = HFImage;
exports.EmImgProcessType = EmImgProcessType;
exports.computeUrl = computeUrl;