import React, {useReducer, useRef} from 'react'
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
      return newState;
    case 'REMOVE' :
      newState = state.filter(diary => diary.id !== action.targetId)
      return newState;
    case 'EDIT' :
      newState = state.map(diary => diary.id === action.data.id ? {...action.data} : diary)
      return newState;
    default:
      return state;
  }
  return state
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id:1,
    emotion : 4,
    content : `오늘의 일기 1번`,
    date : 1658496140905
  },
  {
    id:2,
    emotion : 2,
    content : `오늘의 일기 2번`,
    date : 1659496172494
  },
  {
    id:3,
    emotion : 6,
    content : `오늘의 일기 3번`,
    date : 1659496222787
  },
  {
    id:4,
    emotion : 1,
    content : `오늘의 일기 4번`,
    date : 1659496230676
  },
  {
    id:5,
    emotion : 5,
    content : `오늘의 일기 5번`,
    date : 1659496250687
  },
  {
    id:6,
    emotion : 2,
    content : `오늘의 일기 6번`,
    date : 1659896290687
  },
]
function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(7);
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
