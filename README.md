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
``` java 
    react-router v6版本全面倒向了函数式组件
```
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
### 三、redux 和 react-redux 相关知识
``` tsx 
总结：redux只是一种架构模式，它可以应用到任意需要使用它的框架，目的就是为了解决复杂应用中不同组件之间共享状态而产生的。本质就是：数据仓库，在隔离了数据与UI的同时，负责处理数据的绑定；
    剥离组件数据
    数据统一存放在store中
    组件订阅store获得数据
    store同步推送数据更新
``` 
真实项目中的redux架构 <br><br>
![redux真实项目架构](src/assets/WX20230703-221243@2x.png "redux图片")<br>   
Redux简化工作流<br><br>
![redux真实项目架构](src/assets/WX20230704-102707@2x.png "redux图片")<br>
``` tsx
redux就是提供了一个叫store的容器，里边的state存放了全局的状态，对外提供了三种方法： getState(), dispatch(), subscribe()

getState(): 用来返回当前state的值.

dispatch(): 用来发起一个action，来告诉一个叫reducer的纯函数怎么去更新state,同时把上一次的state作为参数也传递给reducer,reducer拿到参数后，返回更新后的state,得到新的state后就需要渲染组件，可以通过手动调用render方法，但是比较麻烦。可以采用subscribe()函数重新渲染组件.

subscribe(): 订阅state的变化，当state变化的时候执行回调，可以有多个subscribe,里边的回调会依次执行.

```
<strong>React-redux 是Redux 的官方绑定库，它能够使你的react组件从Redux store中读取数据，并且向store 分发actions 从而更新数据。</strong><br>

#### 3.1 为什么需要react-redux <br/>
``` tsx 
React组件使用redux 需要引入store,并且要手动调用store.subscribe()监听store中的state变化，使用起来比较麻烦。而 react-redux简化了这些步骤。

react-redux 是运用Provider将组件和store对接，使在Provider里的所有组件都能共享store里的数据。

在容器组件中通过react-redux 核心API：connect来连接 UI组件和redux，connect 是一个高阶函数，第一个参数接收的是两个回调函数。

```
#### 3.2 react-redux 之useSelector、useDispatch用法<br/><br/>
``` tsx
react-redux从v7.1.0开始，支持hook Api并且暴露了useSelector以及useDispatch等hook.

useSelector 替代 mapStateToProps 从store中提取state数据
useDispatch 替代 mapDispatchToProps 从store中获取dispatch 方法的引用
```

### 四、技术相关问题
1.  type 和 interface 区别<br/>
    ``` tsx 
    1.1 type后面有=, interface 没有;

        type ID = string | number;
        type Circle = {
            x: number;
            y: number;
            radius: number;
        }

        interface 用来代表一种类型组合，但是它的范围更小一些，只能描述对象结构

        interface Position {
            x: number;
            y: number;
        }
        
    1.2 多次声明的同名interface 会进行声明合并，type则不允许多次声明 
    
    1.3 interface 支持继承其他接口
        interface Shape {
            color: string;
        }
        interface Square extends Shape {
            sideLength: number;
        }
    ```
     
