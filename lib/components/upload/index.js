"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _reactAddonsUpdate = _interopRequireDefault(require("react-addons-update"));

var _lodash = _interopRequireDefault(require("lodash"));

var _base_component = _interopRequireDefault(require("../../middleware/base_component"));

var _image = _interopRequireWildcard(require("../image"));

var _oss_client = _interopRequireDefault(require("../../oss/oss_client"));

var HFUpload =
/*#__PURE__*/
function (_BaseComponent) {
  (0, _inherits2.default)(HFUpload, _BaseComponent);

  function HFUpload(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, HFUpload);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HFUpload).call(this, props, context));

    _this.onChange = function (info) {
      var files = (0, _toConsumableArray2.default)(_this.state.files);

      var item = _lodash.default.find(files, {
        uid: info.file.uid
      });

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

      if (info.file.status === "done") {
        _this.setState({
          files: files
        }, function () {
          _this.triggerChange();
        });
      } else {
        _this.setState({
          files: files
        });
      }
    };

    _this.onRemove = function (file) {
      if (file.url) {
        _this.oss.deleteFile(file.url);
      } // 从列表中删除


      _this.setState({
        files: _lodash.default.remove((0, _toConsumableArray2.default)(_this.state.files), function (o) {
          return file.uid !== o.uid;
        })
      }, function () {
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
          for (var _iterator = _this.state.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            if (v.status === "done") {
              fs.push(v.url);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (Object.prototype.toString.call(value) === "[object Array]") {
          onChange(fs);
        } else {
          onChange(fs[0]);
        }
      }
    };

    _this.onProgress = function (e, file) {
      var files = (0, _reactAddonsUpdate.default)(_this.state.files, {
        $apply: function $apply(o) {
          var item = _lodash.default.find(o, ["uid", file.uid]);

          if (item) {
            item.percent = e.percent;
          }

          return o;
        }
      });

      _this.setState({
        files: files
      });
    };

    _this.handUpload = function (fs) {
      var _this$props2 = _this.props,
          uploadDir = _this$props2.uploadDir,
          suffix = _this$props2.suffix;

      _this.oss.uploadFile(fs.file, uploadDir, suffix, function (percentage) {
        return function (done) {
          fs.onProgress({
            percent: Math.floor(percentage * 100)
          }, fs.file);
          done();
        };
      }).then(function (fp) {
        fs.onSuccess(fp, fs.file);
      }).catch(function (err) {
        console.log("err:", err);
        fs.onError(err, {}, fs.file);
      });
    };

    _this.beforeUpload = function (file) {
      var _this$props$limit = _this.props.limit,
          limit = _this$props$limit === void 0 ? 99999 : _this$props$limit;

      if (_this.state.files.length >= limit) {
        _message2.default.error("\u4E0A\u4F20\u6587\u4EF6\u6570\u91CF\u8D85\u8FC7\u9650\u5236!".concat(limit));

        return false;
      } // 默认10M


      var _this$props$fileSize = _this.props.fileSize,
          fileSize = _this$props$fileSize === void 0 ? 1024 * 1024 * 10 : _this$props$fileSize;

      if (file.size > fileSize) {
        _message2.default.error("\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u9650\u5236!".concat(fileSize));

        return false;
      }

      return true;
    };

    _this.handleCancel = function () {
      return _this.setState({
        previewVisible: false
      });
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
        baseDir = _this$props3$baseDir === void 0 ? "test" : _this$props3$baseDir,
        custom = _this$props3.custom;
    _this.oss = new _oss_client.default(baseDir, renderType, mode, keyId, custom);
    _this.state = {
      previewImage: "",
      previewVisible: false,
      files: _this.dealWith(props.value)
    };
    return _this;
  }

  (0, _createClass2.default)(HFUpload, [{
    key: "dealWith",
    value: function dealWith(value) {
      var _this2 = this;

      if (!value) {
        return [];
      }

      var fs = [];

      if (Object.prototype.toString.call(value) === "[object Array]") {
        // 数组，表示多个值
        fs = _lodash.default.map(value, function (v, k) {
          return {
            uid: -1 * k,
            name: v,
            status: "done",
            url: v,
            thumbUrl: _this2.getThumbUrl(v)
          };
        });
      } else {
        fs = [{
          uid: -1,
          name: value,
          status: "done",
          url: value,
          thumbUrl: this.getThumbUrl(value)
        }];
      }

      return fs;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _immutable.is)((0, _immutable.fromJS)(this.props.value), (0, _immutable.fromJS)(nextProps.value))) {
        this.setState({
          files: this.dealWith(nextProps.value)
        });
      }
    } // 配置缩略图地址

  }, {
    key: "getThumbUrl",
    value: function getThumbUrl(url) {
      var _this$props$listType = this.props.listType,
          listType = _this$props$listType === void 0 ? "text" : _this$props$listType;

      if (listType === "text") {
        return null;
      }

      var thumbUrl = (0, _image.computeUrl)({
        imageUrl: url,
        width: 100,
        aspectRatio: "1:1",
        quality: 90,
        processType: _image.EmImgProcessType.emGD_L_S,
        water: false
      });
      return thumbUrl;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          accept = _this$props4.accept,
          _this$props4$multiple = _this$props4.multiple,
          multiple = _this$props4$multiple === void 0 ? false : _this$props4$multiple,
          _this$props4$limit = _this$props4.limit,
          limit = _this$props4$limit === void 0 ? 99999 : _this$props4$limit,
          _this$props4$listType = _this$props4.listType,
          listType = _this$props4$listType === void 0 ? "text" : _this$props4$listType,
          _this$props4$disabled = _this$props4.disabled,
          disabled = _this$props4$disabled === void 0 ? false : _this$props4$disabled,
          uploadRender = _this$props4.uploadRender;
      var ps = {
        accept: accept,
        multiple: multiple,
        supportServerRender: true,
        disabled: disabled,
        listType: listType,
        showUploadList: {
          showPreviewIcon: true,
          showRemoveIcon: !disabled
        },
        beforeUpload: this.beforeUpload,
        customRequest: this.handUpload,
        onProgress: this.onProgress,
        onRemove: this.onRemove,
        onPreview: this.handlePreview,
        onChange: this.onChange,
        fileList: this.state.files
      };

      var defaultRender = function defaultRender(fileList) {
        if (fileList.length >= limit || disabled) {
          return null;
        }

        switch (listType) {
          case "picture-card":
            {
              return _react.default.createElement("div", null, _react.default.createElement(_icon.default, {
                type: "plus"
              }), _react.default.createElement("div", null, "\u70B9\u51FB\u4E0A\u4F20"));
            }

          case "picture":
          case "text":
          default:
            {
              return _react.default.createElement(_button.default, null, _react.default.createElement(_icon.default, {
                type: "upload"
              }), " \u70B9\u51FB\u4E0A\u4F20");
            }
        }
      };

      return _react.default.createElement("div", null, _react.default.createElement(_upload.default, ps, uploadRender ? uploadRender(ps.fileList) : defaultRender(ps.fileList)), _react.default.createElement(_modal.default, {
        visible: this.state.previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, _react.default.createElement(_image.default, {
        imageUrl: this.state.previewImage,
        width: 500,
        aspectRatio: "3:2",
        quality: 90,
        processType: _image.EmImgProcessType.emGD_L_S,
        water: false
      })));
    }
  }]);
  return HFUpload;
}((0, _base_component.default)("HFUpload"));

HFUpload.propTypes = {
  // 上传的文件类型
  accept: _propTypes.default.string.isRequired,
  // 是否支持多选,有数量限制的情况下开启多选，限制没有
  multiple: _propTypes.default.bool.isRequired,
  // 预设路径数组或者字符串
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  // 变化回调通知
  onChange: _propTypes.default.func,
  // 数量限制
  limit: _propTypes.default.number,
  // 文件大小限制，默认10M
  fileSize: _propTypes.default.number,
  // 上传目录
  uploadDir: _propTypes.default.string.isRequired,
  // 上传保存后缀名
  suffix: _propTypes.default.string.isRequired,
  // 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon
  showUploadList: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object]),
  // 自定义结构
  uploadRender: _propTypes.default.func
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
      value={["http://123.jpg"]}
      limit={2}
      fileSize={1024*200} />
 *
 */

var _default = HFUpload;
exports.default = _default;