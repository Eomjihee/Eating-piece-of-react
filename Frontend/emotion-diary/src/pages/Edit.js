import {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(()=> {
    if(diaryList.length >=1){
      const targetDiary = diaryList.find(diary => parseInt(diary.id) === parseInt(id));
      if (targetDiary){
        setOriginData(targetDiary);
      }else navigate('/', {replace: true});
    } 
  },[id, diaryList]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, [])

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};
export default Edit;
