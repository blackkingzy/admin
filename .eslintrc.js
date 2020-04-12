module.exports = {
    // npm run serve 是不执行lint的，如果执行它应该修复文档，可以在保存时自动执行
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    plugins: ['vue', 'prettier'], // 这里是调用eslint-plugin-vue插件
    rules: {
        'no-unused-vars': 'off', //未被引用就提示，这里关掉了
        indent: ['error', 4] // 这里统一和prettier一样
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
