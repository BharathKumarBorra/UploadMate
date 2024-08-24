import styled, { keyframes } from "styled-components";
import { BiAccessibility } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const slideIn = keyframes`
  from {
    transform: translateX(min(270px,60vw));
    
  }
  to {
    transform: translateX(0);
    
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
 
  }
  to {
    transform: translateX(min(270px,60vw));
   
  }
`;

export const AccessibilityCardContainer = styled.div`
  position: fixed;
  right: 0px;
  bottom: 40px;
  z-index: 4;
  display: flex;
  align-items: flex-end;
  @media screen and (min-width: 1920px) {
    right: calc(50vw - 960px);
  }

  animation: ${(props) => (props.show ? slideIn : slideOut)} 0.5s forwards;
`;

export const AccessibilityImg = styled(BiAccessibility)`
  background-color: #E54D2E;
  width: 45px;
  height: 45px;
  padding: 4px;
  transition: scale 0.3s ease;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

export const CloseIcon = styled(IoMdClose)`
  background-color: #e54d2e;
  width: 45px;
  height: 45px;
  padding: 4px;
  transition: scale 0.3s ease;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;

export const AccessibilityCard = styled.ul`
  width: min(270px, 60vw);
  background-color: white;
  box-shadow: rgb(224, 231, 238) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.12) 2px 6px 10px 0px;

  border-radius: 4px;
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  font-weight: 500;

  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.show ? "1" : "0")};

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 17;
    }}px;
  }
`;

export const AccessibilityCardElement = styled.li`
  list-style-type: none;
  height: 60px;
  color: rgb(97, 110, 124);

  border-bottom: 1px solid rgba(123, 135, 148, 0.16);
  display: flex;
  align-items: center;
  padding: 0px 26px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;
