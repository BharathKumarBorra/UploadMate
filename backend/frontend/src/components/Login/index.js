import { Component } from "react";
import { Redirect } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Footer from "../Footer";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import AccessibilitySection from "../AccessibilitySection";
import {
  LoginContainer,
  HeaderContainer,
  ProxyLogo,
  ProxyName,
  HeaderList,
  HeaderItem,
  AnchorTag,
  SignInButton,
  SignInUserImg,
  LoginMainContainer,
  UpperDescription,
  MainDescription,
  LowerDescription,
  StyledAnchorTag,
  StyledArrow,
  GetStartedButton,
  ContentWrapper,
  FooterWrapper,
} from "./styledComponents";
import { loginSectionContent } from "./languageContent";
import { getSectionData } from "../Header/languageContent";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.checkAuthStatus();
  }

  checkAuthStatus = async () => {
    try {
      const response = await fetch(
        `https://youtube-proxy1.onrender.com/oauth/status`,
        {
          method: "GET",
          credentials: "include", // Include cookies with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          isAuthenticated: data.authenticated,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  renderLoading = () => {
    return (
      <div className="request-section loading-section">
        <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    );
  };

  renderLoginSection = (activeLanguage, fsr, sUl) => {
    const { upperDescription, mainDescription, lowerDescription, headerItems } =
      getSectionData(loginSectionContent, activeLanguage);
    const { signIn } = headerItems;
    return (
      <LoginContainer>
        <HeaderContainer>
          <StyledAnchorTag href="https://youtube-proxy1.onrender.com">
            <ProxyLogo
              alt="proxy-logo"
              src="https://res.cloudinary.com/drbnxuf21/image/upload/v1724861187/yjyhndpczwgeln8rounu.png"
            />
            <ProxyName>Proxy</ProxyName>
          </StyledAnchorTag>

          <HeaderList className="header-list">
            <HeaderItem ratio={fsr}>
              <AnchorTag
                href="https://youtube-proxy1.onrender.com/oauth/google"
                sUl={sUl}
              >
                <SignInButton className="sign-in-button" outline ratio={fsr}>
                  <SignInUserImg />
                  {signIn}
                </SignInButton>
              </AnchorTag>
            </HeaderItem>
          </HeaderList>
        </HeaderContainer>

        <LoginMainContainer>
          <ContentWrapper>
            <UpperDescription ratio={fsr}>{upperDescription}</UpperDescription>
            <MainDescription ratio={fsr}>{mainDescription}</MainDescription>
            <LowerDescription ratio={fsr}>{lowerDescription}</LowerDescription>

            <StyledAnchorTag href="https://youtube-proxy1.onrender.com/oauth/google">
              <GetStartedButton ratio={fsr}>
                Get Started <StyledArrow />
              </GetStartedButton>
            </StyledAnchorTag>
          </ContentWrapper>

          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </LoginMainContainer>
      </LoginContainer>
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

export default Login;
