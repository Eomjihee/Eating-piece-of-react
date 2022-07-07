import React,{useState} from "react";

const Counter = () => {
    //0에서 출발해 1씩 증가 및 감소하는 count 상태
    const [count, setCount] = useState(0);
    let onIncrease = () => setCount(count+1);
    let onDecrease = () => setCount(count-1);
    let onReset = () => setCount(0);
    // 클릭될 때마다 Counter 함수를 재호출하여 리렌더된다
    return (
        <div>
            <h1>StateStudy</h1>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <button onClick={onReset}>초기화</button>
        </div>
    );
}
export default Counter; 