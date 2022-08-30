import React, {useEffect, useReducer, useRef} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './pages/Create';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT' :
      return action.data;
    case 'CREATE' :
      newState = [{...action.data}, ...state];
      break;
    case 'REMOVE' :
      newState = state.filter(diary => diary.id !== action.targetId)
      break;
    case 'EDIT' :
      newState = state.map(diary => diary.id === action.data.id ? {...action.data} : diary)
      break;
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  // App mount 감지
  useEffect(()=> {
    // localStorage.setItem('key', 10); 
    //코드를 지워도 따로 storage를 비우지 않는 한 값이 유지됨
    // localStorage.setItem('item1', 10);
    // localStorage.setItem('item2', '20');
    // localStorage.setItem('item3', {value: 30}); 
    // Storage에서 Object 저장 불가.. 
    // localStorage.setItem('item3', JSON.stringify({value: 30})); 
  
    // const item1 = localStorage.getItem('item1');
    // Number로 넣었지만 문자열로 삽입되므로 문자열이 출력됨. 
    // const item2 = localStorage.getItem('item2');
    // const item3 = localStorage.getItem('item3');
    // JSON도 마찬가지므로 사용시 parseInt, JSON.stringify등을 사용해야함

    // console.log('    [item1, item2, item3] : ',{item1, item2, item3});
    
    // ------------------------
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=> parseInt(b.id)- parseInt(a.id));
      if(diaryList.length >= 1){
        dataId.current = parseInt(diaryList[0].id++);
        dispatch({type:'INIT', data:diaryList})
      }
    }
  },[])

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type : 'CREATE', data: {
      id : dataId.current,
      emotion,
      content,
      date : new Date(date).getTime()
    }});
    dataId.current += 1;
  }
  // REMOVE
  const onRemove = targetId => {
    dispatch({type: 'REMOVE', targetId});
  }
  // EDIT
  const onEdit = (targetId,date, content, emotion) => {
    dispatch({
      type: 'EDIT', 
      data : {
        id: targetId,
        date : new Date(date).getTime(),
        content,
        emotion
      }
    });
    console.log('    [onEdit] data : ',data, targetId,date, content, emotion);
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove
        }}
      >
        <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/create' element={<Create/>} />
            <Route path='/edit/:id' element={<Edit/>} />
            <Route path='/diary/:id' element={<Diary/>} />
          </Routes>
        </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
