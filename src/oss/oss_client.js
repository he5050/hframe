import shortId from "shortid";
import _ from "lodash";
import ossTool from './oss_tool';
import fetchPack from '../net/fetch';

class OSSClient {
  constructor(
    baseDir = 'test',
    renderType = 'server',
    mode = 'development',
    keyId = null,
    custom
  ) {
    if (renderType === 'client') {
      // 本对象的唯一ID,keyId是服务器端生成的,通过shortId.generate(),再结合客户端生成的,保证唯一性
      if (keyId) {
        this.keyId = `${keyId}_${shortId.generate()}`;
      } else {
        this.keyId = shortId.generate();
      }

      // 传输序号
      this.index = 0;

      // oss客户端
      this.ossClient = null;
      // 配置信息
      this.ossCnf = {
        ...ossTool.getOSSCnf(mode, baseDir, custom),
      };
      // token信息
      this.ossToken = {};
    }

    this.renderType = renderType;
  }

  async getOSSToken() {
    try {
      let resp = await fetchPack.get('/ossToken');
      if (resp.succ) {
        return {
          success: true,
          accessKeyId: resp.data[0].AccessKeyId,
          accessKeySecret: resp.data[0].AccessKeySecret,
          stsToken: resp.data[0].SecurityToken,
          expiration: resp.data[0].Expiration,
        };
      }
    } catch (error) {
      console.log(error);
    }

    return {
      success: false,
    };
  }

  /**
   * 检查oss客户端是否正常生成
   * @returns {Promise.<boolean>}
   */
  async hasOSSClient() {
    if (this.renderType !== 'client') {
      return false;
    }

    const { expiration } = this.ossToken;
    let ossToken = {};
    // 判断token是否过期
    if (expiration) {
      // 取得过期时间差
      let ex = Number(((new Date(expiration)).getTime() - (new Date()).getTime()) / 1000);
      if (ex < 300) {
        ossToken = await this.getOSSToken();
      } else {
        return true;
      }
    } else {
      ossToken = await this.getOSSToken();
    }

    if (!ossToken.success) {
      return false;
    }

    this.ossToken = { ..._.omit(ossToken, 'success') };
    this.ossClient = new OSS.Wrapper({
      region: this.ossCnf.region,
      bucket: this.ossCnf.bucket,
      secure: true,
      accessKeyId: ossToken.accessKeyId,
      accessKeySecret: ossToken.accessKeySecret,
      stsToken: ossToken.stsToken,
    });

    return true;
  }

  async uploadFiles(files, uploadDir, suffix = 'jpg', progress, checkpoint) {
    if (!uploadDir) {
      throw new Error('参数异常');
    }

    // 获取OSS客户端
    let hasOssClient = await this.hasOSSClient();
    if (!hasOssClient) {
      throw new Error('客户端错误');
    }

    let filePaths = [];
    for (let v of files) {
      let key = `${this.ossCnf.baseDir}/${uploadDir}/${this.keyId}_${this.index}.${suffix}`;

      // 传输序号递增
      this.index += 1;

      let result;
      if (progress) {
        result = await this.ossClient.multipartUpload(key, v, {
          checkpoint: checkpoint,
          progress: progress,
        });
      } else {
        result = await this.ossClient.multipartUpload(key, v);
      }

      filePaths.push(`${this.ossCnf.hostUrl}/${result.name}`);
    }

    return filePaths;
  }

  // 上传图片，文件名随机生成
  async uploadFile(file, uploadDir, suffix = 'jpg', progress, checkpoint) {
    if (!uploadDir) {
      throw new Error('参数异常');
    }

    // 获取OSS客户端
    let hasOssClient = await this.hasOSSClient();
    if (!hasOssClient) {
      throw new Error('客户端错误');
    }

    // 传输序号递增
    this.index += 1;
    let result;
    let key = `${this.ossCnf.baseDir}/${uploadDir}/${this.keyId}_${this.index}.${suffix}`;
    if (progress) {
      if (checkpoint) {
        result = await this.ossClient.multipartUpload(key, file, {
          checkpoint: checkpoint,
          progress: progress,
        });
      } else {
        result = await this.ossClient.multipartUpload(key, file, {
          progress: progress,
        });
      }
    } else {
      result = await this.ossClient.multipartUpload(key, file);
    }

    return `${this.ossCnf.hostUrl}/${result.name}`;
  }

  // 上传图片，文件名保存不变
  async upWithFileName(file, uploadDir, progress, checkpoint) {
    if (!uploadDir) {
      throw new Error('参数异常');
    }

    // 获取OSS客户端
    let hasOssClient = await this.hasOSSClient();
    if (!hasOssClient) {
      throw new Error('客户端错误');
    }

    let result;
    let key = `${this.ossCnf.baseDir}/${uploadDir}/${file.name}`;
    if (progress) {
      result = await this.ossClient.multipartUpload(key, file, {
        checkpoint: checkpoint,
        progress: progress,
      });
    } else {
      result = await this.ossClient.multipartUpload(key, file);
    }

    return `${this.ossCnf.hostUrl}/${result.name}`;
  }

  // 删除单文件(本次上传的文件)
  async deleteFile(path) {
    // 获取OSS客户端
    let hasOssClient = await this.hasOSSClient();
    if (!hasOssClient) {
      throw new Error('客户端错误');
    }

    if (path.indexOf(`${this.keyId}`) > 0) {
      await this.ossClient.delete(path.substr(this.ossCnf.hostUrl.length));
    }
  }

  // 删除多文件(本次上传的文件)
  async deleteFiles(paths) {
    // 获取OSS客户端
    let hasOssClient = await this.hasOSSClient();
    if (!hasOssClient) {
      throw new Error('客户端错误');
    }

    for (let v of paths) {
      if (v.indexOf(`${this.keyId}`) > 0) {
        await this.ossClient.delete(v.substr(this.ossCnf.hostUrl.length));
      }
    }
  }
}

export default OSSClient;
