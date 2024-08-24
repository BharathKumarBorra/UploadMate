import { withRouter } from "react-router-dom";
import {
  RequestCard,
  RequestThumbnail,
  RequestTextContainer,
  VideoTitle,
  CreatorId,
  Id,
  StatusAndButtonsContainer,
  RequestStatus,
  Status,
  ButtonsContainer,
  Button,
  VideoUploadedText,
  RequestedDateTime,
  LargeScreenRequestStatus,
  ResponseDateTime,
  ExtraLargeScreenUploadButtonContainer,
  LargeScreenDeleteButtonContainer,
} from "./styledComponents";
import { Oval } from "react-loader-spinner";

const EditorSectionRequestCard = (props) => {
  const {
    requestDetails,
    requestContent,
    uploadVideo,
    deleteRequest,
    resendRequest,
    isProcessing,
    activeLanguage,
    fsr,
  } = props;

  const {
    videoId,
    requestStatus,
    toUser,
    title,
    thumbnailUrl,
    videoUploadStatus,
    requestedDateTime,
    responseDateTime,
  } = requestDetails;
  const {
    to,
    requestStatus_,
    approved,
    pending,
    rejected,
    upload,
    resend,
    delete_,
    videoUploaded,
  } = requestContent;

  const handleUpload = (event) => {
    event.stopPropagation(); //prevents the event from bubbling up the DOM tree, effectively stopping any parent elements from handling the event.
    uploadVideo(activeLanguage, videoId);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteRequest(videoId);
  };

  const handleResendRequest = (event) => {
    event.stopPropagation();
    resendRequest(videoId);
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
          : () => props.history.push(`/editor_section/${videoId}`)
      }
      isProcessing={isProcessing}
    >
      <RequestThumbnail alt="thumbnail" src={thumbnailUrl} loading="lazy" />
      <RequestTextContainer className="request-card-text-container">
        <VideoTitle ratio={fsr}>{title}</VideoTitle>
        <CreatorId ratio={fsr}>
          {to}: <Id>{toUser}</Id>
        </CreatorId>
        <StatusAndButtonsContainer>
          <RequestStatus ratio={fsr}>
            {requestStatus_}:{" "}
            <Status>
              {requestStatus === "approved"
                ? approved
                : requestStatus === "pending"
                ? pending
                : rejected}
            </Status>
          </RequestStatus>

          <ButtonsContainer className="request-card-buttons-container">
            {requestStatus === "approved" &&
              (responseDateTime ? (
                videoUploadStatus === "not uploaded" && (
                  <Button
                    onClick={handleUpload}
                    disabled={isProcessing}
                    isProcessing={isProcessing}
                  >
                    {upload}
                  </Button>
                )
              ) : (
                <Button
                  onClick={handleResendRequest}
                  disabled={isProcessing}
                  isProcessing={isProcessing}
                >
                  {isProcessing ? (
                    <Oval color="var(--primary-color)" height="17" width="17" />
                  ) : (
                    resend
                  )}
                </Button>
              ))}

            {videoUploadStatus === "uploaded" && (
              <VideoUploadedText className="video-uploaded-text" ratio={fsr}>
                {videoUploaded}
              </VideoUploadedText>
            )}
            {videoUploadStatus === "not uploaded" &&
              requestStatus !== "pending" && (
                <Button
                  onClick={handleDelete}
                  delete
                  disabled={isProcessing}
                  isProcessing={isProcessing}
                >
                  {isProcessing ? (
                    <Oval
                      color="var(--secondary-color)"
                      height="17"
                      width="17"
                    />
                  ) : (
                    delete_
                  )}
                </Button>
              )}
          </ButtonsContainer>
        </StatusAndButtonsContainer>
      </RequestTextContainer>
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
      <ExtraLargeScreenUploadButtonContainer>
        {requestStatus === "approved" ? (
          responseDateTime ? (
            videoUploadStatus === "not uploaded" ? (
              <Button
                onClick={handleUpload}
                disabled={isProcessing}
                isProcessing={isProcessing}
              >
                {upload}
              </Button>
            ) : (
              "-"
            )
          ) : (
            <Button
              onClick={handleResendRequest}
              disabled={isProcessing}
              isProcessing={isProcessing}
            >
              {isProcessing ? (
                <Oval color="var(--primary-color)" height="17" width="17" />
              ) : (
                resend
              )}
            </Button>
          )
        ) : (
          "-"
        )}
      </ExtraLargeScreenUploadButtonContainer>
      <LargeScreenDeleteButtonContainer>
        {videoUploadStatus === "not uploaded" && requestStatus !== "pending" ? (
          <Button
            onClick={handleDelete}
            delete
            disabled={isProcessing}
            isProcessing={isProcessing}
          >
            {isProcessing ? (
              <Oval color="var(--secondary-color)" height="17" width="17" />
            ) : (
              delete_
            )}
          </Button>
        ) : (
          "-"
        )}
      </LargeScreenDeleteButtonContainer>
    </RequestCard>
  );
};

export default withRouter(EditorSectionRequestCard);
