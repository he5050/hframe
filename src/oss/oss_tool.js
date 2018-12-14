import cryptoTool from "../utils/crypto_tool";

const ossTool = {
  // 获取bucket path
  getOSSCnf(mode, baseDir = "test", custom) {
    let ossCnf = {
      custom: false,
      region: "oss-cn-shenzhen",
      baseDir: baseDir
    };

    if (custom) {
      ossCnf.custom = true;
      ossCnf.region = custom.region;
      ossCnf.bucket = custom.bucket;
      ossCnf.hostUrl = custom.hostUrl;
    } else {
      if (mode === "production") { // 产品模式
        ossCnf.bucket = "hjfmytest";
        ossCnf.hostUrl = "//hjfmytest.oss-cn-shenzhen.aliyuncs.com";
      } else { // 开发模式
        ossCnf.bucket = "hjfmytest-test";
        ossCnf.hostUrl = "//hjfmytest-test.oss-cn-shenzhen.aliyuncs.com";
      }
    }

    return ossCnf;
  },

  // 处理路径
  dealWithURL(path) {
    if (path.indexOf("hjfmytest.oss-cn-shenzhen.aliyuncs.com") > 0) {
      path = path.replace(/hjfmytest.oss-cn-shenzhen.aliyuncs.com/g, "img.hjfmytest.com");
      if (!path.startsWith("http:") && !path.startsWith("https:")) {
        path = `https:${path}`;
      }
    } else if (path.indexOf("hjfmytest-test.oss-cn-shenzhen.aliyuncs.com") > 0) {
      path = path.replace(/hjfmytest-test.oss-cn-shenzhen.aliyuncs.com/g, "testimg.hjfmytest.com");
      if (!path.startsWith("http:") && !path.startsWith("https:")) {
        path = `https:${path}`;
      }
    } else {
      if (!path.startsWith("http:") && !path.startsWith("https:")) {
        path = `http:${path}`;
      }
    }

    return path;
  },

  // 根据图片路径获取水印，当前图片会作为水印图片
  getWatermarkWithPath(path) {
    let ct = path.match(/\.com\/(\S*)/);
    if (ct) {
      return `/watermark,image_${cryptoTool.base64encode(ct[1])},t_50,g_se,y_10,x_10`;
    }
    // 获取一个默认的水印
    return "";
  },

  // 等比例缩放: 固定高度，宽度自适应
  dealWith_GD_H_W(height, quality = 100) {
    let imageOption = "";
    if (height === "100%") {
      imageOption = "?x-oss-process=image/auto-orient,0";
    } else {
      imageOption = `?x-oss-process=image/resize,m_lfit,h_${height},limit_0/auto-orient,0`;
    }

    if (quality < 100) {
      imageOption += `/quality,q_${quality}`;
    }
    return imageOption;
  },

  // 等比例缩放: 固定宽度，高度自适应
  dealWith_GD_W_H(width, quality = 100) {
    let imageOption = "";
    if (width === "100%") {
      imageOption = "?x-oss-process=image/auto-orient,0";
    } else {
      imageOption = `?x-oss-process=image/resize,m_lfit,w_${width},limit_0/auto-orient,0`;
    }

    if (quality < 100) {
      imageOption += `/quality,q_${quality}`;
    }
    return imageOption;
  },

  // 等比例缩放: 限定宽高，按长边缩放
  dealWith_GD_HW_L(width, height, quality = 100) {
    let imageOption = "";
    if (height !== "100%" && width !== "100%") {
      imageOption = `?x-oss-process=image/resize,m_lfit,w_${width},h_${height},limit_0/auto-orient,0`;
    } else {
      imageOption = "?x-oss-process=image/auto-orient,0";
    }

    if (quality < 100) {
      imageOption += `/quality,q_${quality}`;
    }
    return imageOption;
  },

  // 等比例缩放: 限定宽高，按短边缩放
  dealWith_GD_HW_S(width, height, quality = 100) {
    let imageOption = "";
    if (height !== "100%" && width !== "100%") {
      imageOption = `?x-oss-process=image/resize,m_mfit,w_${width},h_${height},limit_0/auto-orient,0`;
    } else {
      imageOption = "?x-oss-process=image/auto-orient,0";
    }

    if (quality < 100) {
      imageOption += `/quality,q_${quality}`;
    }
    return imageOption;
  },

  // 限定宽高: 按长边缩放，缩略填充
  dealWith_GD_L_S(width, height, quality = 100) {
    let imageOption = "";
    if (height !== "100%" && width !== "100%") {
      imageOption = `?x-oss-process=image/resize,m_pad,w_${width},h_${height},limit_0/auto-orient,0`;
    } else {
      imageOption = "?x-oss-process=image/auto-orient,0";
    }

    if (quality < 100) {
      imageOption += `/quality,q_${quality}`;
    }
    return imageOption;
  },

  // 限定宽高: 按短边缩放，居中裁剪
  dealWith_GD_S_S(width, height, quality = 100) {
    let imageOption = "";
    if (height !== "100%" && width !== "100%") {
      imageOption = `?x-oss-process=image/resize,m_fill,w_${width},h_${height},limit_0/auto-orient,0`;
    } else {
      imageOption = "?x-oss-process=image/auto-orient,0";
    }

    if (quality < 100) {
      imageOption += `/quality,q_${quality}`;
    }
    return imageOption;
  }
};

export default ossTool;
