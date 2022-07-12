import React, {useState, useRef, useEffect} from 'react'
import DiaryEditor from './DiaryEditor'
import DiaryList from './List/DiaryList'
import './App.css';

function App() {

  const [data, setState] = useState([]);
  const dataId = useRef(0)
  const onCreate = (author, contents, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      contents,
      emotion,
      create_date
    }
    dataId.current += 1;
    setState([...data, {...newItem}]);
  }

  const onDelete = (targetId) => {
    setState([...data.filter((diary)=> diary.id !== targetId)])
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onDelete={onDelete} listArr={data}/>
    </div>
  );
}

export default App;
