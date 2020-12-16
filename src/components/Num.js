import React, { useState } from "react";

const Button = ({ disabled, onClick, button_text }) => {
  return <>{!disabled && <button onClick={onClick}>{button_text}</button>}</>;
};

export default Button;
