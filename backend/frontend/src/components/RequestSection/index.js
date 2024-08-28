import { Component } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoVideocamOutline, IoImageOutline } from "react-icons/io5";
import { loading, successful, errorWhileUploading } from "../../images";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import AccessibilitySection from "../AccessibilitySection";
import Header from "../Header";
import { getSectionData } from "../Header/languageContent";
import { TailSpin } from "react-loader-spinner";
import {
  RequestSectionContainer,
  Heading,
  RequestForm,
  MediaFilesContainer,
  MediaContainer,
  FileUpdateSection,
  StyledFileReplaceIcon,
  MyFile,
  PreviewCard,
  UploadIcon,
  UploadText,
  FileButton,
  InputContainer,
  TitleLabel,
  TitleTextArea,
  CharCount,
  DescriptionLabel,
  DescriptionTextArea,
  FormElementsContainer,
  FormElementContainer,
  FormElementHeading,
  AudienceType,
  AudienceTypeRadio,
  FormElementSelect,
  StyledDropDown,
  FormElementSelectOptionsContainer,
  FormElementSelectOption,
  InputCreator,
  Button,
  LoadingSection,
  LoadingImage,
  LoadingText,
  SubmitResponseSection,
  SubmitResponseImage,
  SubmitResponseMessage,
  ErrorMessage,
} from "./styledComponents";

import {
  requestSectionContent,
  youtubeCategoriesContainer,
} from "./languageContent";

class RequestSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseStatus: "",
      videoUrl: "",
      thumbnailUrl: "",
      videoTitle: "",
      videoDescription: "",
      creatorInvitationCode: "",
      titleFocused: false,
      selectedVisibility: "",
      selectedCategory: "",
      showVisibilityContainer: false,
      showCategoriesContainer: false,
      thumbnailError: "",
      videoError: "",
      titleError: "",
      descriptionError: "",
      audienceError: "",
      visibilityError: "",
      categoryError: "",
      invitationError: "",
    };
  }

  onNewRequest = () => {
    this.setState({
      responseStatus: "",
      videoUrl: "",
      thumbnailUrl: "",
      videoTitle: "",
      videoDescription: "",
      creatorInvitationCode: "",
      selectedVisibility: "",
      selectedCategory: "",
      titleFocused: false,
      showVisibilityContainer: false,
      showCategoriesContainer: false,
      thumbnailError: "",
      videoError: "",
      titleError: "",
      descriptionError: "",
      audienceError: "",
      visibilityError: "",
      categoryError: "",
      invitationError: "",
    });
  };

  checkAllFields = async () => {
    const { videoUrl, thumbnailUrl, videoTitle, videoDescription } = this.state;
    let isValid = true;

    if (!videoUrl) {
      this.setState({ videoError: "Please select a video" });
      isValid = false;
    }

    if (!thumbnailUrl) {
      this.setState({ thumbnailError: "Please select a thumbnail" });
      isValid = false;
    }

    if (!videoTitle) {
      this.setState({ titleError: "Please give title for your video" });
      isValid = false;
    }

    if (!videoDescription) {
      this.setState({
        descriptionError: "Please give description for your video",
      });
      isValid = false;
    }

    const audience = document.querySelector('input[name="audience"]:checked');
    if (!audience) {
      this.setState({ audienceError: "Please select audience type" });
      isValid = false;
    }

    const visibility = document.getElementById("input-status").value;
    if (!visibility) {
      this.setState({ visibilityError: "Please select visibility" });
      isValid = false;
    }

    const category = document.getElementById("input-category").value;
    if (!category) {
      this.setState({ categoryError: "Please select category" });
      isValid = false;
    }

    const invitationCode = document.getElementById("creator").value;
    if (!invitationCode) {
      this.setState({
        invitationError: "Please provide the creator's invitation code",
      });
      isValid = false;
    }
    if (invitationCode) {
      try {
        const response = await fetch(
          `https://youtube-proxy1.onrender.com/check_invitation_code`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ invitationCode }),
          }
        );

        if (!response.ok) {
          isValid = false;
          const data = await response.json();
          this.setState({
            invitationError: data.message,
          });
        }
      } catch (error) {
        this.setState({
          invitationError: "An unexpected error occurred. Please try again.",
        });
        isValid = false;
      }
    }

    return isValid;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const allAreProperlyFilled = await this.checkAllFields();

    if (!allAreProperlyFilled) {
      return;
    }

    this.setState({
      responseStatus: "IN_PROGRESS",
    });

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `https://youtube-proxy1.onrender.com/upload-request`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        this.setState({
          responseStatus: 200,
        });
      } else {
        this.setState({
          responseStatus: 500,
        });
      }
    } catch (error) {
      this.setState({
        responseStatus: 400,
      });
    }
  };

  onChangeVideo = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 256 * 1024 * 1024 * 1024) {
        // Check if file size is greater than 256GB
        this.setState({
          videoError: "Video file size should not exceed 256GB.",
          videoUrl: "", // Reset the video URL
        });
        event.target.value = null; // Reset the file input
        return;
      }

      const url = URL.createObjectURL(file);
      this.setState({
        videoUrl: url,
        videoError: "",
      });
    }
  };

  onChangeThumbnail = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // Checking if file size is greater than 2MB
        this.setState({
          thumbnailError: "Thumbnail file size should not exceed 2MB.",
          thumbnailUrl: "", // Resetting the thumbnail URL
        });
        event.target.value = null; // Resetting the file input
        return;
      }
      const url = URL.createObjectURL(file);
      this.setState({
        thumbnailUrl: url,
        thumbnailError: "",
      });
    }
  };

  onChangeTitle = (event) => {
    this.setState({
      videoTitle: event.target.value,
      titleError: "",
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      videoDescription: event.target.value,
      descriptionError: "",
    });
  };

  onChangeCreatorInvitationCode = (event) => {
    this.setState({
      creatorInvitationCode: event.target.value,
      invitationError: "",
    });
  };

  removeAudienceError = () => {
    this.setState({
      audienceError: "",
    });
  };

  onTitleFocus = () => {
    this.setState({
      titleFocused: true,
    });
  };

  onTitleBlur = (event) => {
    if (event.target.value === "") {
      this.setState({
        titleError: "please give title for your video",
        titleFocused: false,
      });
    } else {
      this.setState({
        titleError: "",
        titleFocused: false,
      });
    }
  };

  onDescriptionFocus = () => {
    this.setState({
      descriptionFocused: true,
    });
  };

  onDescriptionBlur = (event) => {
    if (event.target.value === "") {
      this.setState({
        descriptionError: "please give description for your video",
        descriptionFocused: false,
      });
    } else {
      this.setState({
        descriptionError: "",
        descriptionFocused: false,
      });
    }
  };

  onCreatorInvitationCodeInputBlur = (event) => {
    if (event.target.value === "") {
      this.setState({
        invitationError: "please give creator invitation code",
      });
    } else {
      this.setState({
        invitationError: "",
      });
    }
  };

  renderSubmitMessage = (renderSubmitMessageContent, fsr) => {
    const { responseStatus } = this.state;
    const { successMessage, clientErrorMessage, serverErrorMessage, goBack } =
      renderSubmitMessageContent;
    return (
      <SubmitResponseSection>
        <SubmitResponseImage
          alt="loading img"
          src={responseStatus === 200 ? successful : errorWhileUploading}
        />
        <SubmitResponseMessage ratio={fsr}>
          {responseStatus === 200
            ? successMessage
            : responseStatus === 400
            ? clientErrorMessage
            : serverErrorMessage}
        </SubmitResponseMessage>
        <Button onClick={this.onNewRequest} goBack>
          {goBack}
        </Button>
      </SubmitResponseSection>
    );
  };

  renderLoading = (renderLoadingContent, fsr) => {
    const { loadingText } = renderLoadingContent;
    return (
      <LoadingSection>
        <LoadingImage alt="loading img" src={loading} />
        <LoadingText ratio={fsr}>{loadingText}...</LoadingText>
        <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </LoadingSection>
    );
  };

  onUpdateSelectedVisibility = (event) => {
    const selectedValue = event.target.getAttribute("data-value");

    this.setState({
      selectedVisibility: selectedValue,
      showVisibilityContainer: false,
    });
  };

  onUpdateSelectedCategory = (event) => {
    const selectedValue = event.target.getAttribute("data-value");

    this.setState({
      selectedCategory: selectedValue,
      showCategoriesContainer: false,
    });
  };

  toggleVisibilityContainer = () => {
    this.setState((prevState) => ({
      showVisibilityContainer: !prevState.showVisibilityContainer,
    }));
  };

  toggleCategoriesContainer = () => {
    this.setState((prevState) => ({
      showCategoriesContainer: !prevState.showCategoriesContainer,
    }));
  };

  renderRequestSection = (
    renderRequestSectionContent,
    youtubeCategories,
    fsr
  ) => {
    const {
      videoUrl,
      thumbnailUrl,
      videoTitle,
      videoDescription,
      titleFocused,
      descriptionFocused,
      selectedVisibility,
      selectedCategory,
      showVisibilityContainer,
      showCategoriesContainer,
      videoError,
      thumbnailError,
      titleError,
      descriptionError,
      audienceError,
      visibilityError,
      categoryError,
      invitationError,
    } = this.state;

    const {
      heading,
      myFileText,
      uploadVideoText,
      uploadThumbnailText,
      title_,
      titlePlaceHolder,
      description_,
      descriptionPlaceHolder,
      audience_,
      madeForKids,
      notMadeForKids,
      visibility_,
      selectVisibility,
      public_,
      private_,
      category,
      selectCategory,
      creatorInvitationCode,
      creatorIdPlaceHolder,
      submit,
    } = renderRequestSectionContent;

    let selectedVisibilityName;
    if (selectedVisibility) {
      selectedVisibilityName =
        renderRequestSectionContent[`${selectedVisibility}_`];
    }

    let selectedCategoryName;
    if (selectedCategory) {
      selectedCategoryName = youtubeCategories.filter(
        (eachItem) => eachItem.id === Number(selectedCategory)
      )[0].category;
    }

    return (
      <RequestSectionContainer>
        <Heading ratio={fsr}>{heading}: </Heading>
        <RequestForm onSubmit={this.handleSubmit} encType="multipart/form-data">
          <MediaFilesContainer>
            <MediaContainer>
              {videoUrl ? (
                <FileUpdateSection>
                  <StyledFileReplaceIcon
                    onClick={() => {
                      document.getElementById("video").click(); // Trigger the file input click when the card is clicked
                    }}
                  />

                  <MyFile controls preload="auto">
                    <source src={videoUrl} type="video/mp4" />
                    {myFileText}
                  </MyFile>
                </FileUpdateSection>
              ) : (
                <PreviewCard
                  onClick={() => {
                    document.getElementById("video").click(); // Trigger the file input click when the card is clicked
                  }}
                  error={titleError}
                >
                  <UploadIcon>
                    <IoVideocamOutline />
                  </UploadIcon>

                  <UploadText ratio={fsr}>{uploadVideoText}</UploadText>
                </PreviewCard>
              )}
              <ErrorMessage>{videoError}</ErrorMessage>
              <FileButton
                type="file"
                name="video"
                id="video"
                accept="video/mp4"
                onChange={this.onChangeVideo}
                hidden
              />
            </MediaContainer>
            <MediaContainer>
              {thumbnailUrl ? (
                <FileUpdateSection>
                  <StyledFileReplaceIcon
                    onClick={() => {
                      document.getElementById("thumbnail").click(); // Trigger the file input click when the card is clicked
                    }}
                  />

                  <MyFile alt="thumbnail-prev" as="img" src={thumbnailUrl} />
                </FileUpdateSection>
              ) : (
                <PreviewCard
                  className="myFile preview-card"
                  onClick={() => {
                    document.getElementById("thumbnail").click(); // Trigger the file input click when the card is clicked
                  }}
                  error={thumbnailError}
                >
                  <UploadIcon>
                    <IoImageOutline />
                  </UploadIcon>

                  <UploadText ratio={fsr}>{uploadThumbnailText}</UploadText>
                </PreviewCard>
              )}
              <ErrorMessage>{thumbnailError}</ErrorMessage>
              <FileButton
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/jpeg, image/png"
                onChange={this.onChangeThumbnail}
                hidden
              />
            </MediaContainer>
          </MediaFilesContainer>
          <InputContainer focused={titleFocused} error={titleError !== ""}>
            <TitleLabel
              htmlFor="title"
              ratio={fsr}
              focused={titleFocused}
              error={titleError !== ""}
            >
              {title_}
            </TitleLabel>
            <TitleTextArea
              name="title"
              id="title"
              maxLength={100}
              value={videoTitle}
              onChange={this.onChangeTitle}
              rows={1} /* Starting with a single row */
              onInput={(e) => {
                // Adjust the height of the textarea to fit the content
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder={titlePlaceHolder}
              onFocus={this.onTitleFocus}
              onBlur={this.onTitleBlur}
              ratio={fsr}
            />
            <CharCount ratio={fsr}>{videoTitle.length}/100</CharCount>
          </InputContainer>
          <ErrorMessage>{titleError}</ErrorMessage>
          <InputContainer
            focused={descriptionFocused}
            error={descriptionError !== ""}
          >
            <DescriptionLabel
              htmlFor="description"
              ratio={fsr}
              focused={descriptionFocused}
              error={descriptionError !== ""}
            >
              {description_}
            </DescriptionLabel>
            <DescriptionTextArea
              name="description"
              id="description"
              maxLength={5000}
              value={videoDescription}
              onChange={this.onChangeDescription}
              rows={1} /* Start with a single row */
              onInput={(e) => {
                // Adjust the height of the textarea to fit the content
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder={descriptionPlaceHolder}
              onFocus={this.onDescriptionFocus}
              onBlur={this.onDescriptionBlur}
              ratio={fsr}
            />
            <CharCount ratio={fsr}>{videoDescription.length}/5000</CharCount>
          </InputContainer>
          <ErrorMessage>{descriptionError}</ErrorMessage>
          <FormElementsContainer>
            <FormElementContainer>
              <FormElementHeading ratio={fsr}>{audience_}</FormElementHeading>
              <AudienceType ratio={fsr}>
                <AudienceTypeRadio
                  type="radio"
                  name="audience"
                  value="yes"
                  onChange={this.removeAudienceError}
                />
                {madeForKids}
              </AudienceType>
              <AudienceType ratio={fsr}>
                <AudienceTypeRadio
                  type="radio"
                  name="audience"
                  value="no"
                  onChange={this.removeAudienceError}
                />
                {notMadeForKids}
              </AudienceType>
              <ErrorMessage>{audienceError}</ErrorMessage>
            </FormElementContainer>

            <FormElementContainer>
              <FormElementHeading htmlFor="status" ratio={fsr}>
                {visibility_}:
              </FormElementHeading>
              <FormElementSelect
                id="status"
                value={selectedVisibility}
                onClick={this.toggleVisibilityContainer}
              >
                {selectedVisibility ? selectedVisibilityName : selectVisibility}
                <StyledDropDown rotate={showVisibilityContainer} />
              </FormElementSelect>
              <FormElementSelectOptionsContainer show={showVisibilityContainer}>
                <FormElementSelectOption
                  data-value="public"
                  onClick={this.onUpdateSelectedVisibility}
                >
                  {public_}
                </FormElementSelectOption>
                <FormElementSelectOption
                  data-value="private"
                  onClick={this.onUpdateSelectedVisibility}
                >
                  {private_}
                </FormElementSelectOption>
              </FormElementSelectOptionsContainer>
              <input
                type="hidden"
                name="privacy_status"
                id="input-status"
                value={selectedVisibility}
              />
              <ErrorMessage>{visibilityError}</ErrorMessage>
            </FormElementContainer>
            <FormElementContainer>
              <FormElementHeading as="label" htmlFor="category" ratio={fsr}>
                {category}:
              </FormElementHeading>
              <FormElementSelect
                id="category"
                value={selectedCategory}
                onClick={this.toggleCategoriesContainer}
              >
                {selectedCategory ? selectedCategoryName : selectCategory}
                <StyledDropDown rotate={showCategoriesContainer} />
              </FormElementSelect>
              <FormElementSelectOptionsContainer
                show={showCategoriesContainer}
                category
              >
                {youtubeCategories.map((eachItem) => (
                  <FormElementSelectOption
                    key={eachItem.id}
                    data-value={eachItem.id}
                    onClick={this.onUpdateSelectedCategory}
                  >
                    {eachItem.category}
                  </FormElementSelectOption>
                ))}
              </FormElementSelectOptionsContainer>
              <input
                type="hidden"
                name="category_id"
                id="input-category"
                value={selectedCategory}
              />
              <ErrorMessage>{categoryError}</ErrorMessage>
            </FormElementContainer>
          </FormElementsContainer>
          <FormElementContainer creatorCode>
            <FormElementHeading htmlFor="creator" ratio={fsr}>
              {creatorInvitationCode}:
            </FormElementHeading>
            <InputCreator
              id="creator"
              name="creator_invitation_code"
              type="text"
              placeholder={creatorIdPlaceHolder}
              onBlur={this.onCreatorInvitationCodeInputBlur}
              onChange={this.onChangeCreatorInvitationCode}
              ratio={fsr}
            />
            <ErrorMessage>{invitationError}</ErrorMessage>
          </FormElementContainer>

          <Button type="submit" submit ratio={fsr}>
            {submit}
          </Button>
        </RequestForm>
      </RequestSectionContainer>
    );
  };

  render() {
    const { responseStatus } = this.state;

    return (
      <LanguageAndAccessibilityContext.Consumer>
        {(value) => {
          const { activeLanguage, fontSizeRatio, showInGray } = value;
          const fsr = fontSizeRatio;

          const {
            renderLoadingContent,
            renderSubmitMessageContent,
            renderRequestSectionContent,
          } = getSectionData(requestSectionContent, activeLanguage);
          const youtubeCategories = getSectionData(
            youtubeCategoriesContainer,
            activeLanguage
          );

          return (
            <div className={`bg-container ${showInGray && "show-in-gray"}`}>
              <Header ratio={fsr} />
              <div className="main-container">
                {responseStatus === 200 ||
                responseStatus === 400 ||
                responseStatus === 500
                  ? this.renderSubmitMessage(renderSubmitMessageContent, fsr)
                  : responseStatus === "IN_PROGRESS"
                  ? this.renderLoading(renderLoadingContent, fsr)
                  : this.renderRequestSection(
                      renderRequestSectionContent,
                      youtubeCategories,
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

export default RequestSection;
