import DiaryEditor from '../components/DiaryEditor'
import {useEffect} from 'react'
const Create = () => {

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  }, [])
  return (
    <div>
      <DiaryEditor
      />
    </div>
  );
};
export default Create;
