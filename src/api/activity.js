/**
 * activity模块接口列表
 */
import axios from '@/api/request'; // 导入request中创建的axios实例
// import { DOMAIN } from './config'; // 导入接口域名列表

const activity = {
    // 广告位列表
    activityList(activityId) {
        return axios.get('/main/actives/list?channelId=partslist_ad&status=0');
    },
    // 其他接口
};

export default activity;
