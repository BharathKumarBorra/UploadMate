import { Component } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import AccessibilitySection from "../AccessibilitySection";
import Header from "../Header";
import { getSectionData } from "../Header/languageContent";
import { TailSpin, Oval } from "react-loader-spinner";
import {
  loading,
  notFound,
  apology,
  errorWhileUploading,
  forbidden,
  successful,
} from "../../images";
import {
  RequestDetailsSection,
  RequestHeading,
  MediaContainer,
  MediaCard,
  RequestDetailsHeading,
  MediaItem,
  TextContainer,
  VideoTitleHeading,
  VideoTitle,
  VideoDescriptionHeading,
  VideoDescription,
  ElementsContainer,
  Element,
  ElementValue,
  ButtonsContainer,
  LoadingSection,
  FetchingErrorImage,
  FetchingErrorMessage,
  UploadResponseSection,
  UploadResponseImage,
  UploadResponseMessage,
  Button,
} from "./styledComponents";
import { requestDetailsContent } from "./languageContent";
import { postRequestContent } from "../EditorSection/languageContent";
import { youtubeCategories } from "../RequestSection/languageContent";

class EditorRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestDetails: {},
      loading: true,

      isUploadOrResendProcessing: false,
      isDeleteProcessing: false,
      fetchingErrorStatus: "",
      uploadResponse: "",
      uploadResponseMessage: "",
      uploadResponseImg: "",
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { videoId } = match.params;

    this.getRequestDetails(videoId);
  }

  getRequestDetails = async (videoId) => {
    this.setState({
      loading: true,
    });
    try {
      const response = await fetch(
        `https://youtube-proxy1.onrender.com/requests/${videoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        this.setState({
          loading: false,
          fetchingErrorStatus: response.status,
        });
        return;
      }
      const eachItem = await response.json();

      const updatedData = {
        videoId: eachItem.id,
        videoUrl: eachItem.video_url,
        title: eachItem.title,
        description: eachItem.description,
        thumbnailUrl: eachItem.thumbnail_url,
        audience: eachItem.audience,
        visibility: eachItem.visibility,
        tags: eachItem.tags,
        categoryId: eachItem.category_id,
        privacyStatus: eachItem.privacy_status,
        fromUser: eachItem.from_user,
        toUser: eachItem.to_user,
        requestedDateTime: eachItem.requested_date_time,
        responseDateTime: eachItem.response_date_time,
        videoAccessToken: eachItem.video_access_token,
        requestStatus: eachItem.request_status,
        videoUploadStatus: eachItem.video_upload_status,
      };

      this.setState({
        loading: false,
        requestDetails: updatedData,
      });
    } catch (error) {
      console.error("Error fetching requests:", error);
      this.setState({ loading: false, fetchingErrorStatus: 500 }); //just kept the errorStatus as 500 to show the fetchingError component
    }
  };

  onDeleteRequest = async () => {
    const { videoId } = this.props.match.params;
    const { history } = this.props;
    this.setState({
      isDeleteProcessing: true,
    });
    try {
      const response = await fetch(
        `https://youtube-proxy1.onrender.com/delete/${videoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Deleted Successfully");
        setTimeout(() => {
          history.push("/editor_section");
        }, 2000);
      } else {
        this.setState({
          isDeleteProcessing: false,
        });
        toast.error("Failed to Delete");
      }
    } catch (err) {
      this.setState({
        isDeleteProcessing: false,
      });
      toast.error("Failed to delete");
    }
  };

  onUploadVideo = async (activeLanguage) => {
    const {
      successMessage,
      videoQuotaExceeded,
      videoForbidden,
      error500,
      thumbnailQuotaExceeded,
      thumbnailForbidden,
      error409,
    } = getSectionData(postRequestContent, activeLanguage);

    const { requestDetails } = this.state;
    const { videoId } = requestDetails;
    const requestBody = {
      videoId,
    };
    this.setState({
      uploadResponse: "IN_PROGRESS",
    });
    try {
      const response = await fetch(
        `https://youtube-proxy1.onrender.com/upload-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the correct Content-Type header
          },
          body: JSON.stringify(requestBody),
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        this.setState({
          uploadResponse: "SUCCESS",
          uploadResponseMessage: successMessage,
        });
      } else {
        if (response.status === 403) {
          if (responseData.reason === "video quotaExceeded") {
            this.setState({
              uploadResponse: "FAILURE",
              uploadResponseMessage: videoQuotaExceeded,
              uploadResponseImg: apology,
            });
          } else if (responseData.reason === "thumbnail quotaExceeded") {
            this.setState({
              uploadResponse: "FAILURE",
              uploadResponseMessage: thumbnailQuotaExceeded,
              uploadResponseImg: apology,
            });
          } else if (responseData.reason === "video upload forbidden") {
            this.setState({
              uploadResponse: "FAILURE",
              uploadResponseMessage: videoForbidden,
              uploadResponseImg: forbidden,
            });
          } else {
            this.setState({
              uploadResponse: "FAILURE",
              uploadResponseMessage: thumbnailForbidden,
              uploadResponseImg: forbidden,
            });
          }
        } else if (response.status === 409) {
          this.setState({
            uploadResponse: "FAILURE",
            uploadResponseMessage: error409,
            uploadResponseImg: apology,
          });
        } else {
          this.setState({
            uploadResponse: "FAILURE",
            uploadResponseMessage: error500,
            uploadResponseImg: errorWhileUploading,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      this.setState({
        uploadResponse: "FAILURE",
        uploadResponseMessage: error500,
        uploadResponseImg: errorWhileUploading,
      });
      //   alert("Error uploading video");
    }
  };

  resendRequest = async () => {
    const { requestDetails } = this.state;
    const { videoId } = requestDetails;
    this.setState({ isUploadOrResendProcessing: true });

    try {
      const response = await fetch(
        `https://youtube-proxy1.onrender.com/resend/${videoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("Resent successfully");
        window.location.reload();
      } else {
        this.setState({ isUploadOrResendProcessing: false });
        throw new Error("Error in resending. Please try again.");
      }
    } catch (error) {
      console.error("Error in resending:", error);

      this.setState({ isUploadOrResendProcessing: false });
      throw new Error("Error in resending. Please try again.");
    }
  };

  renderLoading = () => {
    return (
      <LoadingSection>
        <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </LoadingSection>
    );
  };

  renderFetchingError = (renderFetchingErrorContent) => {
    const { fetchingErrorStatus } = this.state;
    const { notFoundError, otherError, retry } = renderFetchingErrorContent;

    const retryFetching = () => {
      const { videoId } = this.props.match.params;
      this.getRequestDetails(videoId);
    };

    return (
      <LoadingSection>
        <FetchingErrorImage
          alt="fetching error img"
          src={fetchingErrorStatus === 404 ? notFound : apology}
        />
        <FetchingErrorMessage>
          {fetchingErrorStatus === 404 ? notFoundError : otherError}
        </FetchingErrorMessage>
        {fetchingErrorStatus !== 404 && (
          <Button onClick={retryFetching}>{retry}</Button>
        )}
      </LoadingSection>
    );
  };

  onResetUploadResponse = () => {
    this.setState({
      uploadResponse: "",
      uploadResponseMessage: "",
    });
    window.location.reload(); // Reload the page
  };

  renderUploadResponse = (renderUploadResponseContent) => {
    const { uploadResponse, uploadResponseMessage, uploadResponseImg } =
      this.state;
    const { inProgressMessage, goBack } = renderUploadResponseContent;

    return (
      <UploadResponseSection>
        <UploadResponseImage
          alt="loading img"
          src={
            uploadResponse === "IN_PROGRESS"
              ? loading
              : uploadResponse === "SUCCESS"
              ? successful
              : uploadResponseImg
          }
        />
        {uploadResponse === "IN_PROGRESS" ? (
          <>
            <UploadResponseMessage>{inProgressMessage}</UploadResponseMessage>
          </>
        ) : (
          <>
            <UploadResponseMessage>
              {uploadResponseMessage}
            </UploadResponseMessage>
            <Button onClick={this.onResetUploadResponse}>{goBack}</Button>
          </>
        )}
      </UploadResponseSection>
    );
  };

  renderRequestDetailsSection = (
    renderRequestDetailsContent,
    activeLanguage,
    fsr
  ) => {
    const { requestDetails, isUploadOrResendProcessing, isDeleteProcessing } =
      this.state;
    const {
      requestHeading,
      video,
      mediaItemText,
      thumbnail,
      title_,
      description_,
      audience_,
      kids,
      adults,
      visibility_,
      category,
      creator,
      requestedOn,
      requestStatus_,
      uploaded,
      pending,
      respondedOn,
      uploadStatus,
      upload,
      deleteRequest,
      resendRequest,
      approved,
      rejected,
    } = renderRequestDetailsContent;
    const {
      videoUrl,
      requestStatus,
      audience,
      toUser,
      title,
      thumbnailUrl,
      description,
      categoryId,
      privacyStatus,
      requestedDateTime,
      responseDateTime,
      videoUploadStatus,
    } = requestDetails;

    const categoryName = youtubeCategories.filter(
      (eachItem) => eachItem.id === categoryId
    )[0].category;

    return (
      <>
        <RequestDetailsSection
          wait={isUploadOrResendProcessing || isDeleteProcessing}
        >
          <RequestHeading ratio={fsr}>{requestHeading}</RequestHeading>
          <MediaContainer>
            <MediaCard>
              <RequestDetailsHeading ratio={fsr}>
                {video}:{" "}
              </RequestDetailsHeading>
              {videoUploadStatus === "not uploaded" && (
                <MediaItem controls poster={thumbnailUrl} preload="auto">
                  <source src={videoUrl} type="video/mp4" />
                  {mediaItemText}
                </MediaItem>
              )}
              {videoUploadStatus === "uploaded" && (
                <MediaItem
                  as="iframe"
                  src={`https://www.youtube.com/embed/${videoUrl}`}
                  allowFullScreen
                ></MediaItem>
              )}
            </MediaCard>
            <MediaCard>
              <RequestDetailsHeading ratio={fsr}>
                {thumbnail}:
              </RequestDetailsHeading>
              <MediaItem alt="thumbnail" as="img" src={thumbnailUrl} />
            </MediaCard>
          </MediaContainer>

          <TextContainer>
            <VideoTitleHeading ratio={fsr}>{title_}</VideoTitleHeading>
            <VideoTitle ratio={fsr}>{title}</VideoTitle>
          </TextContainer>
          <TextContainer>
            <VideoDescriptionHeading ratio={fsr}>
              {description_}
            </VideoDescriptionHeading>
            <VideoDescription ratio={fsr}>{description}</VideoDescription>
          </TextContainer>
          <ElementsContainer>
            <Element ratio={fsr}>
              {audience_}:
              <ElementValue ratio={fsr}>
                {audience === "yes" ? kids : adults}
              </ElementValue>
            </Element>
            <Element ratio={fsr}>
              {visibility_}:
              <ElementValue ratio={fsr}>{privacyStatus}</ElementValue>
            </Element>
            <Element ratio={fsr}>
              {category}:<ElementValue ratio={fsr}>{categoryName}</ElementValue>
            </Element>

            <Element ratio={fsr}>
              {creator}:<ElementValue ratio={fsr}>{toUser}</ElementValue>
            </Element>
            <Element ratio={fsr}>
              {requestedOn}:
              <ElementValue ratio={fsr}>{requestedDateTime}</ElementValue>
            </Element>

            <Element ratio={fsr}>
              {requestStatus_}:{" "}
              <ElementValue ratio={fsr}>
                {requestStatus === "approved"
                  ? approved
                  : requestStatus === "pending"
                  ? pending
                  : rejected}
              </ElementValue>{" "}
            </Element>
            <Element ratio={fsr}>
              {respondedOn}:
              <ElementValue ratio={fsr}>
                {responseDateTime
                  ? `${responseDateTime.slice(0, 10)} ${responseDateTime.slice(
                      11,
                      19
                    )}`
                  : "NA"}
              </ElementValue>
            </Element>
            <Element ratio={fsr}>
              {uploadStatus}:
              <ElementValue ratio={fsr}>
                {videoUploadStatus === "uploaded" ? uploaded : pending}
              </ElementValue>
            </Element>
          </ElementsContainer>
          <ButtonsContainer>
            {requestStatus === "approved" &&
              (responseDateTime ? (
                videoUploadStatus === "not uploaded" && (
                  <Button
                    onClick={() => this.onUploadVideo(activeLanguage)}
                    upload
                    disabled={isUploadOrResendProcessing || isDeleteProcessing}
                    isProcessing={
                      isUploadOrResendProcessing || isDeleteProcessing
                    }
                  >
                    {upload}
                  </Button>
                )
              ) : (
                <Button
                  onClick={this.resendRequest}
                  resend
                  disabled={isUploadOrResendProcessing || isDeleteProcessing}
                  isProcessing={
                    isUploadOrResendProcessing || isDeleteProcessing
                  }
                >
                  {isUploadOrResendProcessing ? (
                    <Oval color="var(--primary-color)" height="17" width="17" />
                  ) : (
                    resendRequest
                  )}
                </Button>
              ))}

            {videoUploadStatus === "not uploaded" &&
              requestStatus !== "pending" && (
                <Button
                  onClick={this.onDeleteRequest}
                  ratio={fsr}
                  delete
                  disabled={isUploadOrResendProcessing || isDeleteProcessing}
                  isProcessing={
                    isUploadOrResendProcessing || isDeleteProcessing
                  }
                >
                  {isDeleteProcessing ? (
                    <Oval
                      color="var(--secondary-color)"
                      height="17"
                      width="17"
                    />
                  ) : (
                    deleteRequest
                  )}
                </Button>
              )}
          </ButtonsContainer>
        </RequestDetailsSection>
      </>
    );
  };

  render() {
    const { loading, fetchingErrorStatus, uploadResponse } = this.state;

    return (
      <LanguageAndAccessibilityContext.Consumer>
        {(value) => {
          const { activeLanguage, fontSizeRatio, showInGray } = value;
          const fsr = fontSizeRatio;

          const {
            renderRequestDetailsContent,
            renderFetchingErrorContent,
            renderUploadResponseContent,
          } = getSectionData(requestDetailsContent, activeLanguage);

          return (
            <div className={`${showInGray && "show-in-gray"} bg-container`}>
              <Header />
              <div className="main-container">
                {loading
                  ? this.renderLoading()
                  : fetchingErrorStatus
                  ? this.renderFetchingError(renderFetchingErrorContent)
                  : uploadResponse
                  ? this.renderUploadResponse(renderUploadResponseContent)
                  : this.renderRequestDetailsSection(
                      renderRequestDetailsContent,
                      activeLanguage,
                      fsr
                    )}
              </div>
              <AccessibilitySection />
              <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
                stacked
              />
            </div>
          );
        }}
      </LanguageAndAccessibilityContext.Consumer>
    );
  }
}

export default withRouter(EditorRequestDetails);
