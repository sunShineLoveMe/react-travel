## 课程说明知识点

### 一、安装部分
1. 在初始化项目中
    ``` javascript
    npx create-react-app react-travel --template typescript
    ```
   生成的项目稳文件中会有.d.ts,这个文件是指 只包含类型信息的类型声明文件不会生成js文件，仅用于提供类型信息。

2. 在react项目中为了使用css模块化cssModule，采用插件typescript-plugin-css-modules. 
   步骤如下：
    ``` javascript
    npm install -D typescript-plugin-css-modules
    ```
    其次在tsconfig.json中配置
    ``` javascript
    
    "compilerOptions": {
        "plugins": [{"name": "typescript-plugin-css-modules"}]
        }
    
    ```
    最后在settings.json中配置
    在项目根目录下创建.vscode文件夹，在文件夹中新建settings.json并写入如下配置:
    ``` json
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true
    ```
    常见文件配置：
    css文件一般 x.module.css这种命名方式，比如App.css 改为app.module.css<br/>
    文件引入之后，采用如下引用方式

    ``` tsx
    import React from 'react';
    import logo from './logo.svg';
    import styles from './App.module.css'

    function App() {
    return (
        <div className={styles.App}>
        
        </div>
        );
    }

    ```
### 二、路由部分
1. react-router： 最主流最完整的React路由解决方案
   ``` tsx
    react-router-dom: 用于浏览器，处理web app路由
    react-router-native: 用于手机react-native 处理手机app路由
    react-router-redux： 提供了路由中间件，处理redux的集成
    react-router-config: 用来静态配置路由
   ```
2. ``` tsx 
    会自动安装react-router 核心框架
    <Link /> 组件可以渲染出<a /> 标签
    <BrowserRouter /> 可以利用H5 API 实现路由切换
    <HashRouter /> 组件利用原生js中的window.location.hash来实现路由切换
    ```