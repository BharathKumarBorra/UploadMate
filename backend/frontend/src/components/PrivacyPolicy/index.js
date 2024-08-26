import { Link } from "react-router-dom";
import {
  PrivacyPolicyContainer,
  PPHeader,
  ProxyLogo,
  ProxyName,
  Home,
  PrivacyPolicyMainContainer,
  Heading,
  Para,
  ParaList,
  ParaPoint,
} from "./styledComponents";

const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyContainer>
      <PPHeader>
        <Link
          to="/"
          style={{
            color: "black",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ProxyLogo
            alt="proxy-logo"
            src="https://res.cloudinary.com/drbnxuf21/image/upload/v1721970847/b8lpaayftkzohhgrs6cl.png"
          />

          <ProxyName> PROXY</ProxyName>
        </Link>

        <Home>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
        </Home>
      </PPHeader>
      <PrivacyPolicyMainContainer>
        <Heading mainHeading>
          Privacy Policy for Youtube Proxy Application
        </Heading>
        <Para>
          Welcome to the YouTube Proxy Application . We are committed to
          protecting your privacy and ensuring that your personal information is
          handled in a safe and responsible manner. This Privacy Policy outlines
          how we collect, use, and safeguard your information when you use our
          application.
        </Para>
        <Heading subHeading>1. Information We Collect</Heading>
        <ParaList>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Personal Information:</Heading> When you log
              in with your Google account, we collect your email address and
              profile information (name, profile picture) to create and manage
              your account within our application.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Video Details:</Heading> When you use our
              application to request a video upload, we collect video details
              such as title, description, category, and other relevant metadata.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Authentication Tokens:</Heading> We securely
              store the access token and refresh token obtained from Google to
              facilitate the video upload process to YouTube on your behalf.
            </Para>
          </ParaPoint>
        </ParaList>
        <Heading subHeading>2. How We Use Your Information</Heading>
        <ParaList>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Account Management:</Heading> We use your
              personal information to create and manage your account, enabling
              you to use our application's features.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Video Upload Requests:</Heading>We use the
              video details you provide to generate video upload requests, which
              are then sent to the respective creators for approval.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Authentication Tokens:</Heading> We use the
              stored authentication tokens to upload videos to YouTube on your
              behalf, with your explicit consent.
            </Para>
          </ParaPoint>
        </ParaList>
        <Heading subHeading>3. Sharing Your Information</Heading>
        <ParaList>
          <Para>
            We do not share your personal information with third parties, except
            in the following cases:
          </Para>

          <ParaPoint>
            <Para>
              <Heading pointHeading>Google API Services:</Heading>We use
              Google's API services to authenticate your account and upload
              videos to YouTube. Your information is shared with Google only to
              the extent necessary to perform these functions.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Legal Requirements:</Heading> We may
              disclose your information if required by law or in response to a
              valid legal request.
            </Para>
          </ParaPoint>
        </ParaList>

        <Heading subHeading>4. Data Security</Heading>
        <ParaList>
          <Para>
            We take the security of your personal information seriously and
            implement industry-standard security measures to protect your data.
            Access tokens and refresh tokens are stored securely and are only
            used for the intended purpose of video uploads.
          </Para>
        </ParaList>
        <Heading subHeading>5. Your Rights</Heading>
        <ParaList>
          <Para>
            You have the right to access, update, or delete your personal
            information at any time. You can also revoke access to your Google
            account through the Google account settings, which will prevent
            further use of our application.
          </Para>
        </ParaList>

        <Heading subHeading>6. Children's Privacy</Heading>
        <ParaList>
          <Para>
            Our application is not intended for children under the age of 13. We
            do not knowingly collect personal information from children. If you
            believe we have inadvertently collected such information, please
            contact us so we can take appropriate action.
          </Para>
        </ParaList>

        <Heading subHeading>7. Changes to This Privacy Policy</Heading>
        <ParaList>
          <Para>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we will notify you of significant
            changes via email or through our application.
          </Para>
        </ParaList>
        <Heading subHeading>8. Contact Us</Heading>
        <ParaList>
          <Para>
            If you have any questions or concerns about this Privacy Policy or
            our practices, please contact us at{" "}
            <a href="mailto:youtubeproxy@gmail.com">youtubeproxy@gmail.com</a>.
          </Para>
        </ParaList>
      </PrivacyPolicyMainContainer>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;
