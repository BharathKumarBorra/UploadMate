import styled from "styled-components";

export const TOSContainer = styled.div`
  min-height: 100dvh;
  background-color: #f7f9fb;
  padding: calc(60px + 5vw) 0 min(5vw, 5vh);
  position: relative;
  @media screen and (min-width: 992px) {
    padding-top: calc(76px + 5vw);
  }
`;

export const TOSHeader = styled.div`
  width: 100%;

  background-color: white;
  height: 60px;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;

  box-shadow: rgba(31, 45, 61, 0.15) 0px 2px 2px 0px;
  z-index: 1000;
  margin-bottom: min(5vw, 5vh);

  @media screen and (min-width: 992px) {
    height: 76px;
  }
`;

export const ProxyLogo = styled.img`
  height: 45px;
  cursor: pointer;
`;

export const ProxyName = styled.p`
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`;

export const Home = styled.p`
  font-size: 1rem;
  font-weight: 450;
  cursor: pointer;
  margin-left: auto;
  position: relative;

  padding-left: 20px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 6px;
    width: 6px;

    border-radius: 50%;
    background-color: black;
  }
`;

export const TOSMainContainer = styled.div`
  width: 95vw;
  max-width: 992px;
  background-color: white;
  box-shadow: rgba(31, 45, 61, 0.15) 0px 2px 2px 0px;
  padding: 5vw;
  margin: 0 auto;
  border-radius: 12px;
`;

export const Heading = styled.h1`
  font-size: ${(props) => {
    if (props.subHeading) {
      return "20px";
    } else if (props.pointHeading) {
      return "18px";
    } else {
      return "24px";
    }
  }};
  line-height: ${(props) => (props.subHeading ? "28px" : "32px")};
  display: ${(props) => (props.pointHeading ? "inline" : "block")};
  margin-bottom: ${(props) => props.mainHeading && "1.5rem"};

  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.mainHeading && "32px"};
  }
`;

export const Para = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 12px 0;
`;

export const ParaList = styled.ul`
  transform: translateX(5%);
  width: calc(95%);
`;

export const ParaPoint = styled.li``;
