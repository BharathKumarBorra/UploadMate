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

const CreatorSectionRequestCard = (props) => {
  const {
    requestDetails,
    requestContent,
    onApprove,
    onReject,
    fsr,
    isProcessing,
  } = props;

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

  const onHandleApprove = (event) => {
    event.stopPropagation();
    onApprove(videoId);
  };

  const onHandleReject = (event) => {
    event.stopPropagation();
    onReject(videoId);
  };

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
        isProcessing
          ? undefined
          : () => props.history.push(`/creator_section/${videoId}`)
      }
      isProcessing={isProcessing}
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
                onClick={onHandleApprove}
                approve_
                isProcessing={isProcessing}
              >
                {isProcessing ? (
                  <Oval color="var(--approve-color)" height="17" width="17" />
                ) : (
                  approve
                )}
              </Button>
              <Button
                onClick={onHandleReject}
                reject_
                isProcessing={isProcessing}
              >
                {isProcessing ? (
                  <Oval color="var(--secondary-color)" height="17" width="17" />
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
            onClick={onHandleApprove}
            disabled={isProcessing}
            approve_
            isProcessing={isProcessing}
          >
            {isProcessing ? (
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
            onClick={onHandleReject}
            disabled={isProcessing}
            reject_
            isProcessing={isProcessing}
          >
            {isProcessing ? (
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
};

export default withRouter(CreatorSectionRequestCard);
