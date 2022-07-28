import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from 'query-string';

const Edit = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const mode = searchParams.get('mode');
  const all = queryString.parse(window.location.search);
  console.log('    [all] : ', all);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit</h1>
      <p>Edit 페이지</p>
      <button onClick={() => setSearchParams({...all, who : 'jihee'})}>쿼리스트링 변경</button><br/>
      <button onClick={() => navigate('/home')}>페이지 이동</button><br/>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};
export default Edit;
