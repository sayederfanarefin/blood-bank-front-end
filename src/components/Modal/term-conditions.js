import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
    classes: Object,
    onClose: Function
}

const DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500],
    },
  }))(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});


const DialogContent = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);


const DialogActions = withStyles(theme => ({
    root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

export default class TermsConditions extends React.Component<Props> {

    handleClose = () => {
      this.props.onClose();
    };

    render() {
        const { classes, onClose, ...other } = this.props;

        return (
        <Dialog onClose={this.handleClose} aria-labelledby="terms-and-coditions" maxWidth="lg" {...other}>
            <DialogTitle id="terms-and-coditions" style={{textAlign: 'center'}} onClose={this.handleClose}>Terms and Conditions</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>Privacy</Typography>
                <Typography gutterBottom>Last Updated: Feb 7, 2019</Typography> <br />
                
                <Typography gutterBottom>This keemut Privacy Policy (“Privacy Policy”) sets out what information we collect through the websites provided by keemut, how we collect it, and what we do with it. Keemut, FZ LLC (“keemut”, “our”, “we” or “us”) located at 1 Emaar Blvd, Suite 1400, Dubai UAE, is a technology research and development corporation, which develops products and hosts certain forums and websites for visitors (“you” or “your”) with respect to keemut. Keemut is committed to protecting your privacy. Because protecting your privacy is important to us, you may always submit concerns regarding our Privacy Policy or our privacy practices by contacting us by any means provided in the “How to Contact Us” section below. If you choose to write us an email, please reference the Privacy Policy in your subject line. Keemut will attempt to respond to all reasonable concerns and inquiries expeditiously. You may review this privacy policy at any time from the following location: www.keemut.com/privacy</Typography> <br />
                
                <Typography gutterBottom>1. For All Non-US Residents</Typography>
                <Typography gutterBottom>If you are visiting our website or purchasing our products/services from outside of the United States or otherwise contacting us from outside of the United States, please be aware that your personal information may be transferred to, stored or processed in the United Arab Emirates and United States. We use cloud-hosted services that reside in the United Arab using cloud services with data centers around the world. </Typography>
                <Typography gutterBottom>By purchasing our products, or visiting our websites, you consent and understand that your information may be transferred to our facilities and those third parties with whom we share it as described in this Privacy Policy.</Typography> <br />
                
                <Typography gutterBottom>2. You Will Not be Spammed by keemut</Typography>
                <Typography gutterBottom>We may periodically send you email about updates and promotional material. If you no longer want to receive these email communications, you must request that keemut discontinue sending you email by unsubscribing.</Typography> <br />
                
                <Typography gutterBottom>3. The Information We Collect and How We Use It</Typography>
                <Typography gutterBottom>To purchase products or use certain features of our websites, you are required to give us certain contact information (e.g., your full name, physical address, email address, etc.). If you fail to provide certain information, you will be unable to purchase products or access the full functionality of the website.</Typography> <br />
                
                <Typography gutterBottom>a. Aggregated Statistics + Singular Information</Typography>
                <Typography gutterBottom>Data we collect regarding our visitors may be shared with our sponsors, our partners and other third parties on an anonymous singular summary basis or an aggregate basis. Anonymous singular summary information is data that describes the interest profile and demographics data of visitors to the websites without specifically identifying the visitor.</Typography>
                <Typography gutterBottom>Furthermore, we will on occasion aggregate driving data to create algorithms to provide better user experience for our customers. From racing track data to mapping algorithms, we will analyze group data to see if we can parse useful information for our customers.</Typography>
                <Typography gutterBottom>b. Personally Identifiable Information</Typography>
                <Typography gutterBottom>Keemut may provide personally identifiable information to our agents and third parties for, including, without limitation, the following purposes:</Typography> <br />
                
                <Typography gutterBottom>(i) processing of orders made through the websites</Typography>
                <Typography gutterBottom>(ii) the augmentation of visitor information with statistical information available from a third party,</Typography>
                <Typography gutterBottom>(iii) the suppression of contact information from email communications that a visitor has not consented to receiving. We reserve the right to disclose your personally identifiable information as required by law when we believe that disclosure is necessary to protect our rights and/or comply with a judicial proceeding, court order, or legal process served on our website. In the event that keemut goes through a business transition, such as a merger, acquisition by another company, or sale of all or a portion of its assets, you agree that your personally identifiable information may be transferred to such entities. In such cases, we may publish certain details about such event on our websites.</Typography>
                <Typography gutterBottom>Unless you expressly request us delete your personally identifiable information by contacting us by any means provided in the “How to Contact Us” section below, keemut may use and retain the information collected through the websites for as long as necessary to serve the business purposes of keemut in compliance with this policy.</Typography> <br />
                
                <Typography gutterBottom>4. Other Websites</Typography>
                <Typography gutterBottom>Our websites may contain links to other Internet sites that are not operated or controlled by keemut. We cannot control and are not responsible for the privacy practices or the content of such websites.</Typography> <br />
                
                <Typography gutterBottom>5. We are Committed to Data Security</Typography>
                <Typography gutterBottom>Our website have certain commercially reasonable security measures in place to protect against the loss, misuse, and alteration of the information submitted through the website Portal. As with any transmission over the internet; however, there is always some element of risk involved in sending personal information online. Remember to keep your passwords private and secure — you should not share this information with anyone. If you have any questions about the security of our websites or Developer Portal, please contact us through any means as stated in the “How to Contact Us” section below.</Typography> <br />
                
                <Typography gutterBottom>6. We are Committed to Children’s Privacy</Typography>
                <Typography gutterBottom>a. keemut Does Not Seek To Collect From Children Under 13 Years Of Age</Typography>
                <Typography gutterBottom>Keemut takes children’s privacy seriously and we do not seek to collect individually identifiable information about children under 13 years of age. If Keemut learns that a child under the age of 13 has submitted personally identifiable information through the websites, in contravention of these measures, keemut will take all reasonable measures to delete such information from its databases and to not use such information for any purpose.</Typography> <br />
                
                <Typography gutterBottom>7. Changes to the Privacy Policy</Typography>
                <Typography gutterBottom>We reserve the right to update this Privacy Policy from time to time by posting an amended version of the statement to the Keemut website located at: www.keemut.com/privacy Please refer to this policy regularly. If we change how we use your personally identifiable information or update our email practices, we will notify you on the websites or Developer Portal (as applicable), via email or through any other method allowed by applicable law.</Typography> <br />
                
                <Typography gutterBottom>8. How to Contact Us</Typography>
                <Typography gutterBottom>If you have any questions about this privacy statement or your interaction with our websites, you can contact us by email at contact us.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="success">
                I got it
              </Button>
            </DialogActions>
        </Dialog>
        );
    }
}