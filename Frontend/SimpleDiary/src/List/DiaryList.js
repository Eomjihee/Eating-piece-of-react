import DiaryItem from "./DiaryItem";

const DiaryList = ({onRemove, onEdit ,listArr }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{listArr.length}개의 일기</h4>
      {listArr.map(diary=> (
        <DiaryItem key={diary.id} {...diary} onRemove={onRemove} onEdit={onEdit}/>
      ))
      }
    </div>
  );
};

DiaryList.defaultProps = {
  listArr: [],
};

export default DiaryList;
