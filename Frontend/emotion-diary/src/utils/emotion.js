const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || ''
export const emotionList = [
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