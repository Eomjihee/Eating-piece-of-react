import React,{ useContext, useEffect, useState, useRef } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  const {onCreate} = useContext(DiaryDispatchContext);

  useEffect(()=> {
    console.log('[Comp.DiaryEditor] ------ start');
  });
  const [state, setState] = useState({
    author : '',
    contents : '',
    emotion : 3
  });
  const changeState = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    });
  };

  // -----useRef
  const refAuthor = useRef();
  const refContents = useRef();

  const handleSubmit = (e) =>{
    if(state.author.length  < 1){
      refAuthor.current.focus();
      return;
    }
    if(state.contents.length < 5){
      refContents.current.focus();
      return;
    }
    //----- 저장 기능
    onCreate(state.author,state.contents, state.emotion);
    alert('저장 완료');
    resetState();
  }; 
  const resetState = () => {
    setState({
      author: '',
      contents : '',
      emotion: 3
    });
  }
  
  return (
    <div className="DiaryEditor">
      {/* 작성자, 일기 본문, 감정 점수 */}
      <h2>오늘의 일기</h2>
      <div>
        {/* DiaryEditor가 input의 값을 핸들링할 수 있도록 처리하기 위해 useState 사용*/}
        <input 
          name="author"
          // value={author} 
          // onChange={changeAuthor} 
          value={state.author} 
          onChange={changeState} 
          ref={refAuthor}
        />
      </div>
      <div>
        <textarea
          name="contents"
          // value={contents}
          // onChange={changeContents}
          value={state.contents} 
          onChange={changeState} 
          ref={refContents}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={changeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);
