import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import AccessibilitySection from "../AccessibilitySection";
import {
  HeaderContainer,
  ProxyLogo,
  HeaderList,
  HeaderItem,
  LoginMenuLogo,
  MenuContainer,
  MenuItem,
  MenuCloseIcon,
  AnchorTag,
  SignInButton,
  SignInUserImg,
  LoginContainer,
  UpperDescription,
  MainDescription,
  LowerDescription,
  StyledAnchorTag,
  StyledArrow,
  GetStartedButton,
} from "./styledComponents";
import { loginSectionContent } from "./languageContent";
import { getSectionData } from "../Header/languageContent";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true,
      showMenuContainer: false,
    };
  }

  componentDidMount() {
    this.checkAuthStatus();
  }

  checkAuthStatus = async () => {
    try {
      const response = await fetch(
        "https://youtube-jwt-proxy.onrender.com/oauth/status",
        {
          method: "GET",
          credentials: "include", // Include cookies with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.setState({
          isAuthenticated: data.authenticated,
          loading: false,
        });
      } else {
        console.log(response.statusText);
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      this.setState({
        loading: false,
      });
    }
  };

  onToggleMenuContainer = () => {
    this.setState((prevState) => ({
      showMenuContainer: !prevState.showMenuContainer,
    }));
  };

  onCloseMenuContainer = () => {
    this.setState({
      showMenuContainer: false,
    });
  };

  renderLoading = () => {
    return (
      <div className="request-section loading-section">
        <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    );
  };

  renderLoginSection = (activeLanguage, fsr, sUl) => {
    const { showMenuContainer } = this.state;
    const { upperDescription, mainDescription, lowerDescription, headerItems } =
      getSectionData(loginSectionContent, activeLanguage);
    const { about, contact, signIn } = headerItems;
    return (
      <>
        <HeaderContainer>
          <ProxyLogo
            alt="proxy-logo"
            src="https://res.cloudinary.com/drbnxuf21/image/upload/v1721970847/b8lpaayftkzohhgrs6cl.png"
          />

          <HeaderList className="header-list">
            <HeaderItem about ratio={fsr}>
              {about}
            </HeaderItem>
            <HeaderItem contact ratio={fsr}>
              {contact}
            </HeaderItem>
            <HeaderItem ratio={fsr}>
              <AnchorTag
                href="https://youtube-jwt-proxy.onrender.com/oauth/google"
                sUl={sUl}
              >
                <SignInButton className="sign-in-button" outline ratio={fsr}>
                  <SignInUserImg />
                  {signIn}
                </SignInButton>
              </AnchorTag>
            </HeaderItem>
            <HeaderItem menu>
              <LoginMenuLogo onClick={this.onToggleMenuContainer} />

              <MenuContainer show={showMenuContainer} ratio={fsr}>
                <MenuItem className="menu-item menu-sign-in-item">
                  <a href="https://youtube-jwt-proxy.onrender.com/oauth/google">
                    <SignInButton className="sign-in-button">
                      {signIn}
                    </SignInButton>
                  </a>
                  <MenuCloseIcon onClick={this.onCloseMenuContainer} />
                </MenuItem>
                <MenuItem>{about}</MenuItem>
                <MenuItem>{contact} </MenuItem>
              </MenuContainer>
            </HeaderItem>
          </HeaderList>
        </HeaderContainer>
        <div className="main-container">
          <LoginContainer>
            <UpperDescription ratio={fsr}>{upperDescription}</UpperDescription>
            <MainDescription ratio={fsr}>{mainDescription}</MainDescription>
            <LowerDescription ratio={fsr}>{lowerDescription}</LowerDescription>

            <StyledAnchorTag
              href={`https://youtube-jwt-proxy.onrender.com/oauth/google`}
            >
              <GetStartedButton ratio={fsr}>
                Get Started <StyledArrow />
              </GetStartedButton>
            </StyledAnchorTag>
          </LoginContainer>
        </div>
      </>
    );
  };

  render() {
    const { isAuthenticated, loading } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

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

          return (
            <div className={`${showInGray && "show-in-gray"} bg-container`}>
              {loading
                ? this.renderLoading()
                : this.renderLoginSection(activeLanguage, fsr, sUl)}
              <AccessibilitySection />
            </div>
          );
        }}
      </LanguageAndAccessibilityContext.Consumer>
    );
  }
}

export default withRouter(Login);
