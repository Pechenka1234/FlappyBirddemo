import React from 'react';
import styles from './Pipe.module.css'; 

const Pipe = ({ x, height, type }) => {
  console.log("Rendering Pipe, type:", type, "x:", x, "height:", height);
  return (
    <div
      className={`${styles.pipe} ${styles[type]}`} 
      style={{
        left: `${x}px`,
        height: type === 'top' ? `${height[1]}px` : `${height[0]}px`,
      }}
    />
  );
};

export default Pipe;