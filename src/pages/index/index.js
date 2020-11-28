import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash';
import './index.scss';

const isDev = process.env.NODE_ENV === 'development';

console.log('isDev:', isDev, '首页的js运行了～～');

_.debounce(() => {
    $('<div>jquery生成的</div>').appendTo('.content');
}, 3000)();

async function welcome() {
    const res = await sayHello();
    console.log(res);
}

function sayHello() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello world');
        }, 2000);
    });
}

welcome();

if (isDev && module.hot) {
    module.hot.accept();
    /**
     * 监听 hot module 完成事件，重新从服务端获取模板，替换掉原来的 document
     * 这种热更新方式需要注意：
     * 1. 如果你在元素上之前绑定了事件，那么热更新之后，这些事件可能会失效
     * 2. 如果事件在模块卸载之前未销毁，可能会导致内存泄漏
     * 3. 上述两个问题的解决方式，可以在 document.body 内容替换之前，将事件手动解绑。
     */
    module.hot.dispose(() => {
        const href = window.location.href;
        axios
            .get(href)
            .then((res) => {
                const template = res.data;
                document.body.innerHTML = template;
            })
            .catch((e) => {
                console.error(e);
            });
    });
}

require('@/components/header/header.js'); // 引入header组件
require('@/components/footer/footer.js'); // 引入footer组件
