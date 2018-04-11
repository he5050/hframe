"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _upload = require("antd/lib/upload");

var _upload2 = _interopRequireDefault(_upload);

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _immutable = require("immutable");

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _base_component = require("../../middleware/base_component");

var _base_component2 = _interopRequireDefault(_base_component);

var _image = require("../image");

var _image2 = _interopRequireDefault(_image);

var _oss_client = require("../../utils/oss_client");

var _oss_client2 = _interopRequireDefault(_oss_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HFUpload = function (_BaseComponent) {
  (0, _inherits3.default)(HFUpload, _BaseComponent);

  function HFUpload(props, context) {
    (0, _classCallCheck3.default)(this, HFUpload);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HFUpload.__proto__ || (0, _getPrototypeOf2.default)(HFUpload)).call(this, props, context));

    _this.onChange = function (info) {
      var files = [].concat((0, _toConsumableArray3.default)(_this.state.files));
      var item = _lodash2.default.find(files, { uid: info.file.uid });
      if (item) {
        // 修改状态
        item.status = info.file.status;
        item.url = info.file.response;
        item.thumbUrl = _this.getThumbUrl(info.file.response);
      } else {
        // 队列没有，新增
        files.push({
          uid: info.file.uid,
          name: info.file.name,
          status: info.file.status,
          url: info.file.response
        });
      }

      if (info.file.status === 'done') {
        _this.setState({ files: files }, function () {
          _this.triggerChange();
        });
      } else {
        _this.setState({ files: files });
      }
    };

    _this.onRemove = function (file) {
      if (file.url) {
        _this.oss.deleteFile(file.url);
      }

      // 从列表中删除
      _this.setState({ files: _lodash2.default.remove([].concat((0, _toConsumableArray3.default)(_this.state.files)), function (o) {
          return file.uid !== o.uid;
        }) }, function () {
        _this.triggerChange();
      });
    };

    _this.triggerChange = function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value;

      if (onChange) {
        var fs = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(_this.state.files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            if (v.status === 'done') {
              fs.push(v.url);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (Object.prototype.toString.call(value) == '[object Array]') {
          onChange(fs);
        } else {
          onChange(fs[0]);
        }
      }
    };

    _this.onProgress = function (e, file) {
      var files = (0, _reactAddonsUpdate2.default)(_this.state.files, {
        $apply: function $apply(o) {
          var item = _lodash2.default.find(o, ['uid', file.uid]);
          if (item) {
            item.percent = e.percent;
          }
          return o;
        }
      });
      _this.setState({ files: files });
    };

    _this.handUpload = function (fs) {
      var _this$props2 = _this.props,
          uploadDir = _this$props2.uploadDir,
          suffix = _this$props2.suffix;

      _this.oss.uploadFile(fs.file, uploadDir, suffix, function (percentage) {
        return function (done) {
          fs.onProgress({ percent: Math.floor(percentage * 100) }, fs.file);
          done();
        };
      }).then(function (fp) {
        fs.onSuccess(fp, fs.file);
      }).catch(function (err) {
        console.log('err:', err);
        fs.onError(err, {}, fs.file);
      });
    };

    _this.beforeUpload = function () {
      var _this$props$limit = _this.props.limit,
          limit = _this$props$limit === undefined ? 99999 : _this$props$limit;

      if (_this.state.files.length >= limit) {
        console.log('upload files is limit....', limit);
        return false;
      }
      return true;
    };

    _this.handleCancel = function () {
      return _this.setState({ previewVisible: false });
    };

    _this.handlePreview = function (file) {
      if (file.url) {
        _this.setState({
          previewImage: file.url,
          previewVisible: true
        });
      }
    };

    var _this$props3 = _this.props,
        renderType = _this$props3.renderType,
        mode = _this$props3.mode,
        keyId = _this$props3.keyId,
        _this$props3$baseDir = _this$props3.baseDir,
        baseDir = _this$props3$baseDir === undefined ? 'test' : _this$props3$baseDir;

    _this.oss = new _oss_client2.default(baseDir, renderType, mode, keyId);
    _this.state = {
      previewImage: '',
      previewVisible: false,
      files: _this.dealWith(props.value)
    };
    return _this;
  }

  (0, _createClass3.default)(HFUpload, [{
    key: "dealWith",
    value: function dealWith(value) {
      var _this2 = this;

      if (!value) {
        return [];
      }

      var fs = [];
      if (Object.prototype.toString.call(value) == '[object Array]') {
        // 数组，表示多个值
        fs = _lodash2.default.map(value, function (v, k) {
          return {
            uid: -1 * k,
            name: v,
            status: 'done',
            url: v,
            thumbUrl: _this2.getThumbUrl(v)
          };
        });
      } else {
        fs = [{
          uid: -1,
          name: value,
          status: 'done',
          url: value,
          thumbUrl: this.getThumbUrl(value)
        }];
        console.log(fs);
      }
      return fs;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _immutable.is)((0, _immutable.fromJS)(this.props.value), (0, _immutable.fromJS)(nextProps.value))) {
        this.setState({ files: this.dealWith(nextProps.value) });
      }
    }

    // 配置缩略图地址

  }, {
    key: "getThumbUrl",
    value: function getThumbUrl(url) {
      var _props$listType = this.props.listType,
          listType = _props$listType === undefined ? 'text' : _props$listType;

      if (listType === 'text') {
        return null;
      } else {
        // TODO:antd3.3.1的一个bug，结尾如果不是以jpg结尾的话会当成文件处理
        return (0, _image.computeUrl)({
          imageUrl: url,
          width: 100,
          aspectRatio: '1:1',
          quality: 90,
          processType: _image.EmImgProcessType.emGD_S_S,
          water: false
        }) + '&.jpg';
      }
    }

    // 取消预览


    // 点击预览

  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          accept = _props.accept,
          _props$multiple = _props.multiple,
          multiple = _props$multiple === undefined ? false : _props$multiple,
          _props$limit = _props.limit,
          limit = _props$limit === undefined ? 99999 : _props$limit,
          _props$listType2 = _props.listType,
          listType = _props$listType2 === undefined ? 'text' : _props$listType2,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          uploadRender = _props.uploadRender;

      var ps = {
        accept: accept,
        multiple: multiple,
        supportServerRender: true,
        disabled: disabled,
        listType: listType,
        showUploadList: { showPreviewIcon: true, showRemoveIcon: !disabled },
        beforeUpload: this.beforeUpload,
        customRequest: this.handUpload,
        onProgress: this.onProgress,
        onRemove: this.onRemove,
        onPreview: this.handlePreview,
        onChange: this.onChange,
        fileList: this.state.files
      };
      var defaultRender = function defaultRender(fileList) {
        if (fileList.length >= limit) {
          return null;
        } else {
          switch (listType) {
            case 'picture-card':
              {
                return _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement(_icon2.default, { type: "plus" }),
                  _react2.default.createElement(
                    "div",
                    null,
                    "\u70B9\u51FB\u4E0A\u4F20"
                  )
                );
              }
            case 'picture':
            case 'text':
            default:
              {
                return _react2.default.createElement(
                  _button2.default,
                  null,
                  _react2.default.createElement(_icon2.default, { type: "upload" }),
                  " \u70B9\u51FB\u4E0A\u4F20"
                );
              }
          }
        }
      };
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _upload2.default,
          ps,
          uploadRender ? uploadRender(ps.fileList) : defaultRender(ps.fileList)
        ),
        _react2.default.createElement(
          _modal2.default,
          { visible: this.state.previewVisible, footer: null, onCancel: this.handleCancel },
          _react2.default.createElement(_image2.default, {
            imageUrl: this.state.previewImage,
            width: 500,
            aspectRatio: "3:2",
            quality: 90,
            processType: _image.EmImgProcessType.emGD_L_S,
            water: false })
        )
      );
    }
  }]);
  return HFUpload;
}((0, _base_component2.default)('HFUpload'));

HFUpload.propTypes = {
  // 上传的文件类型
  accept: _propTypes2.default.string.isRequired,
  // 是否支持多选,有数量限制的情况下开启多选，限制没有
  multiple: _propTypes2.default.bool.isRequired,
  // 预设路径数组或者字符串
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  // 变化回调通知
  onChange: _propTypes2.default.func,
  // 数量限制
  limit: _propTypes2.default.number,
  // 上传目录
  uploadDir: _propTypes2.default.string.isRequired,
  // 上传保存后缀名
  suffix: _propTypes2.default.string.isRequired,
  // 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon
  showUploadList: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  // 自定义结构
  uploadRender: _propTypes2.default.func
};

/**
 * 使用例子
 * 
  <HFUpload {...this.props} 
      onChange={this.onChange} 
      uploadDir="test"
      suffix="jpg"
      accept="image/jpeg,image/jpg,image/png" 
      multiple={false} 
      value={['http://123.jpg']}
      limit={2} />
 *
 */

exports.default = HFUpload;
module.exports = exports["default"];