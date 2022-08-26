import {useRef, useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {DiaryDispatchContext} from "./../App.js";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

import { getStrDate }from '../utils/date'
import { emotionList }from '../utils/emotion'

const DiaryEditor = ({isEdit, originData}) => {
  const [date, setDate] = useState(getStrDate(new Date()));
  const navigate = useNavigate();
  const [emotionNum, setEmotionNum]= useState(3);
  const {onCreate, onEdit} = useContext(DiaryDispatchContext)

  const handleClickEmotion = (emotion) => {
    setEmotionNum(emotion);
  }
  const handleSubmit = () => {
    if(content.length < 5){
      contentRef.current.focus();
      return;
    }

    if(window.confirm(isEdit? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?')){
      if(!isEdit){
        onCreate(date, content, emotionNum);
      }else{
        onEdit(originData.id, date, content, emotionNum);
      }
    }

    navigate('/', {replace: true})
  }

  useEffect(()=> {
    if(isEdit){
      // isEdit true일 때만 수정
      console.log('    [DiaryEditor] originData : ',originData);
      setDate(getStrDate(new Date(parseInt(originData.date))));
      setEmotionNum(originData.emotion);
      setContent(originData.content);
    }
  },[isEdit, originData])

  const contentRef = useRef()
  const [content, setContent] = useState('')


  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <div className='DiaryEditor'>
      <MyHeader 
        headText={isEdit ? '일기 수정하기' : '새 일기 작성'}
        leftBtn={<MyButton text={'< 뒤로가기'} onClick={()=> navigate(-1)}/>}
      />
      <div className='create_contents'>
        <section>
          <h4>날짜 입력</h4>
          <div className='input_box'>
            <input 
              className='input_date'
              type='date'
              value={date}
              onChange={e=> setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map(emotion=> (
              <div key={emotion.emotion_id}>
                <EmotionItem 
                  key={emotion.emotion_id}
                  {...emotion}
                  onClick={handleClickEmotion}
                  isSelected={emotion.emotion_id === emotionNum}
                />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea
              ref={contentRef}
              placeholder='오늘의 일기를 작성해 주세요.'
              value={content}
              onChange={(e)=> setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton text={'취소하기'} onClick={()=>navigate(-1)}/>
            <MyButton text={'저장하기 '} 
            type={'positive'} 
            onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
