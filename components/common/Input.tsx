import React from "react";
import { Container } from "@styles/common/Input";
import { IProps } from "./interface/InputInterface";

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default React.memo(Input);
