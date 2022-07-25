import React, {useState, useRef, useEffect} from 'react'
const DiaryItem = ({ 
  onRemove, onEdit, // App 컴포넌트로부터 받은 함수 
  id, author, create_date, emotion, // 변경X 데이터
  contents,  // 변경 가능한 데이터
}) => {

  useEffect(()=>{
    // rerender 확인
    console.log(`[Comp.DiaryItem] ${id}번째 아이템 렌더`);
    // React.memo만 한다고 바로 최적화 되지 않는 이유 : data state가 변화하면 리렌더할 수 밖에 없음 
    // onCreate 최적화와 동일하게 onRemove, onEdit 최적화 필요
  });
  // --- 수정하기 기능
  // 현재 수정 중인지 수정 중이 아닌지 불리언 값으로 저장
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContents, setLocalContents] = useState(contents);
  const localContentsInput = useRef();

  // --- 버튼 클릭시 동작할 메서드
  const handleRemove = () => {
    if(window.confirm(`${id}번째 일기 삭제할까요?`)){
      onRemove(id);
    }
  }
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContents(contents);
  }
  const handleEdit = () => {
    // 5글자 이상 되는지 검사
    if(localContents.length < 5){
      localContentsInput.current.focus();
      return;
    }
    if(window.confirm(`${id}번 일기를 수정?`)){
      onEdit(id,localContents);
      toggleIsEdit();
    }
  }
  return (
    <div className="DiaryItem" key={id}>
      <div className="info">
        <div>
          {author}님의 일기 | <span>오늘의 기분은 {emotion}점</span>
        </div>
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div className='contentsDiv'>
        {isEdit ? <>
          <textarea ref={localContentsInput} value={localContents} onChange={e => setLocalContents(e.target.value)}/>
        </> : contents}
      </div>
      {isEdit? <>
        <button onClick={handleQuitEdit}>취소</button>
        <button onClick={handleEdit}>수정 완료</button>
      </>:<>
        <button onClick={handleRemove}>삭제</button>
        <button onClick={handleEdit}>수정</button>
      </>}
    </div>
  );
};

export default React.memo(DiaryItem);
