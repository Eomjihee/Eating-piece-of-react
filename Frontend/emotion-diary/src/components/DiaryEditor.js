import {useRef, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {DiaryDispatchContext} from "./../App.js";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";


const DiaryEditor = () => {
  const getStrDate = date => date.toISOString().slice(0,10);
  const [date, setDate] = useState(getStrDate(new Date()));
  const navigate = useNavigate();
  const [emotionNum, setEmotionNum]= useState(3);
  const {onCreate} = useContext(DiaryDispatchContext)

  const handleClickEmotion = (emotion) => {
    setEmotionNum(emotion);
  }
  const handleSubmit = () => {
    if(content.length < 5){
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotionNum);
    navigate('/', {replace: true})
  }

  const contentRef = useRef()
  const [content, setContent] = useState('')


  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  const emotionList = [
    {
      emotion_id: 1,
      emotion_img : process.env.PUBLIC_URL+ '/assets/emotion1.png',
      emotion_descript: '완전 별로'
    },
    {
      emotion_id: 2,
      emotion_img : process.env.PUBLIC_URL+ '/assets/emotion2.png',
      emotion_descript: '별로'
    },
    {
      emotion_id: 3,
      emotion_img : process.env.PUBLIC_URL+ '/assets/emotion3.png',
      emotion_descript: '평범'
    },
    {
      emotion_id: 4,
      emotion_img : process.env.PUBLIC_URL+ '/assets/emotion4.png',
      emotion_descript: '좋음'
    },
    {
      emotion_id: 5,
      emotion_img : process.env.PUBLIC_URL+ '/assets/emotion5.png',
      emotion_descript: '많이 좋음'
    },
    {
      emotion_id: 6,
      emotion_img : process.env.PUBLIC_URL+ '/assets/emotion6.png',
      emotion_descript: '완전 좋음'
    },
  ]
  return (
    <div className='DiaryEditor'>
      <MyHeader 
        headText={'새 일기 작성'}
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
