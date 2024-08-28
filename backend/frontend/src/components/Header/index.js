import { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import { IoMdClose } from "react-icons/io";
import {
  HeaderContainer,
  ProxyLogo,
  ProxyName,
  HeaderList,
  HeaderItem,
  StyledLink,
  SelectLanguage,
  LanguageContainer,
  LanguageItem,
  MenuLogo,
  HeaderUserImage,
  MenuContainer,
  MenuItem,
  MenuUserItem,
  MenuUserImage,
  MenuUserName,
  MenuCloseIcon,
  StyledDropDown,
  Languages,
  SelectedMark,
  InvitationCard,
  InvitationCode,
  CopyImgContainer,
  StyledCopyImg,
} from "./styledComponents";
import { headerSectionContent, getSectionData } from "./languageContent";

const languagesList = [
  { language: "عربي", code: "AR" },
  { language: "বাংলা", code: "BN" },
  { language: "中國人", code: "ZH" },
  { language: "English", code: "EN" },
  { language: "Français", code: "FR" },
  { language: "हिंदी", code: "HI" },
  { language: "Português", code: "PT" },
  { language: "Русский", code: "RU" },
  { language: "Español", code: "ES" },
  { language: "తెలుగు", code: "TE" },
  { language: "اردو", code: "UR" },
];

const defaultUserImage = "/defaultUserImage.webp";
const proxyLogo = "/proxy_logo.png";

class Header extends Component {
  state = {
    userName: "HELLO! USER",
    userImage: defaultUserImage,
    invitationCode: "",
    copyImgClicked: false,
    showLanguageContainer: "initial",
    showMenuContainer: "initial",
  };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    try {
      const response = await fetch(
        "https://youtube-proxy1.onrender.com/user/details",
        {
          method: "GET",
          credentials: "include", // Include cookies with the request
        }
      );

      if (response.ok) {
        const finalData = await response.json();

        this.setState({
          userImage: finalData.userImage,
          userName: finalData.displayName,
          invitationCode: finalData.invitationCode,
        });
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  onToggleLanguageContainer = () => {
    const { showLanguageContainer } = this.state;
    if (showLanguageContainer === "initial") {
      this.setState({
        showLanguageContainer: true,
      });
    } else {
      this.setState((prevState) => ({
        showLanguageContainer: !prevState.showLanguageContainer,
      }));
    }
  };

  onToggleMenuContainer = () => {
    const { showMenuContainer } = this.state;
    if (showMenuContainer === "initial") {
      this.setState({
        showMenuContainer: true,
      });
    } else {
      this.setState((prevState) => ({
        showMenuContainer: !prevState.showMenuContainer,
      }));
    }
  };

  onCloseMenuContainer = () => {
    this.setState({
      showMenuContainer: false,
    });
  };

  onShowMenuContainer = () => {
    this.setState({
      showMenuContainer: true,
    });
  };

  onLogout = async () => {
    try {
      // Make a request to the backend logout route
      const response = await fetch(
        "https://youtube-proxy1.onrender.com/logout",
        {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        }
      );
      if (response.ok) {
        window.location.href = "/login";
      } else {
        toast.error("unable to logout");
      }
    } catch (error) {
      toast.error("An error occured during logout");
    }
  };

  copyToClipboard = () => {
    const { invitationCode } = this.state;
    navigator.clipboard // navigator.clipboard.writeText() is an api
      .writeText(invitationCode)
      .then(() => toast.success("Invitation Code Copied"))
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  onMouseDown = () => {
    this.setState({
      copyImgClicked: true,
    });
  };

  onMouseUp = () => {
    this.setState({
      copyImgClicked: false,
    });
    this.copyToClipboard();
  };

  render() {
    const {
      userName,
      userImage,
      invitationCode,
      copyImgClicked,
      showLanguageContainer,
      showMenuContainer,
    } = this.state;

    return (
      <LanguageAndAccessibilityContext.Consumer>
        {(value) => {
          const {
            activeLanguage,
            changeLanguage,
            fontSizeRatio: fsr,
            showUnderLines: sUl,
          } = value;

          const { request, home, creator, editor, logout, invCode } =
            getSectionData(headerSectionContent, activeLanguage);
          const selectedLanguage = languagesList.filter(
            (eachItem) => eachItem.code === activeLanguage
          )[0].language;

          return (
            <HeaderContainer>
              <StyledLink to="/" headerItem>
                <ProxyLogo alt="proxy-logo" src={proxyLogo} />
                <ProxyName>Proxy</ProxyName>
              </StyledLink>

              <HeaderList>
                <HeaderItem onClick={this.onToggleLanguageContainer} language>
                  <SelectLanguage ratio={fsr}>
                    <Languages /> {selectedLanguage}{" "}
                    <StyledDropDown
                      rotate={
                        showLanguageContainer === "initial"
                          ? false
                          : showLanguageContainer
                      }
                    />
                  </SelectLanguage>
                  <LanguageContainer show={showLanguageContainer} ratio={fsr}>
                    {languagesList.map((eachItem) => (
                      <LanguageItem
                        key={eachItem.code}
                        value={eachItem.code}
                        onClick={() => {
                          changeLanguage(eachItem.code);
                        }}
                        selected={activeLanguage === eachItem.code}
                      >
                        <SelectedMark show={eachItem.code === activeLanguage} />
                        {eachItem.language}
                      </LanguageItem>
                    ))}
                  </LanguageContainer>
                </HeaderItem>
                <HeaderItem request ratio={fsr}>
                  <StyledLink to="/request_section" sUl={sUl}>
                    {request}
                  </StyledLink>
                </HeaderItem>
                <HeaderItem username ratio={fsr}>
                  {userName}
                </HeaderItem>
                <HeaderItem menu ratio={fsr}>
                  <MenuLogo onClick={this.onShowMenuContainer} />

                  <HeaderUserImage
                    alt="header-user-img"
                    src={userImage ? userImage : defaultUserImage}
                    onClick={this.onToggleMenuContainer}
                  />
                  <MenuContainer show={showMenuContainer} ratio={fsr}>
                    <MenuUserItem ratio={fsr}>
                      <MenuUserImage
                        alt="menu-user-img"
                        src={userImage ? userImage : defaultUserImage}

                        //   onError={(err) => {
                        //     err.currentTarget.src =
                        //       "/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp";
                        //     err.currentTarget.onerror = null;
                        //   }}
                      />

                      <MenuUserName className="menu-user-name">
                        {userName}
                      </MenuUserName>

                      <MenuCloseIcon onClick={this.onCloseMenuContainer}>
                        <IoMdClose />
                      </MenuCloseIcon>
                    </MenuUserItem>
                    <MenuItem>
                      {invCode}
                      <InvitationCard>
                        <InvitationCode>{invitationCode}</InvitationCode>
                        <CopyImgContainer
                          onMouseDown={this.onMouseDown}
                          onMouseUp={this.onMouseUp}
                          clicked={copyImgClicked}
                        >
                          <StyledCopyImg />
                        </CopyImgContainer>
                      </InvitationCard>{" "}
                    </MenuItem>
                    <StyledLink to="/" sUl={sUl}>
                      <MenuItem onClick={this.onCloseMenuContainer}>
                        {home}
                      </MenuItem>
                    </StyledLink>

                    <StyledLink to="/creator_section" sUl={sUl}>
                      <MenuItem onClick={this.onCloseMenuContainer}>
                        {creator}
                      </MenuItem>
                    </StyledLink>

                    <StyledLink to="/editor_section" sUl={sUl}>
                      <MenuItem onClick={this.onCloseMenuContainer}>
                        {editor}
                      </MenuItem>
                    </StyledLink>

                    <StyledLink to="/request_section" sUl={sUl}>
                      <MenuItem onClick={this.onCloseMenuContainer}>
                        {request}
                      </MenuItem>
                    </StyledLink>

                    <MenuItem onClick={this.onLogout}>{logout}</MenuItem>
                  </MenuContainer>
                </HeaderItem>
              </HeaderList>
            </HeaderContainer>
          );
        }}
      </LanguageAndAccessibilityContext.Consumer>
    );
  }
}
export default withRouter(Header);

//before change
