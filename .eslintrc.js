// npm i -g eslint eslint-plugin-react eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-vue eslint-plugin-node babel-eslint
// npm i eslint eslint-plugin-react eslint-config-standard eslint-plugin-standard eslint-plugin-prettier eslint-plugin-promise eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-vue eslint-plugin-node babel-eslint chalk --save-dev
module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    // 定义全局变量
    // true代表允许重写、false代表不允许重写
    "globals": {
        "document": true,
        "navigator": true,
        "window": true,
        "it": true,
        "describe": true,
        "require": true,
        "process": true,
        "before": true,
        "after": true,
        "sinon": true,
        "expect": true,
        "beforeEach": true,
        "afterEach": true,
        "App": true,
        "wx": true,
        "regeneratorRuntime": true,
        "Page": true,
        "getApp": true,
        "getCurrentPages": true,
        "Component": true,
        "OSS": true,
        "AMap": true,
        "upsdk": true,
        "NIM": true,
        "WebIM": true,
        "Taro": true
    },
    // EsLint 默认使用 esprima 做脚本解析，当然你也切换他，比如切换成babel-eslint解析
    // "parser": "babel-eslint",
    // "parserOptions": {
    //     "parser": "babel-eslint",
    //     "ecmaVersion": 2017,
    //      "sourceType": "module"
    // },
    "extends": [
        "plugin:react/recommended",
        "eslint:recommended",
        "standard"
        // "plugin:vue/essential"
    ],
    "settings": {
        "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use,
        "pragma": "React", // Pragma to use, default to "React"
        "version": "16.4", // React version, default to the latest React stable release
        "flowVersion": "0.53" // Flow version
        },
        "propWrapperFunctions": [ "forbidExtraProps" ]
    },
    // 配置第三方插件
    // 在使用插件前要用npm安装它
    "plugins": [
        "standard",
        "promise",
        "react",
        "jsx-a11y",
        "import",
        "prettier"
    ],
    // javascript语言选项
    "parserOptions": {
        "parser": "babel-eslint",
        // 语法版本3、5（默认）、6、7、8
        "ecmaVersion": 7,
        // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
        "sourceType": "module",
        // 这是个对象，表示你想使用的额外的语言特性
        "ecmaFeatures": {
            "legacyDecorators": true,
            "impliedStrict": true,
            "jsx": true,
            "vue": true
        }
    },
    "rules": {
        // 这就是分号党和非分号党关心的了，我们还是选择加分号
        "semi": [2, "always"],
        // 该规则规定了分号前后的空格，具体规定如下。
        "semi-spacing": [2, {
            "before": false,
            "after": true
        }],
        // 代码块前面需要加空格
        "space-before-blocks": [2, "always"],
        // 函数圆括号前面需要加空格
        "space-before-function-paren": [0, "never"],
        // 圆括号内部不需要加空格
        "space-in-parens": [2, "never"],
        // 操作符前后需要加空格
        "space-infix-ops": 2,
        // 一元操作符前后是否需要加空格，单词类操作符需要加，而非单词类操作符不用加
        "space-unary-ops": [2, {
            "words": true,
            "nonwords": false
        }],
        // 立即执行函数需要用圆括号包围
        "wrap-iife": [2, "any"],
        // 低版本 nodejs 需要在 strict 模式下支持 es6 语法
        "strict": "off",
        // 经常需要打印东西
        "no-console": "off",
        // 不希望参数使用解构,低版本 nodejs 不支持
        "prefer-spread": "off",
        // 会有很多地方需要直接使用 arguments
        "prefer-rest-params": "off",
        // 有动态引入的需求
        "import/no-dynamic-require": "off",
        // 有些函数对外需要暴露 generator 类型函数,但里面确实只有同步代码
        "require-yield": "off",
        // 一些正则表达式需要用到
        "no-useless-escape": "off",
        // 感觉这样写简洁一些
        "no-mixed-operators": "warn",
        "no-lonely-if": "off",
        "class-methods-use-this": "off",
        "no-restricted-syntax": "off",
        "no-param-reassign": "off",
        "linebreak-style": "off",
        "arrow-body-style": "off",
        "no-extra-boolean-cast": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "no-unused-vars": [2, {
            "vars": "all",
            "args": "after-used",
            "varsIgnorePattern": "Taro"
        }],
        "guard-for-in": 0,
        // 在定义对象或数组时，最后一项不能加逗号
        "comma-dangle": [2, "never"],
        // 箭头函数中，在需要的时候，在参数外使用小括号（只有一个参数时，可以不适用括号，其它情况下都需要使用括号）
        "arrow-parens": [2, "as-needed"],
        // 箭头函数中的箭头前后需要留空格
        "arrow-spacing": [2, {
            "before": true,
            "after": true
        }],
        // 如果代码块是单行的时候，代码块内部前后需要留一个空格
        "block-spacing": [2, "always"],
        // 大括号语法采用『1tbs』,允许单行样式
        "brace-style": [2, "1tbs", {
            "allowSingleLine": true
        }],
        // 在写逗号时，逗号前面不需要加空格，而逗号后面需要添加空格
        "comma-spacing": [2, {
            "before": false,
            "after": true
        }],
        // 如果逗号可以放在行首或行尾时，那么请放在行尾
        "comma-style": [2, "last"],
        // 在constructor函数中，如果 classes 是继承其他 class，那么请使用super。否者不使用super
        "constructor-super": 0,
        // 在if-else语句中，如果 if 或 else 语句后面是多行，那么必须加大括号。如果是单行就应该省略大括号。
        "curly": [2, "multi-line"],
        // 该规则规定了.应该放置的位置，
        "dot-location": [2, "property"],
        // 该规则要求代码最后面需要留一空行，（仅需要留一空行）
        "eol-last": 0,
        // 该规则规定了generator函数中星号两边的空白。
        "generator-star-spacing": [2, {
            "before": true,
            "after": true
        }],
        // 规定callback 如果有err参数，只能写出err 或者 error .
        "handle-callback-err": [2, "^(err|error)$"],
        // 这个就是关于用什么来缩进了，规定使用tab 来进行缩进，switch 中 case 也需要一个 tab .
        "indent": [0, "tab", {
            "SwitchCase": 1
        }],
        // keyword 前后需要空格
        "keyword-spacing": [2, {
            "before": true,
            "after": true,
            "overrides": {}
        }],
        // 该规则规定了在对象字面量语法中，key 和 value 之间的空白，冒号前不要空格，冒号后面需要一个空格
        "key-spacing": [2, {
            "beforeColon": false,
            "afterColon": true
        }],
        // 构造函数首字母大写
        "new-cap": [0, {
            "newIsCap": true,
            "capIsNew": false
        }],
        "no-tabs": 0,
        // 在使用构造函数时候，函数调用的圆括号不能够省略
        "new-parens": 2,
        // 函数参数禁止重名
        "no-dupe-args": 2,
        // 在 switch 语句中禁止重复的 case
        "no-duplicate-case": 2,
        // 禁止使用eval函数
        "no-eval": 2,
        // 禁止在不必要的时候使用bind函数
        "no-extra-bind": 2,
        // 禁止使用多余的圆括号
        "no-extra-parens": [2, "functions"],
        // 这条规则，简单来说就是在 case 语句中尽量加 break，避免不必要的fallthrough错误，如果需要fall through，那么看官网。
        "no-fallthrough": 2,
        // 简单来说不要写这样的数字.2 2.。应该写全，2.2 2.0 .
        "no-floating-decimal": 2,
        // 空行不能够超过2行
        "no-multiple-empty-lines": [2, {
            "max": 2
        }],
        // 不要重复申明一个变量
        "no-redeclare": 2,
        // 函数调用时，圆括号前面不能有空格
        "no-spaced-func": 2,
        // 在调用 super 之前不能使用 this 对象
        "no-this-before-super": 2,
        // 行末禁止加空格
        "no-trailing-spaces": 0,
        // 使用单引号
        "quotes": [2, "double", { "avoidEscape": true }],
        // 设置
        "standard/no-callback-literal": [0, ["cb", "callback"]],
        "standard/no-tabs": 0,
        "no-unneeded-ternary": 0,
        "operator-linebreak": 0,
        "no-return-await": 0,
        "no-extend-native": 0,
        "no-useless-constructor": 0,
        // 禁止抛出非异常字面量
        "no-throw-literal": 0,
        "prefer-promise-reject-errors": 0,
        "standard/prefer-promise-reject-errors": 0,
        "no-useless-return": 0,
        "no-control-regex": 0,
        "no-array-constructor": 0,
        // 驼峰命名
        "camelcase": 0,
        // 使用=== !== 代替== != .
        "eqeqeq": [0, "allow-null"],
        // 禁止返回语句中 赋值
        "no-return-assign": 0,
        // VUE 禁用
        "vue/require-component-is": 0,
        // 使用JSX时防止丢失 关闭
        "react/react-in-jsx-scope": 0,
        "react-in-jsx-scope": 0
    }
};
