import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import AccessibilitySection from "../AccessibilitySection";
import Header from "../Header";
import {
  HomeContainer,
  UpperDescription,
  MainDescription,
  LowerDescription,
  StyledLink,
  GetStartedButton,
  StyledArrow,
} from "./styledComponents";
import { homeSectionContent } from "./languageContent";
import { getSectionData } from "../Header/languageContent";

const Home = () => {
  return (
    <LanguageAndAccessibilityContext.Consumer>
      {(value) => {
        const { activeLanguage, fontSizeRatio, showInGray } = value;
        const fsr = fontSizeRatio;
        console.log("home section Ratio: ", fontSizeRatio);
        const {
          upperDescription,
          mainDescription,
          lowerDescription,
        } = getSectionData(homeSectionContent, activeLanguage);

        return (
          <div className={`${showInGray && "show-in-gray"} bg-container`}>
            <div className="main-container">
              <Header ratio={fsr} />

              <HomeContainer>
                <UpperDescription ratio={fsr}>
                  {upperDescription}
                </UpperDescription>

                <MainDescription ratio={fsr}>{mainDescription}</MainDescription>

                <LowerDescription ratio={fsr}>
                  {lowerDescription}
                </LowerDescription>
                <StyledLink to="/request_section">
                  <GetStartedButton ratio={fsr}>
                    Get Started <StyledArrow />
                  </GetStartedButton>
                </StyledLink>
              </HomeContainer>
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
};

export default Home;
