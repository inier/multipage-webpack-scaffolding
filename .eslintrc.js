// .eslintrc.js

// https://eslint.org/docs/rules/
// https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js
// https://cloud.tencent.com/developer/doc/1078

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            legacyDecorators: true,
            jsx: true,
        },
    },
    env: {
        browser: true,
        jest: true,
    },
    globals: {
        React: true,
        ReactDOM: true,
        mountNode: true,
        document: true,
        i18n: true,
        navigator: true,
        node: true,
        require: false,
        window: true,
        $: true,
    },
    // 开启推荐配置信息
    extends: ['standard', 'prettier'],
    // eslint eslint-plugin-prettier来识别.prettierrc.js配置来集成规则
    plugins: ['html', 'prettier'],
    // 启用的规则及各自的错误级别
    rules: {
        // prettier规则检查：警告
        'prettier/prettier': 'warn',

        /**
         * import/export相关
         * https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
         */
        // 必须写明文件类型：取消
        'import/extensions': 'off',
        // 路径必须可以被本地文件系统解析：取消
        'import/no-unresolved': 'off',
        // 只能引用package.json声明的依赖：取消 TBD
        'import/no-extraneous-dependencies': 'off',
        // 优先使用 export default: 取消
        'import/prefer-default-export': 'off',
        // 禁止重复imports
        'no-duplicate-imports': 'error',

        /** 基础语法规则 https://eslint.org/docs/rules/ */
        // 箭头函数必须使用大括号：取消
        'arrow-body-style': 'off',
        // 代码块{}的括号样式，起始大括号跟随语句末尾：警告
        'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
        // 驼峰命名方式：警告
        camelcase: ['warn'],
        // 拖尾逗号：多行时必须每行有逗号
        // 'comma-dangle': ['warn', 'always-multiline'],
        // 减少绑定上下文之外的变量的使用
        'block-scoped-var': 'error',
        // 旨在标记不使用的类方法this：取消
        'class-methods-use-this': 'off',
        // 限制程序的圈复杂度
        complexity: ['warn', 20],
        // 函数必须有返回值：取消
        'consistent-return': 'off',
        // 尽可能使用点符号样式，维护代码一致性和可读性：警告
        'dot-notation': 'warn',
        // 禁止匿名函数：取消
        'func-names': 'off',
        // 旨在防止使用for in循环而不过滤循环中的结果时可能出现的意外行为：警告
        'guard-for-in': 'warn',
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 禁止在同一范围内重复声明同一变量
        'no-redeclare': ['error', { builtinGlobals: false }],
        // 换行符\n或\r\n的验证：取消
        'linebreak-style': 'off',
        // 强制一行的最大长度：取消，使SVG不用重新调整格式
        'max-len': 'off',
        // 强制执行嵌套块的最大深度：6
        'max-depth': ['error', 6],
        // 指定函数定义中允许的最大参数个数：5
        'max-params': ['warn', 5],
        // 指定函数中允许的最大语句数：50
        'max-statements': ['error', 50],
        // 要求构造函数名以大写字母开头
        'new-cap': 'error',
        // 禁止使用 var
        'no-var': 'error',
        // 禁用__proto__属性
        'no-proto': 'error',
        // 检查循环条件内引用的变量是否在循环中被修改
        'no-unmodified-loop-condition': 'error',
        // 禁止 console：取消
        'no-console': 'off',
        // 禁止变量声明与外层作用域的变量同名：取消
        'no-shadow': 'off',
        // 禁止未使用过的表达式：取消，以此来支持a && a()的代码形式
        'no-unused-expressions': 'off',
        // 禁止变量定义前使用：警告, 函数除外
        'no-use-before-define': ['warn', { functions: false }],
        // 禁止直接调用 Object.prototypes 的内置属性：警告
        'no-prototype-builtins': 'warn',
        // 禁止对函数参数进行重新赋值：警告
        'no-param-reassign': 'warn',
        // 禁用特定的全局变量：取消
        // 'no-restricted-globals': 'off',
        // 禁止 if 语句中 return 语句之后有 else 块：取消
        'no-else-return': 'off',
        // 禁止在 return 语句中使用赋值语句：取消  ref={formRef => form = formRef}
        'no-return-assign': 'off',
        // 禁止在return语句中使用await：取消
        'no-return-await': 'off',
        // 禁止 ++ --: 取消， for循环中使用例外
        'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],
        // 禁止await在循环体内使用：警告
        'no-await-in-loop': 'warn',
        // 禁止按位运算符：警告
        'no-bitwise': 'warn',
        // 禁止在可能与比较运算符混淆的地方使用箭头函数语法
        'no-confusing-arrow': 'error',
        // 禁止模糊等于null
        'no-eq-null': 'error',
        // 消除浮动小数点值的误解：警告
        'no-floating-decimal': 'warn',
        // 禁止将if语句作为else块中的唯一语句：警告
        'no-lonely-if': 'warn',
        // 对象声明是否换行：取消
        'object-curly-newline': 'off',
        // 优先使用解构：取消
        'prefer-destructuring': 'off',
        // 优先使用箭头函数作为回调函数或函数参数的函数表达式：警告
        'prefer-arrow-callback': 'warn',
        // 优先模板字符串
        'prefer-template': 'error',
        // 警告不具有await表达式的异步函数
        'require-await': 'error',
        // 强制执行有效且一致的JSDoc注释：警告
        'valid-jsdoc': [
            'warn',
            {
                requireReturn: false,
                requireReturnDescription: false,
                requireReturnType: false,
            },
        ],

        /** 国际化相关 */
        'i18n/no-chinese-character': 'off',
    },
};
