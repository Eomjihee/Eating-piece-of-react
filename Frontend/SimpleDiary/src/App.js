import React, {useState, useRef, useEffect} from 'react'
import DiaryEditor from './DiaryEditor'
import DiaryList from './List/DiaryList'
import './App.css';
import LifeCycle from './LifeCycle';

function App() {

  const [data, setData] = useState([]);
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
    setData([...data, {...newItem}]);
  }

  const onEdit = (targetId, newContents) => {
    setData(
      data.map(diary => diary.id === targetId ? {...diary, contents: newContents} : {...diary})
    )
  }

  const onRemove = (targetId) => {
    setData([...data.filter((diary)=> diary.id !== targetId)])
  }

  return (
    <div className="App">
      <LifeCycle/>
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onRemove={onRemove} onEdit={onEdit} listArr={data}/>
    </div>
  );
}

export default App;
