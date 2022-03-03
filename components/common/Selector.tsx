import { Container } from "@styles/common/Selector";
import React from "react";
import { IProps } from "./interface/SelectorInterface";

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
      <select {...props}>
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Selector;
