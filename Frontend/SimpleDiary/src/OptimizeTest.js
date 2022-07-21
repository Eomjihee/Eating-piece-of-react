import React, { useEffect, useState } from "react";
const TxtView = React.memo(({txt}) => {
  // React.memo를 사용해서 렌더링이 일어날 때 props 변화 관찰
  useEffect(()=> {
    console.log('[TxtView Update] txt :',txt);
  })
  return <div>{txt}</div>
});
const CntView = ({cnt}) => {
  // React.memo를 사용하지 않고 렌더링이 일어날 때 props 변화 관찰
  useEffect(()=> {
    console.log('[CntView Update] cnt :',cnt);
  })
  return <div>{cnt}</div>
}

const OptimizeTest = () => {
  const [cnt, setCnt] = useState(1);
  const [txt, setTxt] = useState("");
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Count</h2>
        <CntView cnt={cnt} />
        <button onClick={() => setCnt(cnt + 1)}>+</button>
      </div>
      <div>
        <h2>Text</h2>
        <TxtView txt={txt} />
        <input value={txt} onChange={(e) => setTxt(e.target.value)}/>
      </div>
    </div>
  );
};

export default OptimizeTest;
