// 在pathmap.json 里面配置了commons.css的alias别名 commonCss
const $ = require("jquery");
const _=require('lodash');
require('commonCSS');
require('./index.scss');
require('@/components/header/header.js')// 引入header组件
require('@/components/footer/footer.js')// 引入footer组件

$("<div>这是jquery生成的</div>").appendTo("body");
