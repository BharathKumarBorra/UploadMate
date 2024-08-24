import { Component } from "react";
import LanguageAndAccessibilityContext from "../../context/languageAndAccessibilityContext";
import {
  AccessibilityCardContainer,
  AccessibilityImg,
  CloseIcon,
  AccessibilityCard,
  AccessibilityCardElement,
} from "./styledComponents";
import { accessibilitySectionContent } from "./languageContent";
import { getSectionData } from "../Header/languageContent";

class AccessibilitySection extends Component {
  state = {
    showAccessibilityCard: false,
  };

  toggleAccessibilityCard = () => {
    this.setState((prevState) => ({
      showAccessibilityCard: !prevState.showAccessibilityCard,
    }));
  };

  render() {
    const { showAccessibilityCard } = this.state;

    return (
      <LanguageAndAccessibilityContext.Consumer>
        {(value) => {
          const {
            activeLanguage,
            fontSizeRatio: fsr,
            showInGray,
            increaseRatio,
            decreaseRatio,
            toggleGrayScale,
            showUnderLines,
            toggleUnderLines,
            resetSettings,
          } = value;
          console.log(fsr);
          const {
            increaseText,
            decreaseText,
            removeGrayscale,
            grayScale,
            removeUnderlines,
            showUnderlines,
            resetSettings_,
          } = getSectionData(accessibilitySectionContent, activeLanguage);

          const onIncreaseRatio = () => {
            increaseRatio();
          };

          const onDecreaseRatio = () => {
            decreaseRatio();
          };

          const onToggleGrayScale = () => {
            toggleGrayScale();
          };

          const onToggleUnderLines = () => {
            toggleUnderLines();
          };

          const onResetSettings = () => {
            resetSettings();
          };

          return (
            <AccessibilityCardContainer show={showAccessibilityCard}>
              {showAccessibilityCard ? (
                <CloseIcon onClick={this.toggleAccessibilityCard} />
              ) : (
                <AccessibilityImg onClick={this.toggleAccessibilityCard} />
              )}

              <AccessibilityCard show={showAccessibilityCard} ratio={fsr}>
                <AccessibilityCardElement onClick={onIncreaseRatio}>
                  {increaseText}
                </AccessibilityCardElement>
                <AccessibilityCardElement onClick={onDecreaseRatio}>
                  {decreaseText}
                </AccessibilityCardElement>
                <AccessibilityCardElement onClick={onToggleGrayScale}>
                  {showInGray ? removeGrayscale : grayScale}
                </AccessibilityCardElement>
                <AccessibilityCardElement onClick={onToggleUnderLines}>
                  {showUnderLines ? removeUnderlines : showUnderlines}
                </AccessibilityCardElement>
                <AccessibilityCardElement onClick={onResetSettings}>
                  {resetSettings_}
                </AccessibilityCardElement>
              </AccessibilityCard>
            </AccessibilityCardContainer>
          );
        }}
      </LanguageAndAccessibilityContext.Consumer>
    );
  }
}

export default AccessibilitySection;
