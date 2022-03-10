import { Container } from "@styles/common/Button";
import React from "react";
import { IProps } from "./interface/ButtonInterface";

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Button;
