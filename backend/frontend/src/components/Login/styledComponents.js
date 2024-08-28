import styled, { keyframes } from "styled-components";
import { GoArrowRight } from "react-icons/go";
import { PiUserCircleLight } from "react-icons/pi";

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

export const LoginContainer = styled.div`
  width: 100%;
  min-height: 100dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  @media screen and (min-width: 768px) {
    padding-top: 76px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1; /* Take up remaining space to center content */
  padding: calc(min(20vw, 20vh) - 60px) 5vw;
  @media screen and (min-width: 1024px) {
    min-height: calc(100dvh - 76px);
    padding: calc(5vw - 76px);
  }
`;

export const HeaderContainer = styled.header`
  max-width: 1920px;
  margin: auto;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5vw;
  position: fixed;
  right: 0px;
  top: 0px;
  left: 0px;
  box-shadow: rgba(31, 45, 61, 0.15) 0px 2px 2px 0px;
  z-index: 1000;

  @media screen and (min-width: 992px) {
    height: 76px;
  }
`;

export const ProxyLogo = styled.img`
  height: 45px;
  cursor: pointer;
`;

export const ProxyName = styled.span`
  font-size: 22p;
  font-weight: 500;
`;

export const HeaderList = styled.ul`
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
`;

export const HeaderItem = styled.li`
  list-style-type: none;
  font-weight: 500;

  font-size: ${(props) => {
    return props.ratio * 15;
  }}px;

  cursor: pointer;

  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 17;
    }}px;
  }
`;

export const AnchorTag = styled.a`
  text-decoration: ${(props) => (props.sUl ? "underline" : "none")};
`;

export const SignInButton = styled.button`
  height: 40px;
  border: ${(props) => (props.outline ? "solid 1px #E5E5E5" : "none")};
  background-color: transparent;
  padding: 0px 12px;
  border-radius: 4px;
  color: #3d74d5;
  font-weight: 500;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #def1ff;

    border-color: #def1ff;
  }

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 14;
    }}px;
    padding: 4px 12px;
    border-radius: 20px;
  }
  @media screen and (min-width: 992px) {
    height: 44px;

    padding: 0px 12px;
    border-radius: 22px;
  }
  @media screen and (min-width: 1200px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
`;

export const SignInUserImg = styled(PiUserCircleLight)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 28px;
  }
  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

//login main container styling

export const LoginMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 60px);

  @media screen and (min-height: 768px) {
    min-height: calc(100dvh - 76px);
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
    return props.ratio * 8;
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

export const StyledAnchorTag = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  column-gap: 4px;
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

export const FooterWrapper = styled.div`
  align-self: stretch;
  margin-top: auto;
`;
