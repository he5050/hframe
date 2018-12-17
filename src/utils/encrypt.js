import CryptoJS from 'crypto-js'
class Encrypt {
    constructor() {
        this.key = "HP2f8vfyWmaJavbEwa68L7KC5pKIWJpv";
        this.iv = "ZKRsc5li3V7lldDb";
    }
    // 加密
    setAesString(data) {
        let key = CryptoJS.enc.Utf8.parse(this.key);
        let iv = CryptoJS.enc.Utf8.parse(this.iv);
        let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString(); // 返回的是base64格式的密文
    }
    // 解密
    getDAesString(data) {
        let key = CryptoJS.enc.Utf8.parse(this.key);
        let iv = CryptoJS.enc.Utf8.parse(this.iv);
        let decrypted = CryptoJS.AES.decrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)); // 返回的是base64格式的data
    }
    setSesstionData(key, data) {
        if (process.browser) {
            sessionStorage.setItem(("_txz_" + key), this.setAesString(data));
            sessionStorage.setItem((key), new Date().getTime());
        }
    }
    getSessionData(key) {
        if (process.browser) {
            let res = this.getDAesString(sessionStorage.getItem("_txz_" + key));
            return res;
        }
        return {}
    }
    clearSession(key) {
        sessionStorage.removeItem(("_txz_" + key));
        sessionStorage.removeItem(key);
    }
}
const encrypt = new Encrypt();
export default encrypt;
