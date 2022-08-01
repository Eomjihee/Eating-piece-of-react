import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './pages/Create';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';

// components
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <MyHeader 
        headText={'App'}
        leftBtn={<MyButton text={'LEFT'} onClick={()=> alert('LEFT CLICK!!')}/>}
        rightBtn={<MyButton text={'RIGHT'} onClick={()=> alert('RIGHT CLICK!!')}/>}
      />
      <h2>App.js</h2>
      <MyButton 
        text={'버튼'}
        type={'default'}
        onClick={()=>alert('버튼 클릭')}
      />
      <MyButton 
        type={'positive'}
        onClick={()=>alert('버튼 클릭')}
      />
      <MyButton 
        type={'negative'}
        onClick={()=>alert('버튼 클릭')}
      />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/edit' element={<Edit/>} />
        <Route path='/diary/:id' element={<Diary/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
