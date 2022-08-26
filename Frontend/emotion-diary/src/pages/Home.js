import {useState, useContext, useEffect} from 'react'
import {DiaryStateContext} from '../App'
import MyHeader from './../components/MyHeader'
import MyButton from './../components/MyButton'
import DiaryList from '../components/DiaryList';

const Home = () => {

  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`
  
  useEffect(()=>{
    const firstDay= new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
    // 마지막날의 경우 시분초까지 입력해주어야 오류없이 출력됨
    const lastDay= new Date(curDate.getFullYear(), curDate.getMonth()+1, 0, 23, 59, 59).getTime();
    
    // console.log('    [firstDay, lastDay] : ',new Date(firstDay), new Date(lastDay));
    // console.log('    [diaryList] : ',diaryList, firstDay, lastDay, diaryList.filter((diaryItem)=> firstDay <= diaryItem.date && diaryItem.date <= lastDay));
    // 각 달에 맞는 데이터만 출력
    setData(diaryList.filter((diaryItem)=> firstDay <= diaryItem.date && diaryItem.date <= lastDay))
  
  },[diaryList, curDate]);
  useEffect(()=>{
    console.log('[Home.js] useEffect - data : ',data);
  },[data]);
  
  const increaseMonth = () =>{
    setCurDate(new Date(curDate.getFullYear(),curDate.getMonth()+1, curDate.getDate()))
  }
  const decreaseMonth = () =>{
    setCurDate(new Date(curDate.getFullYear(),curDate.getMonth()-1, curDate.getDate()))
  }
  
  return (
    <div>
      <MyHeader 
        headText={headText}
        leftBtn={<MyButton text={'<'} onClick={decreaseMonth}/>}
        rightBtn={<MyButton text={'>'} onClick={increaseMonth}/>}
      />
      <DiaryList
        diaryList={data}
      />
    </div>
  );
};
export default Home;
