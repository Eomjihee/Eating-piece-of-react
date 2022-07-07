import React,{useState} from "react";
import OddEvenResult from "./OddEvenResult";
import Container from "./Container";
const PCounter = (props) => {
    console.log('[Cmpnt.PCounter.js] ------ start');
    console.log('    [props] : ',props);
    //initVal2를 부모컴포넌트로부터 받지 못했을 경우에 대처하기 위해 defaultProps를 설정해줄 수 있다.
    const [count, setCount] = useState(props.initVal2);
    let onIncrease = () => setCount(count+1);
    let onDecrease = () => setCount(count-1);

    return (
        <div>
            <Container>
                <h1>PropsStudy</h1>
                <h2>{count}</h2>
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
                <OddEvenResult count={count}/>
            </Container>
        </div>
    );
}
PCounter.defaultProps = {
    initVal1 : 1,
    initVal2 : 0,
}
export default PCounter; 