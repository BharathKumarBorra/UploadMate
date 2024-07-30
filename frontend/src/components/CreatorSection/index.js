import { Component } from "react";
import Cookies from 'react-router-dom'
import Header from "../Header";
import RequestsFilter from "../RequestsFilter";
import AccessibilitySection from "../AccessibilitySection";
import { getSectionData } from "../Header/languageContent";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatorSectionRequestCard from "../CreatorSectionRequestCard";
import { apology, noRequests } from "../../images";
import { TailSpin } from "react-loader-spinner";
import {
  CreatorSectionContainer,
  CreatorSectionHeading,
  RequestsTableHeader,
  TableElement,
  NoRequestsContainer,
  NoRequestsImage,
  ApologiesText,
  StyledLink,
  RequestsContainer,
  Button,
  LoadingSection,
  FetchingErrorImage,
  FetchingErrorMessage,
} from "./styledComponents";
import { requestsSectionContent } from "../EditorSection/languageContent";

class CreatorSection extends Component {
  state = {
    selectedFilter: "",
    requestsList: [],
    loading: true,
    fetchingErrorStatus: "",
    isProcessing: false,
  };

  componentDidMount() {
    this.getRequests();
  }

  getRequests = async (status = "") => {
    this.setState({
      loading: true,
      selectedFilter: status,
    });

    const token = Cookies.get('token');

    if (!token) {
      console.error("No authentication token found");
      this.props.history.push("/login"); // Redirect to login page
      window.location.reload();

      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/requests?role=creator${status && `&req_status=${status}`}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
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
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        description: eachItem.description,
        tags: eachItem.tags,
        categoryId: eachItem.category_id,
        privacyStatus: eachItem.privacy_status,
        fromUser: eachItem.from_user,
        toUser: eachItem.to_user,
        requestedDateTime: eachItem.requested_date_time,
        responseDateTime: eachItem.response_date_time,
        videoAccessToken: eachItem.video_access_token,
        requestStatus: eachItem.request_status,
      }));
      console.log(updatedData);
      this.setState({
        loading: false,
        requestsList: updatedData,
      });
    } catch (err) {
      this.setState({ loading: false, fetchingErrorStatus: 400 });
    }
  };

  onApprove = async (videoId) => {
    this.setState({
      isProcessing: true,
    });
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/response/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ creatorResponse: true }),
      });

      if (response.ok) {
        toast.success("Request approved successfully");
        await this.getRequests();
      } else {
        toast.error("Request approval failed");
      }
    } catch (err) {
      toast.error("Failed to process request");
    }
    this.setState({
      isProcessing: false,
    });
  };

  onReject = async (videoId) => {
    this.setState({
      isProcessing: true,
    });
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/response/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ creatorResponse: false }),
      });

      if (response.ok) {
        toast.success("Request rejected successfully");
        await this.getRequests();
      } else {
        toast.error("Request rejection failed");
      }
    } catch (err) {
      toast.error("Failed to process request");
    }
    this.setState({
      isProcessing: false,
    });
  };

  renderLoading = () => {
    return (
      <LoadingSection>
        <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
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

  renderCreatorSection = (renderRequestsSectionContent, fsr, sUl) => {
    const { loading, requestsList, selectedFilter, isProcessing } = this.state;
    const {
      creatorSectionHeading,
      video,
      status,
      requestedOn,
      respondedOn,
      approve,
      reject,
      apologiesText,
      backToHome,
      renderRequestContent,
    } = renderRequestsSectionContent;
    return (
      <CreatorSectionContainer>
        <CreatorSectionHeading ratio={fsr}>
          {creatorSectionHeading}
        </CreatorSectionHeading>
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
                <TableElement approve_>{approve}</TableElement>
                <TableElement reject_>{reject}</TableElement>
              </RequestsTableHeader>
            )}
            {requestsList.length === 0 ? (
              <NoRequestsContainer>
                <NoRequestsImage alt="loading img" src={noRequests} />
                <ApologiesText ratio={fsr}>{apologiesText}</ApologiesText>
                <StyledLink to="/" sUl={sUl}>
                  <Button>{backToHome}</Button>
                </StyledLink>
              </NoRequestsContainer>
            ) : (
              <RequestsContainer>
                {requestsList.map((eachItem) => (
                  <CreatorSectionRequestCard
                    requestDetails={eachItem}
                    requestContent={renderRequestContent}
                    onApprove={this.onApprove}
                    onReject={this.onReject}
                    fsr={fsr}
                    isProcessing={isProcessing}
                  />
                ))}
              </RequestsContainer>
            )}
          </>
        )}
      </CreatorSectionContainer>
    );
  };

  render() {
    const { fetchingErrorStatus } = this.state;

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
          console.log("creator section ratio: ", fontSizeRatio);
          const {
            renderRequestsSectionContent,
            renderFetchingErrorContent,
          } = getSectionData(requestsSectionContent, activeLanguage);

          return (
            <div className={`${showInGray && "show-in-gray"} bg-container`}>
              <Header />
              <div className="main-container">
                {fetchingErrorStatus
                  ? renderFetchingErrorContent(renderFetchingErrorContent)
                  : this.renderCreatorSection(
                      renderRequestsSectionContent,
                      fsr,
                      sUl
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

export default CreatorSection;
