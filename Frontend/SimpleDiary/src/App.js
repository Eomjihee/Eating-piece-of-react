import React, { useState, useRef, useEffect, useMemo } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./List/DiaryList";
import "./App.css";
import OptimizeTest from "./OptimizeTest";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((resObj) => {
      return {
        author: resObj.email,
        contents: resObj.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, contents, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      contents,
      emotion,
      create_date,
    };
    dataId.current += 1;
    setData([...data, { ...newItem }]);
  };

  const onEdit = (targetId, newContents) => {
    setData(
      data.map((diary) =>
        diary.id === targetId
          ? { ...diary, contents: newContents }
          : { ...diary }
      )
    );
  };

  const onRemove = (targetId) => {
    setData([...data.filter((diary) => diary.id !== targetId)]);
  };

  // useMemo
  const getDiaryAnalysis = useMemo(() => {

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  },[data.length]
  );

  // useMemo로 감쌀 경우 이는 더이상 함수가 아닌 값이므로 함수 호출 형태가 아니라 값으로써 사용
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* 컴포넌트 재사용 테스트용 */}
      <OptimizeTest />
      {/* 컴포넌트 재사용 테스트용 */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 날 : {goodCount}</div>
      <div>기분 안좋은 날 : {badCount}</div>
      <div>기분 좋은 날 비율 : {goodRatio}</div>
      <DiaryList onRemove={onRemove} onEdit={onEdit} listArr={data} />
    </div>
  );
}

export default App;
