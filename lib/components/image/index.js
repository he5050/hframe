"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeUrl = exports.EmImgProcessType = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _oss_tool = _interopRequireDefault(require("../../oss/oss_tool"));

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
exports.EmImgProcessType = EmImgProcessType;

var computeUrl = function computeUrl(props) {
  var _props$imageUrl = props.imageUrl,
      imageUrl = _props$imageUrl === void 0 ? "" : _props$imageUrl,
      width = props.width,
      height = props.height,
      quality = props.quality,
      processType = props.processType,
      aspectRatio = props.aspectRatio,
      water = props.water,
      waterUrl = props.waterUrl; // 图片路径为空，不做处理

  if (imageUrl === "") {
    return "";
  } // 处理路径


  imageUrl = _oss_tool.default.dealWithURL(imageUrl); // 判断后缀，之处理jpg,gif的后缀

  var fileExtend = imageUrl.substring(imageUrl.lastIndexOf(".")).toLowerCase();

  if (fileExtend === ".jpg" || fileExtend === ".jpeg" || fileExtend === ".gif" || fileExtend === ".png") {
    // 获取文件后缀名,图片服务只针对jpg类型才有效
    // 根据比例计算
    var factors = aspectRatio.split(":");

    if (factors[0] === "-1" || factors[1] === "-1") {
      width = "100%";
      height = "100%";
    } else {
      if (width) {
        height = parseInt(width * (parseFloat(factors[1]) / parseFloat(factors[0])), 10);
      } else if (height) {
        width = parseInt(height * (parseFloat(factors[0]) / parseFloat(factors[1])), 10);
      } else {
        console.log("高度或者宽度必须指定一个啊.");
        return "";
      }
    } // 图片处理参数


    var imageOption = "";

    switch (processType) {
      case EmImgProcessType.emGD_H_W:
        {
          // 等比例缩放: 固定高度，宽度自适应
          imageOption = _oss_tool.default.dealWith_GD_H_W(height, quality);
          break;
        }

      case EmImgProcessType.emGD_W_H:
        {
          // 等比例缩放: 固定宽度，高度自适应
          imageOption = _oss_tool.default.dealWith_GD_W_H(width, quality);
          break;
        }

      case EmImgProcessType.emGD_HW_L:
        {
          // 等比例缩放: 限定宽高，按长边缩放
          imageOption = _oss_tool.default.dealWith_GD_HW_L(width, height, quality);
          break;
        }

      case EmImgProcessType.emGD_HW_S:
        {
          // 等比例缩放: 限定宽高，按短边缩放
          imageOption = _oss_tool.default.dealWith_GD_HW_S(width, height, quality);
          break;
        }

      case EmImgProcessType.emGD_L_S:
        {
          // 限定宽高: 按长边缩放，缩略填充
          imageOption = _oss_tool.default.dealWith_GD_L_S(width, height, quality);
          break;
        }

      case EmImgProcessType.emGD_S_S:
        {
          // 限定宽高: 按短边缩放，居中裁剪
          imageOption = _oss_tool.default.dealWith_GD_S_S(width, height, quality);
          break;
        }

      default:
        {
          // 不做限定,自由显示
          break;
        }
    } // gif的不能加水印


    if (water && imageOption !== "" && fileExtend !== ".gif") {
      // 如果waterUrl没有传值，会得到一个默认的水印
      imageOption += _oss_tool.default.getWatermarkWithPath(waterUrl || "");
    }

    return imageUrl + imageOption;
  }

  return imageUrl;
};

exports.computeUrl = computeUrl;

var HFImage =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(HFImage, _PureComponent);

  function HFImage() {
    (0, _classCallCheck2.default)(this, HFImage);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HFImage).apply(this, arguments));
  }

  (0, _createClass2.default)(HFImage, [{
    key: "render",
    value: function render() {
      var factImageUrl = computeUrl(this.props);

      if (factImageUrl === "") {
        return null;
      }

      var _this$props = this.props,
          _this$props$linkUrl = _this$props.linkUrl,
          linkUrl = _this$props$linkUrl === void 0 ? "" : _this$props$linkUrl,
          className = _this$props.className,
          style = _this$props.style,
          onClick = _this$props.onClick;

      if (linkUrl.length > 0) {
        return _react.default.createElement("div", {
          className: "img-box ".concat(className || ""),
          style: style,
          onClick: onClick
        }, _react.default.createElement("a", {
          href: linkUrl,
          target: "blank_"
        }, _react.default.createElement("img", {
          src: factImageUrl,
          alt: ""
        })));
      }

      return _react.default.createElement("div", {
        className: "img-box ".concat(className || ""),
        style: style,
        onClick: onClick
      }, _react.default.createElement("img", {
        src: factImageUrl,
        alt: ""
      }));
    }
  }]);
  return HFImage;
}(_react.PureComponent);

exports.default = HFImage;
HFImage.defaultProps = {
  imageUrl: "",
  linkUrl: "",
  width: 0,
  height: 0,
  quality: 90,
  processType: 0,
  water: false,
  waterUrl: ""
};
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
  imageUrl: _propTypes.default.string,
  linkUrl: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  quality: _propTypes.default.number,
  processType: _propTypes.default.number,
  aspectRatio: _propTypes.default.string.isRequired,
  water: _propTypes.default.bool,
  waterUrl: _propTypes.default.string
}; // <HFImage
//   imageUrl='http://xxx/a.jpg'
//   linkUrl='http://www.baidu.com'
//   width={600}
//   aspectRatio='3:2'
//   quality={80}
//   processType={EmImgProcessType.emGD_HW_L}
//   water={false}
// />