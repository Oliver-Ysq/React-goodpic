import React from "react";
import styled from "styled-components";

const Url = styled.a`
  border-bottom: 1px solid #888888;
`;

function About() {
  return (
    <>
      <h1>Github</h1>
      <Url
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Oliver-Ysq/React-goodpic"
      >
        https://github.com/Oliver-Ysq/React-goodpic
      </Url>
    </>
  );
}

export default About;
