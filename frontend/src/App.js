import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import EditorSection from "./components/EditorSection";
import CreatorSection from "./components/CreatorSection";
import CreatorRequestDetails from "./components/CreatorRequestDetails";
import EditorRequestDetails from "./components/EditorRequestDetails";
import RequestSection from "./components/RequestSection";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LanguageAndAccessibilityContext from "./context/languageAndAccessibilityContext";
import { toast } from "react-toastify";
import "./App.css";

class App extends Component {
  state = {
    activeLanguage: "EN",
    fontSizeRatio: 1,
    showInGray: false,
    showUnderLines: false,
  };

  changeLanguage = (newLanguage) => {
    this.setState({
      activeLanguage: newLanguage,
    });
  };

  increaseRatio = () => {
    const { fontSizeRatio } = this.state;
    if (fontSizeRatio <= 1.3) {
      this.setState((prevState) => ({
        fontSizeRatio: prevState.fontSizeRatio + 0.15,
      }));
    } else {
      return toast.warn("Maximum size reached");
    }
  };

  decreaseRatio = () => {
    const { fontSizeRatio } = this.state;
    if (fontSizeRatio >= 0.7) {
      this.setState((prevState) => ({
        fontSizeRatio: prevState.fontSizeRatio - 0.15,
      }));
    } else {
      return toast.warn("Minimum size reached");
    }
  };

  toggleGrayScale = () => {
    this.setState((prevState) => ({
      showInGray: !prevState.showInGray,
    }));
  };

  toggleUnderLines = () => {
    this.setState((prevState) => ({
      showUnderLines: !prevState.showUnderLines,
    }));
  };

  render() {
    const { activeLanguage, fontSizeRatio, showInGray, showUnderLines } = this.state;
    return (
      <LanguageAndAccessibilityContext.Provider
        value={{
          activeLanguage,
          fontSizeRatio,
          showInGray,
          showUnderLines,
          changeLanguage: this.changeLanguage,
          increaseRatio: this.increaseRatio,
          decreaseRatio: this.decreaseRatio,
          toggleGrayScale: this.toggleGrayScale,
          toggleUnderLines: this.toggleUnderLines,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/requests" component={RequestSection} />
            <ProtectedRoute exact path="/editor" component={EditorSection} />
            <ProtectedRoute exact path="/creator" component={CreatorSection} />
            <ProtectedRoute exact path="/request/:id" component={CreatorRequestDetails} />
            <ProtectedRoute exact path="/request/:id/editor" component={EditorRequestDetails} />
          </Switch>
        </BrowserRouter>
      </LanguageAndAccessibilityContext.Provider>
    );
  }
}

export default App;
