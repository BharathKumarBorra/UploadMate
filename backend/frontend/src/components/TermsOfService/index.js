import { Link } from "react-router-dom";
import {
  TOSContainer,
  TOSHeader,
  ProxyLogo,
  ProxyName,
  Home,
  TOSMainContainer,
  Heading,
  Para,
  ParaList,
  ParaPoint,
} from "./styledComponents";

const TermsOfService = () => {
  return (
    <TOSContainer>
      <TOSHeader>
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
      </TOSHeader>

      <TOSMainContainer>
        <Heading mainHeading>Terms of Service</Heading>

        <Heading subHeading>1. Acceptance of Terms</Heading>
        <ParaList>
          <Para>
            By accessing or using Youtube Proxy (the "Service"), you agree to
            comply with and be bound by these Terms of Service (the "Terms"). If
            you do not agree to these Terms, please do not use the Service.
          </Para>
        </ParaList>
        <Heading subHeading>2. Changes to Terms</Heading>
        <ParaList>
          <Para>
            We reserve the right to update or modify these Terms at any time.
            Any changes will be effective immediately upon posting on this page.
            Your continued use of the Service after any changes constitutes
            acceptance of those changes.
          </Para>

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
        <Heading subHeading>3. Use of Service</Heading>
        <ParaList>
          <Para>
            You agree to use the Service only for lawful purposes and in
            accordance with these Terms. You shall not:
          </Para>

          <ParaPoint>
            <Para>Violate any applicable laws or regulations.</Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              Engage in any activity that could harm, disable, or impair the
              Service or interfere with other users' access to the Service.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              Use the Service to transmit or distribute any malicious software,
              spam, or other harmful content.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              Attempt to gain unauthorized access to any portion of the Service
              or its related systems.
            </Para>
          </ParaPoint>
        </ParaList>

        <Heading subHeading>4. User Accounts</Heading>
        <ParaList>
          <Para>
            To use certain features of the Service, you may need to create an
            account. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under
            your account. You agree to notify us immediately of any unauthorized
            use of your account.
          </Para>
        </ParaList>
        <Heading subHeading>5. Content</Heading>
        <ParaList>
          <ParaPoint>
            <Para>
              <Heading pointHeading>User Content:</Heading> You retain ownership
              of any content you post on the Service. By posting content, you
              grant us a worldwide, non-exclusive, royalty-free license to use,
              reproduce, and display your content in connection with the
              Service.
            </Para>
          </ParaPoint>
          <ParaPoint>
            <Para>
              <Heading pointHeading>Prohibited Content:</Heading> You may not
              post content that is illegal, defamatory, obscene, or otherwise
              objectionable.
            </Para>
          </ParaPoint>
        </ParaList>

        <Heading subHeading>6. Intellectual Property</Heading>
        <ParaList>
          <Para>
            All content and materials provided through the Service, including
            but not limited to text, graphics, logos, and software, are the
            property of [Your Company Name] or its licensors and are protected
            by intellectual property laws. You may not use, reproduce, or
            distribute any such content without our prior written permission.
          </Para>
        </ParaList>

        <Heading subHeading>7. Disclaimers and Limitation of Liability</Heading>
        <ParaList>
          <Para>
            The Service is provided "as is" and "as available" without any
            warranties of any kind, whether express or implied. We do not
            warrant that the Service will be error-free or uninterrupted.
          </Para>
          <Para>
            In no event shall [Your Company Name] be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss
            of profits or data, arising from your use of the Service.
          </Para>
        </ParaList>

        <Heading subHeading>8. Indemnification</Heading>
        <ParaList>
          <Para>
            You agree to indemnify and hold harmless [Your Company Name], its
            affiliates, officers, directors, employees, and agents from any
            claims, liabilities, damages, losses, and expenses arising out of or
            in connection with your use of the Service or any violation of these
            Terms.
          </Para>
        </ParaList>
        <Heading subHeading>9. Termination</Heading>
        <ParaList>
          <Para>
            We reserve the right to suspend or terminate your access to the
            Service at any time, with or without cause, and with or without
            notice. Upon termination, these Terms will still apply to any
            obligations or liabilities incurred before the termination.
          </Para>
        </ParaList>
        <Heading subHeading>10. Governing Law and Dispute Resolution</Heading>
        <ParaList>
          <Para>
            These Terms are governed by and construed in accordance with the
            laws of India, without regard to its conflict of law principles.
          </Para>
          <Para>
            If you are a user located outside of India, you agree that any
            disputes arising from or related to these Terms will be subject to
            the exclusive jurisdiction of the courts in India. By using our
            services, you consent to the jurisdiction and venue of such courts,
            and you waive any objections based on venue or inconvenient forum.
          </Para>
        </ParaList>

        <Heading subHeading>11. Contact Us</Heading>
        <ParaList>
          <Para>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:youtubeproxy@gmail.com">youtubeproxy@gmail.com</a>.
          </Para>
        </ParaList>
      </TOSMainContainer>
    </TOSContainer>
  );
};

export default TermsOfService;
