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
  return state
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type : 'CREATE', data: {
      id : dataId.current,
      data : new Date(date).getTime(),
      content,
      emotion
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
            <Route path='/edit' element={<Edit/>} />
            <Route path='/diary/:id' element={<Diary/>} />
          </Routes>
        </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
