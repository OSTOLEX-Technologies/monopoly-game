import styled from "styled-components";

export const SmallButton = styled.button`
  background-image: url("${import.meta.env.BASE_URL + "vault/button small.png"}");
  color: #fff;
  background-size: contain;
  font-family: Orbitron;
  font-size: 16px;
  height: 43px;
  width: 151px;
  border: 0;
  outline: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  padding-top: 2px;

  &:focus {
    outline: none;
    border: 0;
  }
`