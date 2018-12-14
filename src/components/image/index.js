import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ossTool from "../../oss/oss_tool";
/*
 图片处理方式枚举
 * */
const EmImgProcessType = {
  emGD_NONE: 0,
  emGD_H_W: 1,
  emGD_W_H: 2,
  emGD_HW_L: 3,
  emGD_HW_S: 4,
  emGD_L_S: 5,
  emGD_S_S: 6
};

const computeUrl = props => {
  let { imageUrl = "", width, height, quality, processType, aspectRatio, water, waterUrl } = props;

  // 图片路径为空，不做处理
  if (imageUrl === "") {
    return "";
  }

  // 处理路径
  imageUrl = ossTool.dealWithURL(imageUrl);

  // 判断后缀，之处理jpg,gif的后缀
  let fileExtend = imageUrl.substring(imageUrl.lastIndexOf(".")).toLowerCase();
  if (fileExtend === ".jpg"
    || fileExtend === ".jpeg"
    || fileExtend === ".gif"
    || fileExtend === ".png"
  ) {
    // 获取文件后缀名,图片服务只针对jpg类型才有效
    // 根据比例计算
    let factors = aspectRatio.split(":");
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
    }

    // 图片处理参数
    let imageOption = "";
    switch (processType) {
      case EmImgProcessType.emGD_H_W: {
        // 等比例缩放: 固定高度，宽度自适应
        imageOption = ossTool.dealWith_GD_H_W(height, quality);
        break;
      }
      case EmImgProcessType.emGD_W_H: {
        // 等比例缩放: 固定宽度，高度自适应
        imageOption = ossTool.dealWith_GD_W_H(width, quality);
        break;
      }
      case EmImgProcessType.emGD_HW_L: {
        // 等比例缩放: 限定宽高，按长边缩放
        imageOption = ossTool.dealWith_GD_HW_L(width, height, quality);
        break;
      }
      case EmImgProcessType.emGD_HW_S: {
        // 等比例缩放: 限定宽高，按短边缩放
        imageOption = ossTool.dealWith_GD_HW_S(width, height, quality);
        break;
      }
      case EmImgProcessType.emGD_L_S: {
        // 限定宽高: 按长边缩放，缩略填充
        imageOption = ossTool.dealWith_GD_L_S(width, height, quality);
        break;
      }
      case EmImgProcessType.emGD_S_S: {
        // 限定宽高: 按短边缩放，居中裁剪
        imageOption = ossTool.dealWith_GD_S_S(width, height, quality);
        break;
      }
      default: {
        // 不做限定,自由显示
        break;
      }
    }

    // gif的不能加水印
    if (water && imageOption !== "" && fileExtend !== ".gif") {
      // 如果waterUrl没有传值，会得到一个默认的水印
      imageOption += ossTool.getWatermarkWithPath(waterUrl || "");
    }

    return imageUrl + imageOption;
  }

  return imageUrl;
};

class HFImage extends PureComponent {
  render() {
    let factImageUrl = computeUrl(this.props);
    if (factImageUrl === "") {
      return null;
    }

    const { linkUrl = "", className, style, onClick } = this.props;
    if (linkUrl.length > 0) {
      return (
        <div className={`img-box ${className || ""}`} style={style} onClick={onClick}>
          <a href={linkUrl} target="blank_">
            <img src={factImageUrl} alt="" />
          </a>
        </div>
      );
    }

    return (
      <div className={`img-box ${className || ""}`} style={style} onClick={onClick}>
        <img src={factImageUrl} alt="" />
      </div>
    );
  }
}

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
  imageUrl: PropTypes.string,
  linkUrl: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.number,
  processType: PropTypes.number,
  aspectRatio: PropTypes.string.isRequired,
  water: PropTypes.bool,
  waterUrl: PropTypes.string
};

// <HFImage
//   imageUrl='http://xxx/a.jpg'
//   linkUrl='http://www.baidu.com'
//   width={600}
//   aspectRatio='3:2'
//   quality={80}
//   processType={EmImgProcessType.emGD_HW_L}
//   water={false}
// />

export {
  HFImage as default,
  EmImgProcessType,
  computeUrl
};
