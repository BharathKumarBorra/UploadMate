import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiMiniLanguage } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

export const HeaderContainer = styled.header`
  max-width: 1920px;
  margin: 0px auto;
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

export const HeaderList = styled.ul`
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
`;

export const HeaderItem = styled.li`
  list-style-type: none;
  font-weight: 500;
  color: rgb(56, 63, 72);
  font-size: ${(props) => {
    return props.ratio * 15;
  }}px;
  text-underline-offset: 10px;
  display: ${(props) => (props.request || props.username ? "none" : "block")};
  cursor: ${(props) =>
    props.request || ((props.menu || props.language) && "pointer")};
  ${(props) =>
    props.menu ||
    (props.language &&
      `
    display: flex;
    flex-direction: column;
  `)};

  transition: color 0.3s ease, text-decoration 0.3 ease;

  &:hover {
    color: ${(props) => !props.username && "black"};
    text-decoration: ${(props) => props.request && "underline"};
  }

  @media screen and (min-width: 576px) {
    display: ${(props) => (props.username ? "none" : "block")};
    font-size: ${(props) => {
      return props.ratio * 17;
    }}px;
  }
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: ${(props) => (props.sUl ? "underline" : "none")};
  color: inherit;
`;

export const MenuLogo = styled(RxHamburgerMenu)`
  width: 22px;
  height: 16px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const HeaderUserImage = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

//MenuContainer Animation

const slideIn = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
    display: none;
  }
`;

export const MenuContainer = styled.ul`
  padding: 0px;
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0px;
  right: 0px;
  overflow-y: auto;
  background: white;
  display: ${(props) => (props.show === "initial" ? "none" : "block")};
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  opacity: ${(props) => (props.show ? "1" : "0")};

  box-shadow: rgb(224, 231, 238) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.12) 2px 6px 10px 0px;
  border-radius: 6px;
  font-size: ${(props) => props.ratio * 14}px;

  /* Styles for scrollbar */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #c7c7c7 #f5f5f5; /* Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  @media screen and (min-width: 768px) {
    max-height: 400px;
    width: 350px;
    top: 55px;
    right: max(5vw, calc((100vw - 1920px) / 2 + 5vw));
    font-size: ${(props) => props.ratio * 16}px;
    ${(props) => showAnimation(props)}
  }

  @media screen and (min-width: 992px) {
    top: 65px;
  }

  @media screen and (min-width: 1200px) {
    max-height: 65vh;
    height: 550px;
  }
`;

export const MenuItem = styled.li`
  list-style-type: none;
  height: 50px;
  border-top: 1px solid rgba(123, 135, 148, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 26px;
  font-weight: 500;
  color: rgb(97, 110, 124);

  @media screen and (min-width: 992px) {
    height: 60px;
  }

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const MenuUserItem = styled(MenuItem)`
  font-weight: 500;
  color: rgb(56, 63, 72);
  height: 78px;
  display: flex;
  align-items: center;
  padding: 18px 26px 0px;
  border: none;
  gap: 22px;
  font-size: ${(props) => {
    return props.ratio * 16;
  }}px;

  @media screen and (min-width: 992px) {
    padding-top: 0px;
  }
`;

export const MenuUserImage = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
`;

export const MenuUserName = styled.p`
  line-height: 1.43;
`;

export const MenuCloseIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-left: auto;
`;

//invitation-code container styling
export const InvitationCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: rgb(245, 247, 250);
  border-radius: 4px;
  border: 1px solid rgb(228, 231, 235);
`;

export const InvitationCode = styled.p`
  max-width: 60px;
  font-weight: 500;
  font-size: 18px;

  color: rgb(97, 110, 124);
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CopyImgContainer = styled.div`
  background-color: ${(props) =>
    props.clicked ? "rgb(208, 211, 215)" : "rgb(228, 231, 235)"};
  border-radius: 4px;
  height: 40px;
  min-width: 40px;
  margin: 0px 0px 0px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCopyImg = styled(MdOutlineContentCopy)`
  width: 24px;
  height: 24px;
`;

//languageList Container styling
export const SelectLanguage = styled.div`
  width: 160px;
  height: 40px;
  font-size: ${(props) => {
    return props.ratio * 15;
  }}px;
  padding: 6px 12px;
  border: solid 1px #e2e2e2;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 5px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

// Function to generate animation property based on props.show
const showAnimation = (props) =>
  props.show !== "initial" &&
  css`
    animation: ${props.show ? slideIn : slideOut} 0.5s ease-in-out forwards;
  `;

export const LanguageContainer = styled.ul`
  background-color: white;
  width: 160px;
  height: 270px;
  overflow-y: auto;
  position: absolute;
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  box-shadow: rgb(224, 231, 238) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.12) 2px 6px 10px 0px;
  border-radius: 6px;

  ${(props) => showAnimation(props)}

  display: ${(props) => (props.show === "initial" ? "none" : "block")};
  /* Styles for scrollbar */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #c7c7c7 #f5f5f5; /* Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }

  @media screen and (min-width: 992px) {
    top: 65px;
  }
`;

export const LanguageItem = styled.li`
  list-style-type: none;

  height: 40px;
  border-top: 1px solid rgba(123, 135, 148, 0.16);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0px 20px;
  //   color: rgb(97, 110, 124);
  color: ${(props) => props.selected && "blue"};

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f5f9;
  }

  @media screen and (min-width: 992px) {
    height: 45px;
  }
`;

export const Languages = styled(HiMiniLanguage)`
  font-size: 18px;
`;

export const StyledDropDown = styled(FaChevronDown)`
  margin-left: auto;

  transition: transform 0.5s ease;

  ${(props) =>
    props.rotate &&
    `
      transform: rotate(-180deg);
    `}
`;

export const SelectedMark = styled(FaCheck)`
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.show ? "1" : "0")};
`;
