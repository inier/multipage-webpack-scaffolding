/**
 * common模块接口列表
 */
import axios from '@/api/request'; // 导入request中创建的axios实例
import { DOMAIN } from './config'; // 导入接口域名列表

const common = {
    // 统计事件
    statistics({ type, couponValue }) {
        return axios.get(`${DOMAIN.common}/list`, {
            params: {
                type, // 卡券分类
                couponValue, // 卡券码
            },
        });
    },
    // 搜索
    search({ keywords }) {
        return axios.get(`${DOMAIN.common}/search`, {
            params: {
                keywords, // 搜索关键字
            },
        });
    },
    // 其他接口
};

export default common;
