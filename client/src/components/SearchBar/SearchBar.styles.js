import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  background: var(--darkGrey);
  padding: 0 60px;
`;

export const Content = styled.div`
  position: relative;
  max-width: var(--maxWidth);
  width: 100%;
  height: 55px;
  background: transparent;
  margin: 0 auto;
  padding: 20px, 20px, 20px, 20px;
  box-shadow: 1px 1px 1px 1px slate;

  & img {
    position: absolute;
    left: 15px;
    top: 14px;
    width: 30px;
  }

  & input {
    font-size: 18px;
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 60%;
    background: transparent;
    height: 40px;
    color: var(--white);
    border-radius: 20px;
    color: var(--white);
    border: 2px solid white;

    :focus {
      outline: none;
    }
  }

  & select {
    font-size: 18px;
    position: absolute;
    right: 0;
    margin: 9px 0;
    padding: 0 0 0 5px;
    width: 20%;
    background: transparent;
    height: 40px;
    color: var(--white);
    border-radius: 20px;
    color: var(--white);
    border: 2px solid white;
  }
`;
