import { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  RequestCard,
  RequestThumbnail,
  ResponseTextContainer,
  VideoTitle,
  EditorId,
  Id,
  RequestStatus,
  Status,
  PendingStatusAndButtonsContainer,
  ButtonsContainer,
  Button,
  RequestedDateTime,
  LargeScreenRequestStatus,
  ResponseDateTime,
  LargeScreenResponseButtonContainer,
} from "./styledComponents";
import { Oval } from "react-loader-spinner";

class CreatorSectionRequestCard extends Component {
  state = {
    isApproveProcessing: false,
    isRejectProcessing: false,
  };

  onHandleApprove = async (event) => {
    event.stopPropagation();
    this.setState({ isApproveProcessing: true });
    const { onApprove, requestDetails } = this.props;
    const { videoId } = requestDetails;
    await onApprove(videoId);
    this.setState({ isApproveProcessing: false });
  };

  onHandleReject = async (event) => {
    event.stopPropagation();
    this.setState({ isRejectProcessing: true });
    const { onReject, requestDetails } = this.props;
    const { videoId } = requestDetails;
    await onReject(videoId);
    this.setState({ isRejectProcessing: false });
  };

  render() {
    const { isApproveProcessing, isRejectProcessing } = this.state;
    const { requestDetails, requestContent, fsr } = this.props;

    const {
      videoId,
      requestStatus,
      fromUser,
      title,
      thumbnailUrl,
      requestedDateTime,
      responseDateTime,
    } = requestDetails;
    const {
      from,
      requestStatus_,
      approved,
      rejected,
      pending,
      approve,
      reject,
    } = requestContent;

    const requestedDate = requestedDateTime.slice(0, 10);
    const requestedTime = requestedDateTime.slice(11);

    let responseDate, responseTime;
    if (responseDateTime) {
      responseDate = responseDateTime.slice(0, 10);
      responseTime = responseDateTime.slice(11, 19);
    }

    return (
      <RequestCard
        key={videoId}
        onClick={
          isApproveProcessing || isRejectProcessing
            ? undefined
            : () => this.props.history.push(`/creator_section/${videoId}`)
        }
      >
        <RequestThumbnail alt="thumbnail" src={thumbnailUrl} loading="lazy" />
        <ResponseTextContainer>
          <VideoTitle ratio={fsr}>{title}</VideoTitle>
          <EditorId ratio={fsr}>
            {from}: <Id>{fromUser}</Id>
          </EditorId>
          {requestStatus !== "pending" && (
            <RequestStatus ratio={fsr}>
              {requestStatus_}:{" "}
              <Status>
                {" "}
                {requestStatus === "approved"
                  ? approved
                  : requestStatus === "pending"
                  ? pending
                  : rejected}
              </Status>
            </RequestStatus>
          )}
          {requestStatus === "pending" && (
            <PendingStatusAndButtonsContainer>
              <RequestStatus ratio={fsr}>
                {requestStatus_}:{" "}
                <Status>
                  {" "}
                  {requestStatus === "approved"
                    ? approved
                    : requestStatus === "pending"
                    ? pending
                    : rejected}
                </Status>
              </RequestStatus>
              <ButtonsContainer>
                <Button
                  onClick={this.onHandleApprove}
                  approve_
                  disabled={isRejectProcessing || isApproveProcessing}
                  isProcessing={isRejectProcessing || isApproveProcessing}
                >
                  {isApproveProcessing ? (
                    <Oval color="var(--approve-color)" height="17" width="17" />
                  ) : (
                    approve
                  )}
                </Button>
                <Button
                  onClick={this.onHandleReject}
                  reject_
                  disabled={isRejectProcessing || isApproveProcessing}
                  isProcessing={isRejectProcessing || isApproveProcessing}
                >
                  {isRejectProcessing ? (
                    <Oval
                      color="var(--secondary-color)"
                      height="17"
                      width="17"
                    />
                  ) : (
                    reject
                  )}
                </Button>
              </ButtonsContainer>
            </PendingStatusAndButtonsContainer>
          )}
        </ResponseTextContainer>
        <RequestedDateTime ratio={fsr}>
          <span>{requestedDate}</span>
          <span>{requestedTime}</span>
        </RequestedDateTime>
        <LargeScreenRequestStatus ratio={fsr}>
          {requestStatus === "approved"
            ? approved
            : requestStatus === "pending"
            ? pending
            : rejected}
        </LargeScreenRequestStatus>

        {responseDateTime ? (
          <ResponseDateTime ratio={fsr}>
            <span>{responseDate}</span>
            <span>{responseTime}</span>
          </ResponseDateTime>
        ) : (
          <ResponseDateTime>{"-"}</ResponseDateTime>
        )}
        <LargeScreenResponseButtonContainer>
          {requestStatus === "pending" ? (
            <Button
              onClick={this.onHandleApprove}
              disabled={isRejectProcessing || isApproveProcessing}
              approve_
              isProcessing={isRejectProcessing || isApproveProcessing}
            >
              {isApproveProcessing ? (
                <Oval color="var(--approve-color)" height="17" width="17" />
              ) : (
                approve
              )}
            </Button>
          ) : (
            "-"
          )}
        </LargeScreenResponseButtonContainer>
        <LargeScreenResponseButtonContainer>
          {requestStatus === "pending" ? (
            <Button
              onClick={this.onHandleReject}
              disabled={isRejectProcessing || isApproveProcessing}
              reject_
              isProcessing={isRejectProcessing || isApproveProcessing}
            >
              {isRejectProcessing ? (
                <Oval color="var(--secondary-color)" height="17" width="17" />
              ) : (
                reject
              )}
            </Button>
          ) : (
            "-"
          )}
        </LargeScreenResponseButtonContainer>
      </RequestCard>
    );
  }
}

export default withRouter(CreatorSectionRequestCard);
