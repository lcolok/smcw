import AV from 'leancloud-storage'

import current_app_id from '!raw-loader!../../.leancloud/current_app_id';
import current_app_key from '!raw-loader!../../.leancloud/current_app_key';

AV.init({
  appId: current_app_id,
  appKey: current_app_key,
})

export default AV