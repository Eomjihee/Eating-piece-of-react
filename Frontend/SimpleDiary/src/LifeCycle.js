import React, { useState, useEffect } from "react";
const UnmountTest = () => {
  useEffect(()=> {
    console.log('[mount]');
    return () => {
      // unmount 시점에만 실행
      console.log('[unmount]');
    }
  }, [])
  return <div>Unmount Testing Component</div>
}

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => setIsVisible(!isVisible);
  return <div style={{ padding: 20 }}>
    <button onClick={toggleIsVisible}>{isVisible ? 'OFF' : 'ON'}</button>
    {isVisible && <UnmountTest/>}
  </div>;
};

export default LifeCycle;
