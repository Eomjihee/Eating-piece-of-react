import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './pages/Create';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import RouteTest from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>App.js</h2>
      <RouteTest />
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
