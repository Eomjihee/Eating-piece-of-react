import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
const emotionFilterOpt = [
  { value: "all", name: "전체" },
  { value: "good", name: "긍정적 감정" },
  { value: "bad", name: "부정적 감정" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [emotionFilter, setEmotionFilter] = useState("all");
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (emotionFilter === "good") return parseInt(item.emotion) >= 3;
      else return parseInt(item.emotion) < 3;
    };
    const compare = (a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      else return parseInt(a.date) - parseInt(b.date);
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterdList =
      emotionFilter === "all"
        ? copyList
        : copyList.filter((it) => filterCallBack(it));
    const sortedList = filterdList.sort(compare);
    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptList}
          />
          <ControlMenu
            value={emotionFilter}
            onChange={setEmotionFilter}
            optionList={emotionFilterOpt}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 작성"}
            onClick={() => navigate("/create")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((diary) => {
        // return <div key={diary.id}>{diary.content}</div>;
        return <DiaryItem key={diary.id} {...diary} />
      })}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
