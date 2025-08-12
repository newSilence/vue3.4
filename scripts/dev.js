import minimist from 'minimist'//用于解析命令行参数
import { resolve, dirname } from 'path'//用于解析路径
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import esbuild from 'esbuild'

const args = minimist(process.argv.slice(2))
const __filename = fileURLToPath(import.meta.url)//获取当前文件的绝对路径
const __dirname = resolve(dirname(__filename))//获取当前文件的父目录路径
const require = createRequire(import.meta.url);//获取require方法
const target = args._[0] || 'reactivity'//打包哪个项目
const format = args.f || 'iife'//打包后的模块化规范
//node中esm模块没有__dirname,__filename,__webpack_require__等全局变量，需要使用path模块来获取当前文件的路径
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)//获取入口文件路径
const pkg = require(`../packages/${target}/package.json`)//获取package.json文件
esbuild.context({
  entryPoints: [entry], //入口文件
  bundle: true, //是否打包成一个文件
  platform: 'browser', //打包目标平台
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), //输出文件路径
  sourcemap: true, //是否生成sourcemap。可以调试源代码
  format, //模块化规范cjs esm iife，iife必须给一个名字
  globalName: pkg.buildOptions?.name, //iife模块的全局变量名
}).then((ctx) => {
  console.log('watching for changes...')
  return ctx.watch()//监听文件变化
})