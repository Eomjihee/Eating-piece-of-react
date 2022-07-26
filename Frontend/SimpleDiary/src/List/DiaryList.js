import { useContext } from "react";
import { DiaryStateContext } from "../App";
import DiaryItem from "./DiaryItem";

const DiaryList = ({onRemove, onEdit }) => {
  // Context의 data에 접근하기 위해 useContext import, DiaryStateContext import
  const listArr = useContext(DiaryStateContext)
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
