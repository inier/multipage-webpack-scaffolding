import _ from 'lodash';
import '@/assets/js/jquery-FlexSlider';
import { activity } from '@/api';
import './index.scss';

const isDev = process.env.NODE_ENV === 'development';

console.log('isDev:', isDev, '首页的js运行了～～');

_.debounce(() => {
    $('<div>jquery生成的</div>').appendTo('.content');
}, 3000)();

$(document).ready(() => {
    window.jQuery = $;
    activity
        .activityList()
        .then((res) => {
            if (res.result === '0') {
                let tDom = '';
                let href = '';
                // 渲染整图
                _.each(res.data, (item) => {
                    if (item.img) {
                        if (item.href) {
                            href = `href="${item.href}" target="_blank"`;
                        }
                        tDom += `<li class="slider-item"><a class="slider-item-img" ${href}><img src="${item.img}" alt="" /></a></li>`;
                        href = '';
                    }
                });
                tDom && $('#tSlides').html(tDom);
            }

            $('.flexslider', '#js-caSiteNav').flexslider({
                animation: 'fade', // slide or fade
                keyboard: false,
                pauseOnAction: true, // Boolean: 用户操作时停止自动播放
                pauseOnHover: true, // Boolean: 悬停时暂停自动播放
                touch: true,
                start: function (slider) {
                    slider.parent().removeClass('no-js');
                },
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

require('@/components/header/header.js'); // 引入header组件
require('@/components/footer/footer.js'); // 引入footer组件
