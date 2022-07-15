import React, { useState, useEffect } from "react";

const LifeCycle = () => {
  const [cnt, setCnt] = useState(0);
  const [text, setText] = useState('');
  useEffect(()=> {
    console.log('[mount]');
  },[])
  /*
  useEffect(()=> {
    console.log('[update]');
  })
  */
 // 의존 배열을 잘 활용하면 감지하고 싶은 데이터만 골라 변경 감지하여 업데이트 처리 가능
  useEffect(()=> {
    // 배열의 값이 바뀌는 순간 콜백함수 호출
    console.log(`[cnt update] : ${cnt}`);
    if(cnt > 5){
      alert('값이 5를 초과하여 초기화');
      setCnt(0)
    }
  },[cnt])
  useEffect(()=> {
    console.log(`[text update] : ${text}`);
  },[text])

  return <div style={{ padding: 20 }}>
    <div>
      {cnt}
      <button onClick={() => setCnt(cnt+1)}>+</button>
    </div>
    <div>
      <input value={text} onChange={e => setText(e.target.value)}/>
    </div>
  </div>;
};

export default LifeCycle;
