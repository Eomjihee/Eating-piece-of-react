import './App.css';
import MyHeader from './common/Header'
import MyFooter from './common/Footer'
import Counter from './StateStudy/Counter'
import PCounter from './PropsStudy/PCounter'
import React from 'react'

function App() {
  const pCounterProps = {
    a:1,
    b:2,
    c:3,
    // initVal2:6
  };
  return (
    <>
      <div className="App">
        <MyHeader />
        <Counter/>

        {/* 부모컴포넌트에서 자식컴포넌트로 
          데이터값을 내려주는 것을 props라 한다. 
          줄줄이 길어지는게 불편하므로 객체로 전달하는 것이 좋다. 
          (=const pCounterProps)
        */}
        <PCounter
          initVal={5}
          {...pCounterProps}
        />
        <MyFooter />
      </div>
    </>
  );
}

export default App;
