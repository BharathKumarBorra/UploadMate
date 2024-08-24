import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HomeContainer = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 20px 5vw;

  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 76px);
  }
`;

export const UpperDescription = styled.p`
  font-size: ${(props) => {
    return props.ratio * 8;
  }}px;
  background-color: #f1f1f1;
  font-weight: 700;
  border-radius: 14px;
  padding: 4px 12px;

  animation: ${fadeInUp} 0.6s ease both;

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 12;
    }}px;
  }
`;

export const MainDescription = styled.h1`
  max-width: 1100px;
  font-weight: 900;
  font-size: ${(props) => {
    return props.ratio * 7.5;
  }}vw;

  line-height: 1.2;
  margin-bottom: 10px;

  animation: ${fadeInUp} 0.6s ease both 0.1s;

  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 60;
    }}px;
  }
`;

export const LowerDescription = styled.p`
  color: gray;
  max-width: 1100px;
  font-weight: 500;
  font-size: ${(props) => {
    return props.ratio * 3;
  }}vw;
  line-height: 1.4;
  padding-bottom: 12px;
  animation: ${fadeInUp} 0.6s ease both 0.2s;

  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 18;
    }}px;
    padding-bottom: 14px;
  }

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 20;
    }}px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 24;
    }}px;
    padding-bottom: 30px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledArrow = styled(GoArrowRight)`
  font-size: 1.2em;
  transition: transform 0.3s ease;
`;

export const GetStartedButton = styled.button`
  width: 120px;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: ${(props) => {
    return props.ratio * 12;
  }}px;
  padding: 10px 14px;
  border: solid 2px black;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: scale 0.3s ease;

  animation: ${fadeInUp} 0.6s ease both 0.3s;
  @media screen and (min-width: 768px) {
    width: 140px;
    font-size: ${(props) => {
      return props.ratio * 14;
    }}px;
    padding: 12px 16px;
  }
  @media screen and (min-width: 992px) {
    width: 160px;
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
    gap: 10px;
  }
  @media screen and (min-width: 1200px) {
    width: 190px;
    padding: 14px 22px;
    font-size: 20px;
    justify-content: flex-start;
  }

  &:hover {
    scale: 1.02;
  }

  &:hover ${StyledArrow} {
    transform: translateX(8px);
  }
`;
