import React,{ useEffect, useState, useRef } from "react";

const DiaryEditor = ({onCreate}) => {
  useEffect(()=> {
    // 언제 렌더 되는지 확인
    console.log('[Comp.DiaryEditor] ------ start');
    /* 왜 두번 렌더되는가? 
      App 컴포넌트에서 data가 처음 빈배열로 초기화되었다가 
      변경되면서 두번 렌더링.
      onCreate가 재생성되지 않아야만 최적화 가능.
    */

  });
  // 굳이 두개로 구분하지 않고 하나로 통일하여 사용
  // const [author, setAuthor] = useState('');
  // const [contents, setContents] = useState('');
  // let changeAuthor = (e) => {
  //   console.log(e);
  //   setAuthor(e.target.value);
  // };
  // let changeContents= (e) => {
  //   setContents(e.target.value);
  // };

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
