const DiaryItem = ({ onDelete, id, author, contents, create_date, emotion }) => {
  return (
    <div className="DiaryItem" key={id}>
      <div className="info">
        <div>
          {author}님의 일기 | <span>오늘의 기분은 {emotion}점</span>
        </div>
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div>{contents}</div>
      <button onClick={()=>{
        if(window.confirm(`${id}번째 일기 삭제할까요?`)){
          onDelete(id);
        }
      }}>삭제</button>
    </div>
  );
};

export default DiaryItem;
