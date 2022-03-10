import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const index: React.FC = () => {
  return <Container>Hello World</Container>;
};

// export const getServerSideProps = async () => {
//   // get the current environment
//   const { DEV_URL } = process.env;

//   // request posts from api
//   const response = await fetch(`${DEV_URL}/api/posts`);

//   // extract the data
//   const data = await response.json();

//   return {
//     props: {
//       user: data.message,
//     },
//   };
// };

export default index;
