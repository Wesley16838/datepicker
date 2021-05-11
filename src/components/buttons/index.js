import React from "react";

const Button = (props) => {
  const { content, onClick, classname } = props;
  const handleOnClick = () => {
    if (onClick) onClick();
  };
  return (
    <button onClick={() => handleOnClick()} className={classname}>
      {content}
    </button>
  );
};

export default Button;
