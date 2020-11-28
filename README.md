# 开箱即用的多页面 webpack 脚手架

本脚手架适合做官网之类的多页面的应用。支持使用 ES6，less，模块化，热加载，eslint 等功能

online demo https://inier.github.io/webpack-multi/build/

基于 webpack 搭建纯静态页面型前端工程解决方案模板

-   按需加载模块，按需进行懒加载，在实际用到某些模块的时候再增量更新
-   多入口文件，自动扫描入口。同时支持 SPA 和多页面型的项目
-   静态资源按需自动注入到 html 中，并可自动加上 hash 值
-   支持 js、css、scss 等代码检查、打包、压缩混淆、图片转 base64 等
-   公用 lib 组件抽离打包，生成一个公共的 bundle 文件
-   功能标识，根据开发/测试环境和生产环境进行不同配置的打包
-   支持自动部署打包发布远程服务器
-   支持组件化开发(利用了 ejs 模版方法)

## why webpack？

-   **它和 browserify 类似** 但是它可以把你的应用拆分成多个文件。如果你的单页应用里有很多页面，用户只会下载当前访问页面的代码。当他们访问应用中的其他页面时，不再需要加载与之前页面重复的通用代码。
-   **它可以替代 gulp 和 grunt** 因为他可以构建打包 css、预处理 css、编译 js 和图片等。
-   **它支持 AMD 和 CommonJS**，以及其他的模块系统(Angular, ES6)。如果你不太熟悉如何使用，就用 CommonJS 吧。

## 环境

-   Node.js

## 拷贝项目模板

    $ git clone https://github.com/inier/webpack-multi.git

## Build Setup

```bash
# 安装依赖
yarn

# 开发时,在本地启localhost:3000，并开始热加载
yarn start

# production的发布时打包
yarn build

```

## 目录结构

```
│─webpack                                  // webpack配置文件夹
│  ├─webpack.config.dev.js                 // 开发环境的webpack配置文件
│  └─webpack.config.prod.js                // 生成环境的webpack配置文件
│
├─src                                      // src 文件夹
│    ├─assets                              // 资源文件夹
│    ├─components                          // 组件文件夹
│    ├─pages                               // 页面文件夹
│    │  ├─about
│    │  │      about.html
│    │  │      about.js
│    │  │      about.less
│    │  └─index
│    │         index.html
│    │         index.js
│    │         index.less
│    │
│    └─utils                          // 工具文件夹
│       └─     utils.js
│
│  .babelrc                         // babel的配置文件
│  .eslintignore
│  .eslintrc.js                     // eslint的配置文件
│  .gitignore
│  ecosystem.config.js              // pm2 deploy的配置文件
│  package.json
│  README.md
│  webpack.config.js            // webpack配置文件

```

## 开发流程

如果增加新页面，只需要在 pages 目录中新增一个文件夹,同一目录下只有一个入口 js（不需要改 weback 等配置文件），例如：

```
  contact
    - index.html/ejs
    - index.js
    - index.css/scss/less
  }

```

## 开发相关

### ejs 模板用法

本项目使用的[ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader#htmlminify).

-   需要传值时：

```
// 传值: require('xxx/xxx.ejs')()
<%- require('xxx/xxx.ejs')({title: 'welcome'}) %>

// 取值: {title: 'welcome'} 对应的key
<title><%- title %></title>
```

-   不需要传值时：

```
<%- require('xxx/xxx.ejs')() %>
// or
<%- include xxx/xxx.ejs -%>
```

更多用法，[详情](https://github.com/mde/ejs/blob/master/docs/syntax.md)。
## 部署测试环境

通过 docker 部署，下面分别介绍 docker 和 pm2 deploy

## docker

### docker 部署思路

docker 部署的思路，是根据 Dockerfile 打 docker 镜像，一般是通过 Jenkins 自动化工具打 docker 镜像，然后推送到公司的镜像私服

之后就可以使用镜像起容器了

1. 如果是微服务架构，比如使用的是 k8s 来管理集群，则需要定义 yaml 文件，并通过 kubectrl 命令起 pod 和容器(各个公司的情况不一样，具体的详细细节最好和你们公司的运维同学聊一下)
2. 如果不是集群的方式，则相对简单，直接拉取镜像，运行 docker run -p 映射的端口：3000 镜像 id 即可起一个容器

Dockerfile 和 Nginx 的配置文件已在项目的根目录，可根据各厂实际情况进行修改

如需进一步的细节介绍，后续再补文档。。。

### 在本机测试 docker 部署

```

docker build -t  test:v2  .
docker run  -p 5000:3000 test:v2

```

访问 localhost:5000 观察是否能正常访问

## pm2 deploy

### 1.配置 ssh 免密登录

-   查看本机是否有一对秘钥？mac 到~/.ssh 目录下查看，windows 到 C:\Users\zhangsan（自己的用户名）\.ssh

```
ls

id_rsa      id_rsa_vc      known_hosts  rhc.pub
id_rsa.pub  id_rsa_vc.pub  rhc

```

发现存在密钥对。若不存在，则生成一对

```
ssh-keygen -t rsa --P

```

-   登录远程测试机，到用户目录下的.ssh 文件夹下，查看是否有 authorized_keys，没有的话创建一个

```
ssh root@xxx.xx.xx.xx
cd ~/.ssh/
vim authorizd_keys

```

vim 打开 authorized_keys 之后，把你本机的公钥里的内容拷贝到远程机器的 authorized_keys 文件中，不要删除 authorized_keys 已有的公钥，在已有的内容的下面粘贴即可。然后保存文件。验证是否能免密登录了。

```
ssh root@xxx.xx.xx.xx

```

经验证发现登录成功，没要求输入密码。此时免密登录的设置完成

### 2.远程发布

-   确保本机已安装全局的 pm2,下面是我本机的结果，已安装 pm2，没安装的话，安装一下

```
npm list -g --depth=0   | grep pm2
-- pm2@2.8.0

```

没安装的话，全局安装一下 pm2

```
npm install pm2 -g

```

-   在本项目的根目录下，运行创建环境的命令(首次跑的时候需要用，此后就不再需要了)

```
pm2 deploy ecosystem.config.js dev setup

```

-   发布命令

```
pm2 deploy ecosystem.config.js dev                // 发布dev分支到dev环境
pm2 deploy ecosystem.config.js test                // 发布master分支到test环境
```

学习 pm2 的 deploy，[详情请进入](http://pm2.keymetrics.io/docs/usage/deployment/#windows-consideration)
