
import http from './interrept/interrept.js'

http.setConfig((config) => { /* config 为默认全局配置*/
    config.baseURL = 'http://api.lkblog.net/ws/api.php'; /* 根域名 */
    config.header = {
        a: 1, // 演示用
        b: 2  // 演示用
    }
    return config
})
export default http;