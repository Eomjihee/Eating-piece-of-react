import React, { useEffect, useState } from "react";

const CounterA = React.memo(({cnt}) => {
  useEffect(() => {
    console.log('[M.ConterA] ------ update');
  })
  return <div>{cnt}</div>
});
/*
const CounterB =  React.memo(({obj}) => {
  useEffect(() => {
     
    //  주소에 의한 비교 (=얕은 비교) 이므로 값을 비교하는게 아닌 
    //  주소가 같은지를 비교하기 때문에 다르다고 판단하여 재렌더링
    
    console.log('[M.ConterB] ------ update');
  })
  return <div>{obj.cnt}</div>
});
*/
const CounterB = ({obj}) => {
  useEffect(() => {
    console.log('[M.ConterB] ------ update');
  })
  return <div>{obj.cnt}</div>
};
// 깊은 비교를 위한 areEqual 함수 생성
const areEqual = (prevProps, nextProps) => {
  // return true  : 두 프롭스가 동일하므로 리렌더링 발생 X 
  // return false : 두 프롭스가 상이하므로 리렌더링 발생 O 
  return prevProps.obj.cnt === nextProps.obj.cnt
}
// 두번째 인자의 함수가 .compare 함수처럼 비교 함수로써 동작
const MemoizedCounterB = React.memo(CounterB, areEqual);
const OptimizeTest = () => {
  const [cnt, setCnt] = useState(1);
  const [obj, setObj] = useState({
    cnt : 1
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Count A</h2>
        <CounterA cnt={cnt} />
        <button onClick={() => setCnt(cnt)}>A button</button>
      </div>
      <div>
        <h2>Count B</h2>
        {/* <CounterB obj={obj}/>/ */}
        {/* MemoizedCounterB : 깊은 비교를 통해 리렌더링 통제 */}
        <MemoizedCounterB obj={obj}/>
        <button onClick={() => setObj({cnt : obj.cnt})}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
