module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/vue_shop/':'/',
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
            //配置 externals 加载外部 CDN 资源
            config.set('externals', {
                vue:'Vue',
                'vue-router':'VueRouter',
                axios:'axios',
                lodash:'_',
                echarts:'echarts',
                nprogress:'NProgress',
                'vue-quill-editor':'VueQuillEditor'
            })
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
            
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
    }
}