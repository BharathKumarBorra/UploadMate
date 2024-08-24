import styled, { keyframes } from "styled-components";
import { TbReplace } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";

export const RequestSectionContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: 0px 5vw 24px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 76px);
  }
`;

export const Heading = styled.h1`
  font-size: ${(props) => {
    return props.ratio * 16;
  }}px;
  font-weight: 600;
  padding: 20px 0px 10px;
  color: rgb(51, 65, 85);
  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 18;
    }}px;
  }

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 20;
    }}px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 22;
    }}px;

    line-height: 32px;
  }
  @media screen and (min-width: 1200px) {
    font-size: ${(props) => {
      return props.ratio * 24;
    }}px;
  }
`;

export const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const MediaFilesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
  }
`;

export const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 940px;
  aspect-ratio: 16/9;

  @media screen and (min-width: 768px) {
    width: 49%;
  }
`;

export const FileUpdateSection = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;
export const StyledFileReplaceIcon = styled(TbReplace)`
  background-color: black;
  padding: 8px;
  font-size: 45px;

  color: white;
  border-radius: 12px;
  position: absolute;
  top: 15px;
  left: 18px;
  z-index: 1;
`;
export const MyFile = styled.video`
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  border: solid 2px #616e7c;
  border-radius: 10px;
`;

export const PreviewCard = styled.div`
  height: 100%;
  border: dashed 2px ${(props) => (props.error ? "red" : "#616e7c")};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(71, 85, 105);
  cursor: pointer;
`;

export const UploadIcon = styled.div`
  font-size: 28px;
  height: 32px;
`;
export const UploadText = styled.p`
  font-size: ${(props) => {
    return props.ratio * 13;
  }}px;
  font-weight: 500;
  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 18;
    }}px;
  }
  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 13;
    }}px;
  }

  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 15;
    }}px;
  }
`;
export const FileButton = styled.input``;

export const InputContainer = styled.div`
  position: relative;
  width: 100%; /* 100% for full width on small screens */
  max-width: 768px; /*max width for larger screens */
  margin-top: 12px;
  transition: border-color 0.3s;
  border: solid 1px
    ${(props) => (props.focused ? "blue" : props.error ? "red" : "#c7c7c7")};
  border-radius: 4px;

  padding: 8px 12px 22px 12px;
`;

export const TitleLabel = styled.label`
  display: block;
  margin-bottom: 6px;

  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  font-weight: 600;
  line-height: 24px;
  transition: color 0.3s;
  color: ${(props) =>
    props.focused ? "blue" : props.error ? "red" : "rgb(71, 85, 105)"};

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
`;

export const TitleTextArea = styled.textarea`
  width: 100%;
  font-size: ${(props) => {
    return props.ratio * 15;
  }}px;
  border: none;
  outline: none;
  resize: none; /* Prevents the user from resizing the textarea */
  overflow: hidden; /* Hides the scrollbar */
  font-family: Inter;
  line-height: 1.2em;
  margin-bottom: 10px;

  &::placeholder {
    color: #a0a0a0;
    font-size: ${(props) => props.ratio * 14}px;
  }

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
    &::placeholder {
      font-size: ${(props) => props.ratio * 15}px;
    }
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 17;
    }}px;
  }
  &::placeholder {
    font-size: ${(props) => props.ratio * 16}px;
  }
`;

export const CharCount = styled.div`
  position: absolute;
  bottom: 6px;
  right: 10px;

  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  color: #6c757d;
`;

export const DescriptionLabel = styled(TitleLabel)``;

export const DescriptionTextArea = styled(TitleTextArea)`
  overflow-y: auto; /* Enables vertical scrollbar */
  height: auto; /* Ensure the textarea adjusts its height */
  max-height: calc(1.2em * 5); /* Set the maximum height to 5 rows */
  line-height: 1.2em; /* Adjust the line height to match your needs */

  &::-webkit-scrollbar {
    width: 6px;
  }

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 17;
    }}px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 18;
    }}px;
  }
`;

export const FormElementsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media screen and (min-width: 768px) {
    justify-content: space-evenly;
  }
`;

export const FormElementContainer = styled.div`
  width: 100%;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-top: 12px;
  @media screen and (min-width: 576px) {
    width: ${(props) => (props.creatorCode ? "100%" : "40%")};
  }
  @media screen and (min-width: 768px) {
    width: ${(props) => (props.creatorCode ? "100%" : "33%")};
  }
`;

export const FormElementHeading = styled.h2`
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;

  font-weight: 500;
  color: rgb(51, 65, 85);
  margin-bottom: 8px;
  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 15;
    }}px;
  }

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 18;
    }}px;
  }
`;

export const AudienceType = styled.label`
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;

  line-height: 24px;
  margin-left: 14px;
  display: flex;
  align-items: center;
  column-gap: 6px;

  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
    line-height: 32px;
  }
`;

export const AudienceTypeRadio = styled.input`
  width: 1.5em;
  height: 1.5em;
`;

export const FormElementSelect = styled.div`
  min-width: 160px;
  height: 40px;
  font-size: 15px;
  padding: 6px 12px;
  margin-left: 12px;
  border: solid 1px #e2e2e2;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const StyledDropDown = styled(FaChevronDown)`
  margin-left: auto;
  color: rgb(71, 85, 105);
  transition: transform 0.5s ease;

  ${(props) =>
    props.rotate &&
    `
      transform: rotate(-180deg);
    `}
`;

//dropdown Animation

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

export const FormElementSelectOptionsContainer = styled.ul`
  background-color: white;
  width: ${(props) => (props.category ? "180px" : "170px")};
  max-height: 135px;
  overflow-y: auto;
  position: absolute;
  top: 70px;
  left: 12px;
  z-index: 100;
  z-index: ${(props) => (props.category ? 2 : 3)};
  box-shadow: rgb(224, 231, 238) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.12) 2px 6px 10px 0px;
  border-radius: 6px;
  cursor: pointer;
  animation: ${(props) => (props.show ? slideIn : slideOut)} 0.5s ease-in-out
    forwards;

  /* Styles for scrollbar */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #c7c7c7 #f5f5f5; /* Firefox */
  &::-webkit-scrollbar {
    width: 5px; /* Width of the scrollbar */
  }

  @media screen and (min-width: 576px) {
    right: calc(5vw + 140px);
  }

  @media screen and (min-width: 768px) {
    right: max(5vw + 300px, calc((100vw - 1920px) / 2 + 5vw + 300px));
  }

  @media screen and (min-width: 992px) {
    top: 75px;
  }
`;

export const FormElementSelectOption = styled.li`
  list-style-type: none;
  font-size: 14px;
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

export const InputCreator = styled.input`
  width: clamp(140px, 60vw, 300px);
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid #a19d9d;
  outline: none;
  margin-left: 14px;
  border-radius: 5px;
  @media screen and (min-width: 992px) {
    padding: 10px 18px;
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
`;
export const Button = styled.button`
  align-self: ${(props) => {
    if (props.submit) {
      return "flex-start";
    }
  }};

  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  font-weight: 500;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  padding: 8px 16px;
  margin-top: 12px;
  background-color: var(--primary-background-color);
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-hover-background-color);
  }

  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
    padding: 10px 20px;
  }
`;

//loading section styling
export const LoadingSection = styled(RequestSectionContainer)`
  justify-content: center;
  align-items: center;
`;
export const LoadingImage = styled.img`
  width: min(50vw, 50vh);
`;

export const LoadingText = styled.p`
  font-size: ${(props) => {
    return props.ratio * 16;
  }}px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;

  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 20;
    }}px;
  }
  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 24;
    }}px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 28;
    }}px;
  }
`;

//submit message section styling
export const SubmitResponseSection = styled(RequestSectionContainer)`
  justify-content: center;
  align-items: center;
`;
export const SubmitResponseImage = styled(LoadingImage)``;
export const SubmitResponseMessage = styled(LoadingText)``;

//error message styling
export const ErrorMessage = styled.p`
  padding: 4px 0px 0px 12px;
  color: red;
  font-weight: 500;
  font-size: 12px;
  @media screen and (min-width: 576px) {
    font-size: 13px;
  }

  @media screen and (min-width: 756px) {
    font-size: 14px;
  }
  @media screen and (min-width: 992px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }
`;
