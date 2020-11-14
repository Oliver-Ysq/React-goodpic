# goodPic - 简洁的图床工具
### 项目总结
1. 懒加载  
按需加载组件，防止一次性加载全部组件带来的卡顿。
```
import {Suspense, lazy} from "react";
...
const Home = lazy(()=>import("./pages/component/Home"))
const About = lazy(()=>import("./pages/component/About"))

jsx:
<Suspense fallback={<Loading />}>   {/* 异步加载 */}
    <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/about' exact component={About}/>
        <Route path='/history' exact component={History}/>
    </Switch>
</Suspense>
```

2. styled-components
    - 基本使用
    ```
    import styled from "styled-components"
    const MyHeader = styled.header` //生成一个带有如下样式的<header></header>标签
        color: red;
    `
    
    export default function component(){
        return(
            <MyHeader>welcome</MyHeader>
        )
    }
    ```
    - 为已存在的组件增加css样式：
    ```
    const Button = styled.button`
        font-size: 24px;
    `
    
    const BigButton = style(Button)`
        font-size: 48px;
    `
    ```
   - 获取props
   ```
    const Button = styled.button`
        background: ${props => props.primary ? 'palevioletred' : 'white'};
        color: ${props => props.primary ? 'white' : 'palevioletred'};
        font-size: 1em;
    `
    render(
        <div>
            <Button>Normal</Button>
            <Button primary>Primary</Button>
        </div>
    );
    ```