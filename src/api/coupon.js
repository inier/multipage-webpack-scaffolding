/**
 * coupon模块接口列表
 */
import axios from '@/api/request'; // 导入request中创建的axios实例
import { DOMAIN } from './config'; // 导入接口域名列表

const coupon = {
    // 商家列表
    // 分类列表
    categoryList() {
        return axios.get(`${DOMAIN.coupon}/category`);
    },
    // 卡券列表
    couponList(merchantId) {
        return axios.get(`${DOMAIN.coupon}/list`, {
            params: {
                merchantId, // 活动商id，不传表示所有
            },
        });
    },
    // 详情
    couponDetail(params) {
        return axios.get(`${DOMAIN.coupon}/detail`, {
            params: params,
        });
    },
    // 其他接口
};

export default coupon;
