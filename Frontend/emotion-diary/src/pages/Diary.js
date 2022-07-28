import { useParams } from "react-router-dom";

const Diary = () => {
  const {id} = useParams();

  return (
    <div>
      <h1>Diary</h1>
      <p>Diary 페이지</p>
    </div>
  );
};
export default Diary;
