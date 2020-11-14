import './App.css';
import {Switch, Route} from 'react-router-dom'
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, {Suspense, lazy} from "react";

const Home = lazy(() => import("./pages/Home"))
const History = lazy(() => import("./pages/History"))
const About = lazy(() => import("./pages/About"))

function App() {
    return (
        <>
            <Header/>
            <main>
                <Suspense fallback={<Loading/>}>   {/* 异步加载 */}
                    <Switch>
                        {/*等价于  <Route path='/' exact><Home/></Route> */}
                        <Route path='/' exact component={Home}/>
                        <Route path='/about' exact component={About}/>
                        <Route path='/history' exact component={History}/>
                    </Switch>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}

export default App;
