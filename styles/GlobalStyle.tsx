import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "@styles/palette";

const globalstyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Nato Sans, Nato Sans KR;
    color: ${palette};
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalstyle}
`;

export default GlobalStyle;
