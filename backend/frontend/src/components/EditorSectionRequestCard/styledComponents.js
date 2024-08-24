import styled from "styled-components";

export const RequestCard = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-bottom: solid 1px #e8e3e3;
  cursor: ${(props) => (props.isProcessing ? "default" : "pointer")};

  @media screen and (min-width: 576px) {
    flex-direction: row;
    padding-bottom: 10px;
  }
  @media screen and (min-width: 992px) {
    align-items: flex-start;
  }
`;

export const RequestThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;

  border-radius: 8px;

  @media screen and (min-width: 576px) {
    width: 40%;
  }
  @media screen and (min-width: 992px) {
    width: 22%;
  }
  @media screen and (min-width: 1200px) {
    width: 13%;
  }
`;

export const RequestTextContainer = styled.div`
  display: block;
  padding: 12px 10px;

  @media screen and (min-width: 576px) {
    padding: 4px 10px;
    width: 60%;
  }
  @media screen and (min-width: 768px) {
    padding-top: 8px;
  }
  @media screen and (min-width: 992px) {
    width: 48%;
    padding-right: 3%;
  }
  @media screen and (min-width: 1200px) {
    width: 27%;
    padding-right: 3%;
  }
`;

export const VideoTitle = styled.p`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
    font-weight: 500;
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Show only 2 lines */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 14;
    }}px;
  }
  @media screen and (min-width: 1200px) {
  }
`;

export const CreatorId = styled.p`
  width: 100%;
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  font-weight: 500;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Show only 1 line */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  @media screen and (min-width: 576px) {
    -webkit-line-clamp: 2;
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
  @media screen and (min-width: 768px) {
    -webkit-line-clamp: 1;
    font-size: ${(props) => {
      return props.ratio * 15;
    }}px;
    line-height: 28px;
  }
  @media screen and (min-width: 1200px) {
    font-size: ${(props) => {
      return props.ratio * 14;
    }}px;
  }
`;

export const Id = styled.span`
  color: gray;
  font-weight: 400;
  padding-left: 4px;
`;

export const StatusAndButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 4px;
  @media screen and (min-width: 576px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    row-gap: 8px;
  }
  @media screen and (min-width: 992px) {
    display: none;
  }
`;
export const RequestStatus = styled.h2`
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  font-weight: 600;
  margin: 0px 0px 4px 0px;
  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
`;

export const Status = styled.span`
  color: gray;
  font-weight: 400;
  padding-left: 4px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
`;

export const VideoUploadedText = styled.p`
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  @media screen and (min-width: 576px) {
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
`;

export const RequestedDateTime = styled.p`
  display: none;
  color: gray;
  font-weight: 500;
  font-size: ${(props) => {
    return props.ratio * 14;
  }}px;
  @media screen and (min-width: 1200px) {
    display: block;
    display: flex;
    flex-direction: column;

    width: 14%;
  }
`;

export const LargeScreenRequestStatus = styled.p`
  display: none;

  color: gray;

  font-weight: 500;
  @media screen and (min-width: 992px) {
    display: block;
    width: 15%;
    font-size: ${(props) => {
      return props.ratio * 14;
    }}px;
  }
  @media screen and (min-width: 1200px) {
    width: 10%;
    font-size: ${(props) => {
      return props.ratio * 16;
    }}px;
  }
`;

export const ResponseDateTime = styled(RequestedDateTime)``;

export const ExtraLargeScreenUploadButtonContainer = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
    width: 10%;
  }
`;

export const LargeScreenDeleteButtonContainer = styled.div`
  display: none;
  @media screen and (min-width: 992px) {
    display: flex;
    justify-content: center;
    width: 12%;
  }
  @media screen and (min-width: 1200px) {
    padding-left: 0px;
    text-align: center;
  }
`;

export const Button = styled.button`
  min-width: 70px;
  display: flex;
  justify-content: center;
  min-width: 70px;
  border: 0.5px solid
    ${(props) =>
      props.delete ? "var(--secondary-color)" : "var(--primary-color)"};
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.delete ? "var(--secondary-color)" : "var(--primary-color)"};
  background-color: ${(props) =>
    props.delete
      ? "var(--secondary-background-color)"
      : "var(--primary-background-color)"};
  cursor: ${(props) => (props.isProcessing ? "no-drop" : "pointer")};

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.delete
        ? "var(--secondary-hover-background-color)"
        : "var(--primary-hover-background-color)"};
  }
`;
