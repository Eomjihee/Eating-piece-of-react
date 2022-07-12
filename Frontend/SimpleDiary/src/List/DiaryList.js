import DiaryItem from "./DiaryItem";

const DiaryList = ({ listArr }) => {
  console.log(listArr);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{listArr.length}개의 일기</h4>
      {listArr.map(diary=> (
        <DiaryItem key={diary.id} {...diary}/>
      ))
      }
    </div>
  );
};

DiaryList.defaultProps = {
  listArr: [],
};

export default DiaryList;
