import axios from 'axios';
import QS from 'qs';
import ROOT from './config';
import router from '@/router';
import store from '@/store';
import { toast } from '@/utils/utils';

// 设置baseURL
axios.defaults.baseURL = ROOT.baseURL;

// 设置请求超时时间
axios.defaults.timeout = 1000 * 12;

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建axios实例
const instance = axios.create();

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath,
        },
    });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {Number} other 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401: {
            toLogin();

            break;
        }
        // 403 token过期
        // 清除token并跳转登录页
        case 403: {
            toast('登录过期，请重新登录');

            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);

            break;
        }
        // 404请求不存在
        case 404: {
            toast('请求的资源不存在');
            break;
        }
        // 其他错误，直接抛出错误提示
        default: {
            // toast(other);
            console.log(status, other);
        }
    }
};

/**
 * @description 判断响应格式
 * @param {*} headers 返回的响应头或请求头
 * @param {*} type 请求类型, application/json：JSON数据格式,默认;application/octet-stream：二进制流数据（如常见的文件下载）
 * @returns {boolean}
 */
export function checkContentType(headers = {}, type = 'application/json') {
    if (!Object.keys(headers).length) {
        console.log('header配置有误，', headers);
        return false;
    }

    const contentType = headers.get('content-type') || '';

    if (contentType.indexOf(type) >= 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * @description 接受接口的返回
 * @param {*} res 返回的res
 * @returns 返回的res
 */
const handleResponse = (res) => {
    if (res && res.ok) {
        const tHeader = res.headers;
        if (!Object.keys(tHeader).length || checkContentType(tHeader, 'application/json')) {
            return res.json();
        } else if (checkContentType(tHeader, 'application/octet-stream')) {
            return res;
        } else {
            return res.text();
        }
    } else {
        const error = new Error(`请求失败！状态码：${res.status}，失败信息：${res.statusText}`);
        error.response = res;
        return Promise.reject(error);
    }
};

/**
 * @description 处理获取的结果
 * 1.实现token自动刷新功能
 * 2.实现自动根据api/ResponseCode中的错误信息显示
 * @param {*} json 获取到的结果
 * @param {*} url url
 * @param {*} params 参数
 * @param {*} opts 操作
 * @returns 获取的数据
 */
function _handleData(json, url, params, opts) {
    // 特殊格式（示例代码）
    if (json && json.results !== null) {
        return json;
    }

    if (!json || typeof json.result === 'undefined' || json.result === null) {
        console.log(`数据格式不正确！`);
        return {};
    }

    switch (json.result) {
        // 获取数据成功
        case '0': {
            return json;
        }

        // 自动显示错误信息
        default: {
            console.log(`Requst is get Error,Code :${json.result}`);
            return json;
        }
    }
}

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        const token = store.state.token;

        token && (config.headers.Authorization = token);

        return config;
    },
    (error) => Promise.error(error),
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    (error) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);

            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            store.commit('changeNetwork', false);
        }
    },
);

// 封装get方法和post方法
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns {Promise}
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns {Promise}
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, QS.stringify(params))
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export default instance;
