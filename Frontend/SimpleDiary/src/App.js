import React, { useReducer, useRef, useEffect, useMemo, useCallback } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./List/DiaryList";
import "./App.css";

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      }
      return [newItem, ...prevState];
    }
    case 'REMOVE':
      return prevState.filter((diary) => diary.id !== action.targetId);
    case 'EDIT':
      return prevState.map(diary => diary.id === action.targetId ? {...diary, contents : action.newContents } : diary )
    default:
      return prevState;
  }
};

// export default는 파일당 한 번만 가능, 나머지 export는 비구조화 할당으로만 import 가능
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer,[])

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
    dispatch({type:'INIT', data:initData});
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, contents, emotion) => {
    dispatch({type:'CREATE', 
      data: {
        id: dataId.current,
        author,
        contents,
        emotion
      }
    });
    dataId.current += 1;
  },
  []);

  const onEdit = useCallback((targetId, newContents) => {
    dispatch({type: 'EDIT', targetId, newContents});
  },
  []
  );

  const onRemove = useCallback((targetId) => {
    dispatch({type: 'REMOVE', targetId })
  },
  []
  );

  // onCreate, onRemove, onEdit 하나로 묶음
  const memoizedDispatches = useMemo(()=> {
    return {onCreate, onRemove, onEdit}
  });

  // useMemo
  const getDiaryAnalysis = useMemo(() => {

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  },[data.length]
  );

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor onCreate={onCreate} />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 날 : {goodCount}</div>
          <div>기분 안좋은 날 : {badCount}</div>
          <div>기분 좋은 날 비율 : {goodRatio}</div>
          {/* Context 사용으로 listArr 넘겨줄 필요 없어짐. */}
          <DiaryList onRemove={onRemove} onEdit={onEdit}/>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
