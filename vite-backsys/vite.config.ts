import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import eslintPlugin from 'vite-plugin-eslint' //导入包
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve('./src'),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            additionalData: '@import "./src/assets/scss/global.scss"', // 添加公共样式
        },
    },
    plugins: [
        vue(),
        // 增加下面的配置项,这样在运行时就能检查eslint规范
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ElementPlus(),
    ],
})
