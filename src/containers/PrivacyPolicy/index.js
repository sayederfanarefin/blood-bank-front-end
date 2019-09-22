// @flow
import React, { Component } from 'react';
import { updateDocTitle } from "helpers/htmlHelper";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

import AuthWrapper from '../Auth';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
  classes: Object
}

type State = {
  cardAnimaton: string
}

@withStyles(registerPageStyle)
export default class PrivacyPolicy extends Component<Props, State> {
  state = {
    cardAnimaton: "cardHidden"
  }

  componentWillMount() {
    // Update page title
    updateDocTitle('Privacy Policy');
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      () => {
        this.setState({ cardAnimaton: "cardSignup" })
      },
      0
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render() {
    const { classes } = this.props;

    return (
      <ErrorCatcher>
        <AuthWrapper pageTitle="Privacy Policy">
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes[this.state.cardAnimaton]} style={{paddingTop: 0}}>
                  <h3 style={{ textAlign: 'center' }}>
                    Privacy Policy
                  </h3>
                  <small style={{ textAlign: 'center' }}>EFFECTIVE DATE: MAY 21, 2016</small>
                  <CardBody>

                    <p>This policy describes our privacy practices and covers how we handle the information we collect when you visit and use our sites, services, mobile applications, products, and content (collectively, our "Services"), in existence now or in the future. Please take a moment to familiarize yourself with it.</p>
                    
                    <h5>What we may collect</h5>
                    <p>We collect information about things you do and content you provide when you use our Services, including information on pages you access or visit (such as frequency and duration of your activities), how you use our Services (such as types of content you view or engage with), information about your device (such as device type, location, IP address), information volunteered by you (such as registration or modifying your account), the content you provide (such as location and date of a photo), the websites that referred you to us (such as the URL), and information of those who communicate with us (such as email address). </p>
                    <p>We collect information about things others do and content they provide when they use our Services, including information about you (such as when they share a photo of you). </p>
                    <p>We collect information about your connections (such as who and how you interact with them), and contact information you provide us (such as importing an address book).</p>
                    <p>We collect information about you from third-party partners when you authenticate via a third-party (such as Facebook), we may collect, store, and periodically update the contact lists associated with that third-party account, so that we can make it easy for you to connect with your existing contacts from that service who are also using our Services. </p>
                    <p>We collect information about advertising and related products you have viewed (such as interest type or category of content the ad includes and activity related to the ad), which makes it possible to provide free Services to users.</p>

                    <h5>Email communications with us</h5>
                    <p>We may periodically email you some administrative communications, such as to tell you something important about your account, updates to our Services, or changes to our policies. These administrative communications are considered a basic part of our Services, and you may not be able to opt out from receiving them. You can opt out of non-administrative emails. </p>
                    <p>If you send us a request (such as a support email), we reserve the right to access and transmit your personal information as is reasonably necessary for us to provide our Services to you. </p>
                    <p>We will never email you to ask for your password or other account information. If you receive such an email, send it to us so we can investigate.</p>

                    <h5>Disclosure of your information</h5>
                    <p>The information we collect is used to provide, maintain, protect and improve our Services and content. We also use this information to offer you tailored content such as giving you more relevant ads and search results. We don’t sell personal information about our users to any third party.</p>
                    <p>When you share and communicate using our Services, you can choose the audience who can see what you share, including: (1) “Public” is available to anyone on or off our Services and can be seen or accessed through things such as online search engines; (2) “Followers” is available to anyone that is following you, you can choose to manually approve each follower; (3) “Passengers” is available to all passengers on your trip. </p>
                    <p>We may access, preserve and share your personal information with third parties in limited circumstances, including: (1) those contractors and affiliated organizations that need to process or provide services on our behalf; or (2) when we have a good faith belief to do so by law, such as pursuant to a subpoena, search warrant or court order; or (3) when we have a good faith belief to do so to protect ourselves, you and others, including as part of investigations or to prevent fraud and abuse. </p>
                    <p>If the ownership or control of all or part of our Services or their assets changes, we may transfer your information to the new owner. If your information becomes subject to a different privacy policy, we’ll notify you so you have the opportunity to review the revised policy before continuing to use our Services.</p>

                    <h5>Public user content</h5>
                    <p>Keemut.com is meant for posting and sharing public, not private, content. Although we do provide tools to change who sees your content, items you share through our Services may default to 'Public', so you should assume that any content you provide us may become publicly accessible.</p>
                    <p>In some cases, people you share and communicate with may download or re-share this content with others on and off our Services, which means that everyone, including search engines, will be able to see it, so you should assume that any content you provide us may become publicly accessible. </p>
                    <p>Other people may use our Services to share content about you with the audience they choose (such as a photo of you, mention or tag you at the location of a place). </p>
                    <p>You are free to remove published content from your account, or even disable your account entirely. However, because of the fundamentally open nature of the Internet, the strong possibility that others will comment on or embed your content, and technological limitations inherent to our Services, copies of your content may exist elsewhere indefinitely, including in our systems. Keep in mind that information that others have shared about you is not part of your account and will not be deleted when you deactivate your account. </p>
                    <p>We may share non-personally identifiable information publicly and with our partners (such as publishers, advertisers, or connected sites), about how our Services are used (such as to show trends and effectiveness of their advertising).</p>

                    <h5>Cookies</h5>
                    <p>A cookie is a small data file that contains a piece of text, which often includes an anonymous unique identifier, sent to and saved by your web browser when you access a website. We use cookies and similar technologies to enable our servers to uniquely identify your browser and tell us how and when you use our Services, and we may associate that information with your account if you have one. This information is sometimes used to personalize your experiences on our Services when you are logged in. To measure the deliverability of our emails to users, we may embed information in them, such as a web beacon or tag. </p>
                    <p>Most browsers have an option for disabling cookies, but if you disable them you won’t be able to log into your Keemut.com account, and won’t be able to use the vast majority of our Services. </p>
                    <p>This Privacy Policy covers our use of cookies only and not the use of cookies by third parties.</p>
                    
                    <h5>Log data storage</h5>
                    <p>When you interact with our Services, we collect server logs, which may include information like access dates and times of your web request, IP address, browser type, cookies that may uniquely identify your browser, and referral URL. </p>
                    <p>We use third-party vendors and hosting partners, such as Amazon, to provide the necessary hardware, software, networking, storage, and related technology we need to run our Services. Although we own our code, databases, and all rights to our application, you retain ownership of your content.</p>

                    <h5>Modifying your personal information or deactivating your account</h5>
                    <p>If you are a registered user, you can access or modify your personal information, security, notifications, privacy, or deactivate your account in the ‘ Settings’ section of your account. </p>
                    <p>If you deactivate your account, we will remove your public posts from view and/or dissociate them from your account profile, but we may retain information about you for the purposes authorized under this Privacy Policy unless prohibited by law. You can reactivate your account at any time by logging back in. </p>
                    <p>We aim to maintain our services in a manner that protects information from accidental or malicious destruction. This means that after you delete information from our services, we may not immediately delete residual copies from our active servers and may not remove information from our backup systems.</p>
                    
                    <h5>Data security</h5>
                    <p>We use encryption (HTTPS/TLS) to protect data transmitted to and from our site. However, no method of data transmission over the Internet or via mobile device, or method of electronic storage, is 100% secure, so we can’t guarantee its absolute security. You use our Service at your own risk, and you are responsible for taking reasonable measures to secure your account (such as keeping your password confidential, and limiting access to your device and browser by signing off after you have finished accessing your account).</p>
                    
                    <h5>Children</h5>
                    <p>Our Services are intended for general audiences and are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information without parental consent, please contact us here. If we learn that a child under 13 has provided us with personal information without parental consent, we take steps to remove such information and terminate the child’s account.</p>
                    
                    <h5>Modifications to this Policy</h5>
                    <p>We will notify you about material changes in the way we treat personal information by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site before the effective date of the changes.</p>
                    
                    <h5>Questions</h5>
                    <p>We welcome questions, concerns, and feedback about this policy. If you have any suggestions for us, feel free to let us know here.</p>

                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </AuthWrapper>
      </ErrorCatcher>
    );
  }
}