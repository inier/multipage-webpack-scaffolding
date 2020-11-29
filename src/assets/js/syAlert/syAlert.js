import $ from 'jquery';

const syAlert = (function () {
    return {
        init: function () {
            const { id, type, enter, leave, mask, title, content, cancelText, okText, cancel, ok } = this.defaultOpts;
            var dom = $('#' + id);
            if (dom[0]) {
                return;
            }

            if (['alert', 'tips', 'modal'].includes(type)) {
                dom = $(`
                <div class="sy-alert sy-alert-${type} animated" sy-enter="${enter}" sy-leave="${leave}" sy-type="${type}" sy-mask="${mask}" id="${id}">
                </div>
                `);
            }
            if (title) {
                dom.append(`<div class="sy-title">${title}</div>`);
            }
            if (content) {
                dom.append(`<div class="sy-content">${content}</div>`);
            }
            if (['alert', 'modal'].includes(type)) {
                let btnStr = $('<div class="sy-btn"></div>');

                if (cancel) {
                    const btn = $(`<button>${cancelText}</button>`);
                    btn.on('click', () => {
                        //绑定点击事件
                        this.hide(id);
                        cancel && cancel(id);
                    });
                    btnStr.append(btn);
                }
                if (ok) {
                    const btn = $(`<button>${okText}</button>`);
                    btn.on('click', () => {
                        //绑定点击事件
                        this.hide(id);
                        ok && ok(id);
                    });
                    btnStr.append(btn);
                }

                dom.append(btnStr);
            }
            $('body').append(dom);
        },
        open: function (options) {
            this.defaultOpts = {
                id: 'sys-message',
                type: 'tips',
                mask: false,
                enter: 'zoomIn',
                leave: 'zoomOut',
                title: '',
                content: '',
                cancelText: '取消',
                okText: '确定',
                ok: () => {},
                duration: 3000,
                ...options,
            };
            const { id, type, enter, mask, duration, cancel } = this.defaultOpts;

            this.init();

            var dom = $('#' + id);
            this.center(dom);
            dom.addClass(enter);
            dom.show();
            var that = this;

            // $('body').css({ 'overflow-y': 'hidden' });

            if (mask) {
                const div = $(`<div class='sy-mask'></div>`);
                div.on('click', () => {
                    this.hide(id);
                    cancel && cancel(id);
                });
                $('body').append(div);
                $('.sy-mask').fadeIn(300);
            }

            setTimeout(function () {
                dom.removeClass(enter);
            }, 300);

            if (type == 'tips') {
                setTimeout(function () {
                    that.hide(id);
                }, duration);
            }
        },
        hide: function (id) {
            if (typeof id == 'undefined') {
                var dom = $('.sy-alert');
            } else {
                var dom = $('#' + id);
            }
            var name = dom.attr('sy-leave');
            dom.addClass(name);
            $('.sy-mask').fadeOut(300);
            setTimeout(function () {
                dom.hide();
                dom.removeClass(name);
                $('.sy-mask').remove();
                $('body').css({ 'overflow-y': 'auto' });
            }, 300);
        },
        center: function (dom) {
            var mgTop = parseFloat(dom.height() / 2);
            dom.css({ top: '50%', 'margin-top': '-' + mgTop + 'px' });
        },
    };
})();

export default syAlert;
