import React, { Component } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import AccessibilitySection from "../AccessibilitySection";
import Header from "../Header";
import EditorSectionRequestCard from "../EditorSectionRequestCard";
import { getSectionData } from "../Header/languageContent";
import RequestsFilter from "../RequestsFilter";
import { TailSpin } from "react-loader-spinner";
import {
  noRequests,
  successful,
  forbidden,
  errorWhileUploading,
  apology,
  loading,
} from "../../images";
import {
  EditorSectionContainer,
  EditorSectionHeading,
  RequestsTableHeader,
  TableElement,
  NoRequestsContainer,
  NoRequestsImage,
  ApologiesText,
  StyledLink,
  RequestsContainer,
  LoadingSection,
  FetchingErrorImage,
  FetchingErrorMessage,
  UploadResponseSection,
  UploadResponseImage,
  UploadResponseMessage,
  Button,
} from "./styledComponents";
import { requestsSectionContent, postRequestContent } from "./languageContent";

class EditorSectionRequests extends Component {
  state = {
    selectedFilter: "",
    requestsList: [],
    loading: true,
    fetchingErrorStatus: "",
    uploadResponse: "",
    uploadResponseMessage: "",
    uploadResponseImg: "",
  };

  componentDidMount() {
    this.getRequests();
  }

  getRequests = async (status = "") => {
    this.setState({
      loading: true,
      selectedFilter: status,
    });
    try {
      const response = await fetch(
        `https://youtube-jwt-proxy.onrender.com/requests?role=editor${
          status && `&req_status=${status}`
        }`,
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
      const data = await response.json();

      const updatedData = data.map((eachItem) => ({
        videoId: eachItem.id,
        videoUrl: eachItem.video_url,
        title: eachItem.title,
        description: eachItem.description,
        thumbnailUrl: eachItem.thumbnail_url,
        playLists: eachItem.playLists,
        audience: eachItem.audience,
        categoryId: eachItem.category_id,
        privacyStatus: eachItem.privacy_status,
        fromUser: eachItem.from_user,
        toUser: eachItem.to_user,
        requestedDateTime: eachItem.requested_date_time,
        responseDateTime: eachItem.response_date_time,
        videoAccessToken: eachItem.video_access_token,
        requestStatus: eachItem.request_status,
        videoUploadStatus: eachItem.video_upload_status,
      }));

      this.setState({
        loading: false,
        requestsList: updatedData,
      });
    } catch (error) {
      this.setState({ loading: false, fetchingErrorStatus: 400 });
    }
  };

  deleteRequest = async (videoId) => {
    try {
      const response = await fetch(
        `https://youtube-jwt-proxy.onrender.com/delete/${videoId}`,
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
        await this.getRequests();
      } else {
        toast.error("Failed to Delete");
      }
    } catch (error) {
      toast.error("Failed to delete");
      console.log("error occurred: ", error);
    }
  };

  uploadVideo = async (activeLanguage, videoId) => {
    const {
      successMessage,
      videoQuotaExceeded,
      videoForbidden,
      error500,
      thumbnailQuotaExceeded,
      thumbnailForbidden,
      error409,
    } = getSectionData(postRequestContent, activeLanguage);

    const requestBody = {
      videoId,
    };
    this.setState({
      uploadResponse: "IN_PROGRESS",
    });
    try {
      const response = await fetch(
        "https://youtube-jwt-proxy.onrender.com/upload-video",
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
      console.log("upload response data: ", responseData);
      if (response.ok) {
        this.setState({
          uploadResponse: "SUCCESS",
          uploadResponseMessage: successMessage,
        });
        console.log("Video uploaded successfully:", responseData);
        // window.location.reload(); // Reload the page
        // alert("Video uploaded successfully");
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

        console.log("response of error", response);
        // alert("Error while uploading");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      this.setState({
        uploadResponse: "FAILURE",
        uploadResponseMessage: "Error while uploading video",
        uploadResponseImg: errorWhileUploading,
      });
      //   alert("Error uploading video");
    }
  };

  resendRequest = async (videoId) => {
    try {
      const response = await fetch(
        `https://youtube-jwt-proxy.onrender.com/resend/${videoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Resent Successfully");
        await this.getRequests();
      } else {
        toast.error("Error while Resending.Please try again.");
      }
    } catch (error) {
      console.log("Error in resending:", error);

      toast.error("Error while Resending.Please try again.");
    }
  };

  renderLoading = () => {
    return (
      <LoadingSection>
        <TailSpin
          type="ThreeDots"
          color="var(--primary-color)"
          height="50"
          width="50"
        />
      </LoadingSection>
    );
  };

  renderFetchingError = (renderFetchingErrorContent) => {
    const { error500, retry } = renderFetchingErrorContent;

    const retryFetching = () => {
      this.getRequests();
    };

    return (
      <LoadingSection>
        <FetchingErrorImage alt="fetching error img" src={apology} />
        <FetchingErrorMessage>{error500}</FetchingErrorMessage>

        <Button onClick={retryFetching}>{retry}</Button>
      </LoadingSection>
    );
  };

  onResetUploadResponse = () => {
    this.setState({
      uploadResponse: "",
      uploadResponseMessage: "",
    });
    this.getRequests();
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
            <TailSpin
              type="ThreeDots"
              color="var(--primary-color)"
              height="50"
              width="50"
            />
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

  renderEditorSection = (
    renderRequestsSectionContent,
    activeLanguage,
    fsr,
    sUl
  ) => {
    const { loading, requestsList, selectedFilter } = this.state;
    const {
      editorSectionHeading,
      video,
      status,
      upload,
      delete_,
      requestedOn,
      respondedOn,
      apologiesText,
      makeARequest,
      renderRequestContent,
    } = renderRequestsSectionContent;
    return (
      <EditorSectionContainer>
        <EditorSectionHeading ratio={fsr}>
          {editorSectionHeading}
        </EditorSectionHeading>

        <RequestsFilter
          getRequests={this.getRequests}
          selectedFilter={selectedFilter}
        />
        {loading ? (
          this.renderLoading()
        ) : (
          <>
            {requestsList.length > 0 && (
              <RequestsTableHeader ratio={fsr}>
                <TableElement video>{video}</TableElement>
                <TableElement requestedDateTime>{requestedOn}</TableElement>
                <TableElement status>{status}</TableElement>
                <TableElement respondedDateTime>{respondedOn}</TableElement>
                <TableElement upload>{upload} </TableElement>
                <TableElement delete>{delete_} </TableElement>
              </RequestsTableHeader>
            )}
            {requestsList.length === 0 ? (
              <NoRequestsContainer>
                <NoRequestsImage alt="loading img" src={noRequests} />
                <ApologiesText className="loading-text" ratio={fsr}>
                  {apologiesText}
                </ApologiesText>
                <StyledLink to="/request_section" sUl={sUl}>
                  <Button>{makeARequest}</Button>
                </StyledLink>
              </NoRequestsContainer>
            ) : (
              <RequestsContainer>
                {requestsList.map((eachItem) => (
                  <EditorSectionRequestCard
                    requestDetails={eachItem}
                    requestContent={renderRequestContent}
                    uploadVideo={this.uploadVideo}
                    deleteRequest={this.deleteRequest}
                    resendRequest={this.resendRequest}
                    activeLanguage={activeLanguage}
                    fsr={fsr}
                  />
                ))}
              </RequestsContainer>
            )}
          </>
        )}
      </EditorSectionContainer>
    );
  };

  render() {
    const { fetchingErrorStatus, uploadResponse } = this.state;

    return (
      <LanguageAndAccessibilityContext.Consumer>
        {(value) => {
          const {
            activeLanguage,
            fontSizeRatio,
            showInGray,
            showUnderLines: sUl,
          } = value;
          const fsr = fontSizeRatio;
          console.log("editor section ratio: ", fontSizeRatio);
          const {
            renderRequestsSectionContent,
            renderFetchingErrorContent,
            renderUploadResponseContent,
          } = getSectionData(requestsSectionContent, activeLanguage);

          return (
            <div className={`${showInGray && "show-in-gray"} bg-container`}>
              <Header />
              <div className="main-container">
                {fetchingErrorStatus
                  ? this.renderFetchingError(renderFetchingErrorContent)
                  : uploadResponse
                  ? this.renderUploadResponse(renderUploadResponseContent)
                  : this.renderEditorSection(
                      renderRequestsSectionContent,
                      activeLanguage,
                      fsr,
                      sUl
                    )}
              </div>
              <AccessibilitySection />
              <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={true}
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

export default EditorSectionRequests;
