// @flow
import React, { Component } from 'react';
import Avataaar from 'avataaars';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Close from "@material-ui/icons/Close";

import withStyles from "@material-ui/core/styles/withStyles";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import ErrorCatcher from 'components/ErrorCatcher';


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

type Props = {
    classes: Object,
    changeField: Function,
    showModal: boolean
}

type State = {
    avatarStyle: string,
    topType: string,
    accessoriesType: string,
    hairColor: string,
    facialHairType: string,
    clotheType: string,
    eyeType: string,
    eyebrowType: string,
    mouthType: string,
    skinColor: string
}

@withStyles(regularFormsStyle)
export default class Customize extends Component<Props, State> {
    constructor(props) {
        super(props);

        // allOptions.map(option =>
        //     console.log('option: ', option)
        //   )

        this.state = {
            avatarStyle: props.defaultOptions.avatarStyle,
            topType: props.defaultOptions.topType,
            accessoriesType: props.defaultOptions.accessoriesType,
            hairColor: props.defaultOptions.hairColor,
            facialHairType: props.defaultOptions.facialHairType,
            clotheType: props.defaultOptions.clotheType,
            eyeType: props.defaultOptions.eyeType,
            eyebrowType: props.defaultOptions.eyebrowType,
            mouthType: props.defaultOptions.mouthType,
            skinColor: props.defaultOptions.skinColor
        }

    }

  handleChange = (e: Object) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  render() {
    const { classes, showModal } = this.props;
    const {
        avatarStyle,
        topType,
        accessoriesType,
        hairColor,
        facialHairType,
        clotheType,
        eyeType,
        eyebrowType,
        mouthType,
        skinColor
    } = this.state;

    return (
        <ErrorCatcher>
            <Dialog
                classes={{
                    root: classes.center + " " + classes.modalRoot,
                    paper: classes.modal
                }}
                open={showModal}
                TransitionComponent={Transition}
                keepMounted
                disableBackdropClick
                scroll="body"
                onClose={this.handleClose}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4 className={classes.modalTitle}>Add Vehicle</h4>
                        <Button
                            justIcon
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="transparent"
                            onClick={this.handleClose}
                        >
                            <Close className={classes.modalClose} />
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent
                    id="notice-modal-slide-description"
                    className={classes.modalBody}
                >
                    <legend>Avatar</legend>
                    <Avataaar
                        avatarStyle={avatarStyle}
                        topType={topType}
                        accessoriesType={accessoriesType}
                        hairColor={hairColor}
                        facialHairType={facialHairType}
                        clotheType={clotheType}
                        eyeType={eyeType}
                        eyebrowType={eyebrowType}
                        mouthType={mouthType}
                        skinColor={skinColor}
                    />
                    <div>
                        <GridContainer>
                            <GridItem xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                                With Help
                            </FormLabel>
                            </GridItem>
                            <GridItem xs={12} sm={10}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={avatarStyle === "Circle"}
                                            onChange={this.handleChange}
                                            value="Circle"
                                            name="avatarStyle"
                                            aria-label="Circle"
                                            icon={<FiberManualRecord className={classes.radioUnchecked}/>}
                                            checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Circle"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={avatarStyle === "Transparent"}
                                            onChange={this.handleChange}
                                            value="Transparent"
                                            name="avatarStyle"
                                            aria-label="Transparent"
                                            icon={<FiberManualRecord className={classes.radioUnchecked}/>}
                                            checkedIcon={<FiberManualRecord className={classes.radioChecked}/>}
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Transparent"
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button
                        // onClick={this.handleClose}
                        color="danger"
                        simple
                    >
                        Cancel
                    </Button>
                    <Button color="success" size="lg" type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </ErrorCatcher>
    );
  }
}