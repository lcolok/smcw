import AV from 'leancloud-storage'

import current_app_id from '!raw-loader!../../.leancloud/current_app_id';
import current_app_key from '!raw-loader!../../.leancloud/current_app_key';

AV.init({
  appId: current_app_id,
  appKey: current_app_key,
})

import custom_dev_port from '!raw-loader!../../.leancloud/custom_dev_port';
if (process.env.NODE_ENV == "development") {//如果是处于开发状态的话
  AV._setServerURLs('http://localhost:' + custom_dev_port)//设置本地服务器端口(必须先进行 lean up 操作)
}


export default AV