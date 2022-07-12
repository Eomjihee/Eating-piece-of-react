import React, {useState, useEffect} from 'react'
import DiaryEditor from './DiaryEditor'
import DiaryList from './List/DiaryList'
import './App.css';

const dummyList = [
  {
    id : 0,
    author : 'hi',
    contents : 'hi~1',
    emotion : 5,
    create_date : new Date().getTime() //밀리세컨드 숫자로 변환받는 함수
  },
  {
    id : 1,
    author : 'hi2',
    contents : 'hi~2',
    emotion : 1,
    create_date : new Date().getTime()
  },
  {
    id : 2,
    author : 'hi3',
    contents : 'hi~3',
    emotion : 3,
    create_date : new Date().getTime()
  },
]

function App() {
  return (
    <div className="App">
      <DiaryEditor/>
      <DiaryList listArr={dummyList}/>
    </div>
  );
}

export default App;
