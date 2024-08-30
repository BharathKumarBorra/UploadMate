import styled from "styled-components";
import { Link } from "react-router-dom";

export const CreatorSectionContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: 0px 5vw 24px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 76px);
  }
`;

export const CreatorSectionHeading = styled.h1`
  font-size: ${(props) => {
    return props.ratio * 17;
  }}px;
  font-weight: 600;
  padding: 20px 0px 10px;
  color: rgb(51, 65, 85);
  border-bottom: solid 1px #cbd5e1;

  @media screen and (min-width: 768px) {
    font-size: ${(props) => {
      return props.ratio * 18;
    }}px;
  }
  @media screen and (min-width: 992px) {
    font-size: ${(props) => {
      return props.ratio * 20;
    }}px;
    line-height: 32px;
    margin-bottom: 0px;
  }
  @media screen and (min-width: 1200px) {
    font-size: ${(props) => {
      return props.ratio * 22;
    }}px;
  }
`;

export const RequestsTableHeader = styled.ul`
  display: none;

  @media screen and (min-width: 992px) {
    display: block;
    display: flex;
    align-items: center;
    font-size: ${(props) => {
      return props.ratio * 14;
    }}px;
    font-weight: 600;
    color: rgb(51, 65, 85);
    border-bottom: solid 1px #cbd5e1;
    padding: 12px 0px;
  }
`;

export const TableElement = styled.li`
  @media screen and (min-width: 992px) {
    list-style-type: none;
    width: ${(props) => {
      if (props.video) {
        return "61%";
      } else if (props.status) {
        return "15%";
      } else if (props.approve_ || props.reject_) {
        return "12%";
      } else {
        return "0%";
      }
    }};
    display: ${(props) =>
      props.video || props.status || props.approve_ || props.reject_
        ? "block"
        : "none"};
    text-align: ${(props) =>
      props.approve_ || props.reject_ ? "center" : "flex-start"};
  }

  padding-left: ${(props) => (props.video ? "12px" : "0px")};

  @media screen and (min-width: 1200px) {
    display: block;

    width: ${(props) => {
      if (props.video) {
        return "40%";
      } else if (props.requestedDateTime || props.respondedDateTime) {
        return "15%";
      } else if (props.status) {
        return "10%";
      } else if (props.approve_ || props.reject_) {
        return "10%";
      } else {
        return "0%";
      }
    }};
    text-align: ${(props) =>
      props.approve_ || props.reject_ ? "center" : "flex-start"};
  }
`;

//no requests section styling
export const NoRequestsContainer = styled.div`
  min-height: calc(100vh - 160px);
  padding: 1vw 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 180px);
  }
`;

export const NoRequestsImage = styled.img`
  width: min(50vw, 50vh);
`;

export const ApologiesText = styled.p`
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
      return props.ratio * 32;
    }}px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: ${(props) => (props.sUl ? "underline" : "none")};
`;

export const RequestsContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  min-width: 70px;
  color: ${(props) =>
    props.approve_
      ? "var(--approve-color)"
      : props.reject_
      ? "var(--secondary-color)"
      : "var(--primary-color)"};
  border: 1px solid
    ${(props) =>
      props.approve_
        ? "var(--approve-color)"
        : props.reject_
        ? "var(--secondary-color)"
        : "var(--primary-color)"};
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${(props) =>
    props.approve_
      ? "var(--approve-background-color)"
      : props.reject_
      ? "var(--secondary-background-color)"
      : "var(--primary-background-color)"};
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.approve_
        ? "var(--approve-hover-background-color)"
        : props.reject_
        ? "var(--secondary-hover-background-color)"
        : "var(--primary-hover-background-color)"};
  }
`;

//loading section styling
export const LoadingSection = styled(CreatorSectionContainer)`
  align-items: center;
  justify-content: center;
`;

//fetchingError section styling

export const FetchingErrorImage = styled.img`
  width: min(60vw, 60vh);
`;
export const FetchingErrorMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;

  @media screen and (min-width: 576px) {
    font-size: 20px;
  }
  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;
