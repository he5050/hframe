import React from "react";
import PropTypes from "prop-types";
import { fromJS, is } from "immutable";
import update from "react-addons-update";
import _ from "lodash";
import { Upload, Icon, Button, Modal, message } from "antd";
import BaseComponent from "../../middleware/base_component";
import HFImage, { EmImgProcessType, computeUrl } from "../image";
import OSSClient from "../../oss/oss_client";

class HFUpload extends BaseComponent("HFUpload") {
  constructor(props, context) {
    super(props, context);
    const { renderType, mode, keyId, baseDir = "test", custom } = this.props;
    this.oss = new OSSClient(baseDir, renderType, mode, keyId, custom);
    this.state = {
      previewImage: "",
      previewVisible: false,
      files: this.dealWith(props.value)
    };
  }

  dealWith(value) {
    if (!value) {
      return [];
    }

    let fs = [];
    if (Object.prototype.toString.call(value) === "[object Array]") {
      // 数组，表示多个值
      fs = _.map(value, (v, k) => {
        return {
          uid: -1 * k,
          name: v,
          status: "done",
          url: v,
          thumbUrl: this.getThumbUrl(v)
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

  componentWillReceiveProps(nextProps) {
    if (!is(fromJS(this.props.value), fromJS(nextProps.value))) {
      this.setState({ files: this.dealWith(nextProps.value) });
    }
  }

  // 配置缩略图地址
  getThumbUrl(url) {
    const { listType = "text" } = this.props;
    if (listType === "text") {
      return null;
    }

    let thumbUrl = computeUrl({
      imageUrl: url,
      width: 100,
      aspectRatio: "1:1",
      quality: 90,
      processType: EmImgProcessType.emGD_L_S,
      water: false
    });

    return thumbUrl;
  }

  onChange = info => {
    let files = [...this.state.files];
    let item = _.find(files, { uid: info.file.uid });
    if (item) {
      // 修改状态
      item.status = info.file.status;
      item.url = info.file.response;
      item.thumbUrl = this.getThumbUrl(info.file.response);
    } else {
      // 队列没有，新增
      files.push({
        uid: info.file.uid,
        name: info.file.name,
        status: info.file.status,
        url: info.file.response,
      });
    }

    if (info.file.status === "done") {
      this.setState({ files: files }, () => {
        this.triggerChange();
      });
    } else {
      this.setState({ files: files });
    }
  }

  onRemove = (file) => {
    if (file.url) {
      this.oss.deleteFile(file.url);
    }

    // 从列表中删除
    this.setState(
      { files: _.remove([...this.state.files], (o) => { return file.uid !== o.uid; }) },
      () => { this.triggerChange(); }
    );
  }

  triggerChange = () => {
    const { onChange, value } = this.props;
    if (onChange) {
      let fs = [];
      for (let v of this.state.files) {
        if (v.status === "done") {
          fs.push(v.url);
        }
      }

      if (Object.prototype.toString.call(value) === "[object Array]") {
        onChange(fs);
      } else {
        onChange(fs[0]);
      }
    }
  }

  onProgress = (e, file) => {
    let files = update(this.state.files, {
      $apply: (o) => {
        let item = _.find(o, ["uid", file.uid]);
        if (item) {
          item.percent = e.percent;
        }
        return o;
      },
    });
    this.setState({ files });
  }

  handUpload = (fs) => {
    const { uploadDir, suffix } = this.props;
    this.oss.uploadFile(fs.file, uploadDir, suffix, (percentage) => {
      return (done) => {
        fs.onProgress({ percent: Math.floor(percentage * 100) }, fs.file);
        done();
      };
    }).then((fp) => {
      fs.onSuccess(fp, fs.file);
    }).catch((err) => {
      console.log("err:", err);
      fs.onError(err, {}, fs.file);
    });
  }

  beforeUpload = (file) => {
    const { limit = 99999 } = this.props;
    if (this.state.files.length >= limit) {
      message.error(`上传文件数量超过限制!${limit}`);
      return false;
    }

    // 默认10M
    const { fileSize = 1024 * 1024 * 10 } = this.props;
    if (file.size > fileSize) {
      message.error(`上传文件大小超过限制!${fileSize}`);
      return false;
    }

    return true;
  }

  // 取消预览
  handleCancel = () => this.setState({ previewVisible: false });

  // 点击预览
  handlePreview = (file) => {
    if (file.url) {
      this.setState({
        previewImage: file.url,
        previewVisible: true,
      });
    }
  }

  render() {
    const { accept, multiple = false, limit = 99999, listType = "text", disabled = false, uploadRender } = this.props;
    let ps = {
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
      fileList: this.state.files,
    };
    const defaultRender = (fileList) => {
      if (fileList.length >= limit || disabled) {
        return null;
      }

      switch (listType) {
        case "picture-card": {
          return (
            <div>
              <Icon type="plus" />
              <div>点击上传</div>
            </div>
          );
        }
        case "picture":
        case "text":
        default: {
          return (
            <Button>
              <Icon type="upload" /> 点击上传
            </Button>
          );
        }
      }
    };

    return (
      <div>
        <Upload {...ps}>
          {
            uploadRender ? uploadRender(ps.fileList) : defaultRender(ps.fileList)
          }
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <HFImage
            imageUrl={this.state.previewImage}
            width={500}
            aspectRatio="3:2"
            quality={90}
            processType={EmImgProcessType.emGD_L_S}
            water={false}
          />
        </Modal>
      </div>
    );
  }
}

HFUpload.propTypes = {
  // 上传的文件类型
  accept: PropTypes.string.isRequired,
  // 是否支持多选,有数量限制的情况下开启多选，限制没有
  multiple: PropTypes.bool.isRequired,
  // 预设路径数组或者字符串
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  // 变化回调通知
  onChange: PropTypes.func,
  // 数量限制
  limit: PropTypes.number,
  // 文件大小限制，默认10M
  fileSize: PropTypes.number,
  // 上传目录
  uploadDir: PropTypes.string.isRequired,
  // 上传保存后缀名
  suffix: PropTypes.string.isRequired,
  // 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon
  showUploadList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // 自定义结构
  uploadRender: PropTypes.func,
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

export default HFUpload;
