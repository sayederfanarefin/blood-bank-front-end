// @flow
import React from "react";
import _ from 'lodash';
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardMedia from '@material-ui/core/CardMedia';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardText from "components/Card/CardText.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import ErrorCatcher from "components/ErrorCatcher";

// import modelSWhite from "assets/img/tesla/model-s/white.png";
// import modelSBlack from "assets/img/tesla/model-s/black.png";
// import modelSBlue from "assets/img/tesla/model-s/blue.png";
// import modelSGrey from "assets/img/tesla/model-s/grey.png";
// import modelSRed from "assets/img/tesla/model-s/red.png";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  }
};

type Props = {
  classes: Object,
  rtlActive: boolean,
  basicInformation: Object,
  exteriorColour: string,
  carType: string
};

type State = {
    image: string
};

@withStyles(styles)
export default class BasicInfo extends React.Component<Props, State> {
    state = {
        image: ""
    }

    componentWillMount() {
        this.handleImageDisplaying();
    }

    componentWillReceiveProps(nextProps: Object) {
        const { exteriorColour } = nextProps;

        if (exteriorColour && exteriorColour !== this.props.exteriorColour) {
            this.handleImageDisplaying(exteriorColour);
        }
    }

    handleImageDisplaying = (exteriorColour?: string) => {
        const { carType } = this.props;
        const localColor = exteriorColour || this.props.exteriorColour;
        const path = carType === "modelx" ? "model-x" : "model-s";

        let imageColor;
        switch(localColor) {
            case "Pearl":
              imageColor = "white";
              break;
            case "Red":
              imageColor = "red";
              break;
            case "Blue":
              imageColor = "blue";
              break;
            case "Black":
              imageColor = "black";
              break;
            case "Grey":
              imageColor = "grey";
              break;
            default:
              imageColor = "white";
        }

        const image = require(`assets/img/tesla/${path}/${imageColor}.jpg`);

        this.setState({ image })
    }

    renderListInfos = (cardTitle: string, cardData: Object, withImage?: boolean) => {
        const { image } = this.state;
        const dataKeys = Object.keys(cardData);

        return (
            <Card className="wrapped-card-class">
                <CardHeader color="primary" text>
                    <CardText color="primary" className="card-title-box">
                        <h5>{cardTitle}</h5>
                    </CardText>
                </CardHeader>
                <CardBody>
                    {withImage && <CardMedia
                        component="img"
                        alt="Tesla"
                        className="tesla-img"
                        image={image}
                        title="Tesla"
                    />}
                    <List component="nav">
                        {dataKeys.map((key, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${key}:`}
                                    secondary={cardData[key]}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardBody>
            </Card>
        )
    }

    render() {
        const { classes, basicInformation } = this.props;

        return (
            <ErrorCatcher>
                <Card style={{ marginTop: 0 }}>
                    <CardHeader>
                        <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                            Basic Information
                        </h3>
                    </CardHeader>
                    <CardBody className="custom-card-body">
                        {!_.isEmpty(basicInformation) ? <GridContainer>
                            <GridItem xs={12} sm={6} md={4} className="m-tb-30">
                                {this.renderListInfos('VEHICLE INFO', basicInformation.vehicleInfo, true)}
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} className="m-tb-30">
                                {this.renderListInfos('DETAILS', basicInformation.details)}
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4} className="m-tb-30">
                                {this.renderListInfos('STATS', basicInformation.stats)}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} className="m-tb-30">
                                <Card className="wrapped-card-class">
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Driving Pattern</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={6} md={3} lg={3}>
                                                <p style={{ textAlign: "center" }}>Highway</p>
                                                <ChartistGraph
                                                    data={{
                                                        labels: [basicInformation.driving.highwayPct, " "],
                                                        series: [parseFloat(basicInformation.driving.highwayPct), (100 - parseFloat(basicInformation.driving.highwayPct))]
                                                    }}
                                                    type="Pie"
                                                    options={{
                                                        height: 100,
                                                        donutWidth: 7,
                                                        labelPosition: 'inside',
                                                        donut: true,
                                                        label: 'ct-label-donut',
                                                        total: 100
                                                    }}
                                                    listener={{
                                                        draw: (context) => {
                                                            if (context.type === 'label') {
                                                                context.element.attr({
                                                                    dx: context.element.root().width() / 2,
                                                                    dy: context.element.root().height() / 2
                                                                });
                                                            }

                                                            if(context.type === 'slice') {
                                                                // Get the total path length in order to use for dash array animation
                                                                var pathLength = context.element._node.getTotalLength();
                                                            
                                                                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                                                                context.element.attr({
                                                                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                                                                });
                                                            
                                                                // Create animation definition while also assigning an ID to the animation for later sync usage
                                                                var animationDefinition = {
                                                                'stroke-dashoffset': {
                                                                    id: 'anim' + context.index,
                                                                    dur: 1000,
                                                                    from: -pathLength + 'px',
                                                                    to:  '0px',
                                                                    easing: 'easeOutQuint',
                                                                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                                                                    fill: 'freeze'
                                                                }
                                                                };
                                                            
                                                                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                                                                if(context.index !== 0) {
                                                                animationDefinition['stroke-dashoffset'].begin = 'anim' + (context.index - 1) + '.end';
                                                                }
                                                            
                                                                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                                                                context.element.attr({
                                                                'stroke-dashoffset': -pathLength + 'px'
                                                                });
                                                            
                                                                // We can't use guided mode as the animations need to rely on setting begin manually
                                                                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                                                                context.element.animate(animationDefinition, false);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <p style={{ textAlign: "center" }}>Car speed was less than 80</p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={3} lg={3}>
                                                <p style={{ textAlign: "center" }}>Extreme Highway</p>
                                                <ChartistGraph
                                                    data={{
                                                        labels: [basicInformation.driving.extrHighwayPct, " "],
                                                        series: [parseFloat(basicInformation.driving.extrHighwayPct), (100 - parseFloat(basicInformation.driving.extrHighwayPct))]
                                                    }}
                                                    type="Pie"
                                                    options={{
                                                        height: 100,
                                                        donutWidth: 7,
                                                        labelPosition: 'inside',
                                                        donut: true,
                                                        label: 'ct-label-donut',
                                                        total: 100
                                                    }}
                                                    listener={{
                                                        draw: (context) => {
                                                            if (context.type === 'label') {
                                                                context.element.attr({
                                                                    dx: context.element.root().width() / 2,
                                                                    dy: context.element.root().height() / 2
                                                                });
                                                            }

                                                            if(context.type === 'slice') {
                                                                // Get the total path length in order to use for dash array animation
                                                                var pathLength = context.element._node.getTotalLength();
                                                            
                                                                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                                                                context.element.attr({
                                                                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                                                                });
                                                            
                                                                // Create animation definition while also assigning an ID to the animation for later sync usage
                                                                var animationDefinition = {
                                                                'stroke-dashoffset': {
                                                                    id: 'anim' + context.index,
                                                                    dur: 1000,
                                                                    from: -pathLength + 'px',
                                                                    to:  '0px',
                                                                    easing: 'easeOutQuint',
                                                                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                                                                    fill: 'freeze'
                                                                }
                                                                };
                                                            
                                                                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                                                                if(context.index !== 0) {
                                                                animationDefinition['stroke-dashoffset'].begin = 'anim' + (context.index - 1) + '.end';
                                                                }
                                                            
                                                                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                                                                context.element.attr({
                                                                'stroke-dashoffset': -pathLength + 'px'
                                                                });
                                                            
                                                                // We can't use guided mode as the animations need to rely on setting begin manually
                                                                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                                                                context.element.animate(animationDefinition, false);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <p style={{ textAlign: "center" }}>Car speed was more than 80</p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={3} lg={3}>
                                                <p style={{ textAlign: "center" }}>City</p>
                                                <ChartistGraph
                                                    data={{
                                                        labels: [basicInformation.driving.cityDrvPct, " "],
                                                        series: [parseFloat(basicInformation.driving.cityDrvPct), (100 - parseFloat(basicInformation.driving.cityDrvPct))]
                                                    }}
                                                    type="Pie"
                                                    options={{
                                                        height: 100,
                                                        donutWidth: 7,
                                                        labelPosition: 'inside',
                                                        donut: true,
                                                        label: 'ct-label-donut',
                                                        total: 100
                                                    }}
                                                    listener={{
                                                        draw: (context) => {
                                                            if (context.type === 'label') {
                                                                context.element.attr({
                                                                    dx: context.element.root().width() / 2,
                                                                    dy: context.element.root().height() / 2
                                                                });
                                                            }

                                                            if(context.type === 'slice') {
                                                                // Get the total path length in order to use for dash array animation
                                                                var pathLength = context.element._node.getTotalLength();
                                                            
                                                                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                                                                context.element.attr({
                                                                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                                                                });
                                                            
                                                                // Create animation definition while also assigning an ID to the animation for later sync usage
                                                                var animationDefinition = {
                                                                'stroke-dashoffset': {
                                                                    id: 'anim' + context.index,
                                                                    dur: 1000,
                                                                    from: -pathLength + 'px',
                                                                    to:  '0px',
                                                                    easing: 'easeOutQuint',
                                                                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                                                                    fill: 'freeze'
                                                                }
                                                                };
                                                            
                                                                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                                                                if(context.index !== 0) {
                                                                animationDefinition['stroke-dashoffset'].begin = 'anim' + (context.index - 1) + '.end';
                                                                }
                                                            
                                                                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                                                                context.element.attr({
                                                                'stroke-dashoffset': -pathLength + 'px'
                                                                });
                                                            
                                                                // We can't use guided mode as the animations need to rely on setting begin manually
                                                                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                                                                context.element.animate(animationDefinition, false);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <p style={{ textAlign: "center" }}>Car speed was less than 50</p>
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={3} lg={3}>
                                                <p style={{ textAlign: "center" }}>Congestion</p>
                                                <ChartistGraph
                                                    data={{
                                                        labels: [basicInformation.driving.congDrvPct, " "],
                                                        series: [parseFloat(basicInformation.driving.congDrvPct), (100 - parseFloat(basicInformation.driving.congDrvPct))]
                                                    }}
                                                    type="Pie"
                                                    options={{
                                                        height: 100,
                                                        donutWidth: 7,
                                                        labelPosition: 'inside',
                                                        donut: true,
                                                        label: 'ct-label-donut',
                                                        total: 100
                                                    }}
                                                    listener={{
                                                        draw: (context) => {
                                                            if (context.type === 'label') {
                                                                context.element.attr({
                                                                    dx: context.element.root().width() / 2,
                                                                    dy: context.element.root().height() / 2
                                                                });
                                                            }

                                                            if(context.type === 'slice') {
                                                                // Get the total path length in order to use for dash array animation
                                                                var pathLength = context.element._node.getTotalLength();
                                                            
                                                                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                                                                context.element.attr({
                                                                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                                                                });
                                                            
                                                                // Create animation definition while also assigning an ID to the animation for later sync usage
                                                                var animationDefinition = {
                                                                'stroke-dashoffset': {
                                                                    id: 'anim' + context.index,
                                                                    dur: 1000,
                                                                    from: -pathLength + 'px',
                                                                    to:  '0px',
                                                                    easing: 'easeOutQuint',
                                                                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                                                                    fill: 'freeze'
                                                                }
                                                                };
                                                            
                                                                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                                                                if(context.index !== 0) {
                                                                animationDefinition['stroke-dashoffset'].begin = 'anim' + (context.index - 1) + '.end';
                                                                }
                                                            
                                                                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                                                                context.element.attr({
                                                                'stroke-dashoffset': -pathLength + 'px'
                                                                });
                                                            
                                                                // We can't use guided mode as the animations need to rely on setting begin manually
                                                                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                                                                context.element.animate(animationDefinition, false);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <p style={{ textAlign: "center" }}>Car speed was less than 30</p>
                                            </GridItem>
                                        </GridContainer>
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
