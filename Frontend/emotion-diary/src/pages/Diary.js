import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

import { getStrDate }from '../utils/date'
import { emotionList }from '../utils/emotion'


const Diary = () => {
  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if(diaryList.length >= 1){
      const targetDiary = diaryList.find(diary => parseInt(diary.id) === parseInt(id))
      if(targetDiary) setData(targetDiary);
      else {
        navigate('/', {replace:true});
      }
    }
  }, [id, diaryList])

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, [])
  
  if(!data){
    return <div className="DiaryPage">데이터 로딩중</div>
  }else {
    const curEmotionData = [...emotionList].find(emo=> parseInt(emo.emotion_id) === parseInt(data.emotion));
    return (
      <div className="DiaryPage">
        <MyHeader 
          headText={`${getStrDate(new Date(data.date))} 기록`}
          leftBtn={
            <MyButton text={'< 뒤로가기'} onClick={()=>navigate(-1)}/>
          }
          rightBtn={
            <MyButton text={'수정하기'} onClick={()=>navigate(`/edit/${data.id}`)}/>
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={['diary_img_wrapper', `diary_img_wrapper_${data.emotion}`].join(' ')}>
              <img src={curEmotionData.emotion_img}/>
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};
export default Diary;
