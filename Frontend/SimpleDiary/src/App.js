import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./List/DiaryList";
import "./App.css";

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

  const onCreate = useCallback((author, contents, emotion) => {
    // 최적화를 위한 작업 중 memo 기능은 값으로 반환하므로 사용하지 말 것
    // Hooks 중 useCallback 함수 사용 : 메모이제이션 된 콜백을 반환
    const create_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      contents,
      emotion,
      create_date,
    };
    dataId.current += 1;
    // 이 때 data는 초기 선언된 빈 배열의 state값을 들고있어 빈 배열로 전달됨
    // setData([...data, { ...newItem }]);
    // 최신의 state를 반영하기 위해 함수형 업데이트(함수를 전달)를 해주어야함
    setData((data)=>[{...newItem}, ...data]); 
    // 원리는.. 함수 인자를 통해 data를 받는 시점에 참조하므로..?
  },
  []);

  const onEdit = useCallback((targetId, newContents) => {
    setData(
      (data) => data.map((diary) =>
        diary.id === targetId
          ? { ...diary, contents: newContents }
          : { ...diary }
      )
    );
  },
  []
  );

  const onRemove = useCallback((targetId) => {
    setData(data=>[...data.filter((diary) => diary.id !== targetId)]);
  },
  []
  );

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
