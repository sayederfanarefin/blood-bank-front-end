// @flow
import React, { Fragment } from "react";
import _ from 'lodash';
import VehicleOption from './vehicleOption';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardText from "components/Card/CardText.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";


// Images of Tesla
import autopilot from "assets/img/badges/autopilot.svg";
import climbing from "assets/img/badges/climbing.svg";
import desert_driver from "assets/img/badges/desert_driver.svg";
import early_adopter from "assets/img/badges/early_adopter.svg";
import first_place from "assets/img/badges/first_place.svg";
import good_battery from "assets/img/badges/good_battery.svg";
// import good_value from "assets/img/badges/good_value.svg";
import high_mileage from "assets/img/badges/high_mileage.svg";
import nightowl from "assets/img/badges/nightowl.svg";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import ErrorCatcher from "components/ErrorCatcher";

const styles = (theme) => ({
    cardTitle,
    pageSubcategoriesTitle: {
      color: "#3C4858",
      textDecoration: "none",
      textAlign: "center"
    },
    cardCategory: {
      margin: "0",
      color: "#999999"
    },
    typo: {
      paddingLeft: "25%",
      marginBottom: "40px",
      position: "relative"
    },
    note: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      bottom: "10px",
      color: "#c0c1c2",
      display: "block",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "13px",
      left: "0",
      marginLeft: "20px",
      position: "absolute",
      width: "260px"
    },
    chipRoot: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit,
    }
});

type Props = {
  classes: Object,
  rtlActive: boolean,
  configInformation: Object,
  dashboardData: Object
};

@withStyles(styles)
export default class ConfigInfo extends React.Component<Props> {

    renderListInfos = (cardData: Object, cardTitle?: string, withImage?: boolean) => {
        const dataKeys = Object.keys(cardData);

        return (
            <Card className="wrapped-card-class">
                {cardTitle && <CardHeader color="primary" text>
                    <CardText color="primary" className="card-title-box">
                        <h5>{cardTitle}</h5>
                    </CardText>
                </CardHeader>}
                <CardBody>
                    <GridContainer>
                        {dataKeys.map((key, index) => (
                            <Fragment key={index}>
                                <GridItem xs={12} sm={7} md={7}>
                                    <p className="bold-theme-text">{key}:</p>
                                </GridItem>
                                <GridItem xs={12} sm={5} md={5}>
                                    <p className="thin-theme-text">{cardData[key]}</p>
                                </GridItem>
                            </Fragment>
                        ))}
                    </GridContainer>
                </CardBody>
            </Card>
        )
    }

    renderBadge = () => {
        const { dashboardData } = this.props;
        const badgesData = {
            ap: {
                key: "Autopilot",
                value: autopilot
            },
            dd: {
                key: "Desert Driver",
                value: desert_driver
            },
            $: {
                key: "Climbing",
                value: climbing
            },
            ea: {
                key: "Early Adopter",
                value: early_adopter
            },
            fp: {
                key: "First Place",
                value: first_place
            },
            gb: {
                key: "Good Battery",
                value: good_battery
            },
            hm: {
                key: "High Mileage",
                value: high_mileage
            },
            nw: {
                key: "Night owl",
                value: nightowl
            }
        };       

        return dashboardData.badges.map(badge => badgesData[badge] && (
            <Tooltip
                key={badge}
                title={<span>{badgesData[badge].key}</span>}
                placement="top"
            >
                <GridItem xs={6} sm={3} md={3} key={badgesData[badge]}>
                    <CardAvatar>
                        <img style={{maxWidth: '100%', margin: "10px 0"}}  src={badgesData[badge].value} alt={badge} />
                    </CardAvatar>
                </GridItem>
            </Tooltip>
        ))
    }

    render() {
        const { classes, configInformation } = this.props;

        return (
            <ErrorCatcher>
                <Card>
                    <CardHeader>
                        <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                            Configuration Information
                        </h3>
                    </CardHeader>
                    <CardBody className="custom-card-body">
                        {!_.isEmpty(configInformation) ? <GridContainer>
                            <GridItem xs={12} sm={6} md={4} className="m-tb-30">
                                {this.renderListInfos(configInformation.generalInfo)}
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} className="m-tb-30">
                                {this.renderListInfos(configInformation.details)}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className="m-tb-30">
                                <Card className="wrapped-card-class">
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Badges</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            {this.renderBadge()}
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Vehicle Option Specs</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody>
                                    <div className={classes.chipRoot} style={{ justifyContent: "left" }}>
                                    {(configInformation.options || []).map((option, index) => (
                                        <Tooltip
                                            key={index}
                                            title={<VehicleOption option={option.value} />}
                                            placement="top"
                                        >
                                            <Chip label={option.key} className={classes.chip} key={index} />
                                        </Tooltip>
                                    ))}
                                </div>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer> : <p>No data was found!</p>}
                    </CardBody>
                </Card>
            </ErrorCatcher>
        );
    }
};
