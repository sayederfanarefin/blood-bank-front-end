// @flow
import React, { Component } from 'react';
import Avataaar from 'avataaars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import withStyles from "@material-ui/core/styles/withStyles";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
    classes: Object,
    changeField: Function
}

type State = {
    sex: string,
    defaultOptions: Object
}

@connect(
    null,
    dispatch => ({
      changeField: bindActionCreators(change, dispatch)
    })
)
@withStyles(regularFormsStyle)
export default class Avatar extends Component<Props, State> {
  state = {
    defaultOptions: {
        avatarStyle: 'Transparent',
        accessoriesType: 'Blank',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        clotheType: 'BlazerShirt',
        eyeType: 'Default',
        eyebrowType: 'Default',
        mouthType: 'Default',
        skinColor: 'Light'
    },
    sex: "ShortHairShortRound"
  }

  componentWillMount() {
    this.props.changeField('createUser', 'avatar', 'sex=ShortHairShortRound')
  }

  handleChange = async (e: Object) => {
      await this.setState({
          [e.target.name]: e.target.value
      })

      this.updateAvatarUrl();
  }

  getFullAvatarUrl(options: Object) {
    const optionKeys = Object.keys(options);

    let fullAvatarUrl = '';
    for (let i = 0; i < optionKeys.length; i++) {
        const pathToOption = `${optionKeys[i]}=${options[optionKeys[i]]}`;
        fullAvatarUrl += (i > 0) ? '&'+pathToOption : pathToOption;
    }
    return fullAvatarUrl;
  }

  updateAvatarUrl = () => {
    const { sex, defaultOptions } = this.state;

    const fullAvatarUrl = this.getFullAvatarUrl({ sex, ...defaultOptions })
    this.props.changeField('createUser', 'avatar', fullAvatarUrl)
  }

  handleCustomizeSubmit = async (options: Object) => {
    await this.setState({
        defaultOptions: options
    });

    this.updateAvatarUrl();
  }

  render() {
    const { classes } = this.props;
    const { sex, defaultOptions } = this.state;

    return (
        <ErrorCatcher>
            <legend>Avatar</legend>
            <Avataaar
                avatarStyle={defaultOptions.avatarStyle}
                topType={defaultOptions.topType || sex}
                accessoriesType={defaultOptions.accessoriesType}
                hairColor={defaultOptions.hairColor}
                facialHairType={defaultOptions.facialHairType}
                clotheType={defaultOptions.clotheType}
                eyeType={defaultOptions.eyeType}
                eyebrowType={defaultOptions.eyebrowType}
                mouthType={defaultOptions.mouthType}
                skinColor={defaultOptions.skinColor}
            />
            <div className={classes.inlineChecks}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={sex === "ShortHairShortRound"}
                            onChange={this.handleChange}
                            value="ShortHairShortRound"
                            name={"sex"}
                            aria-label={"Male"}
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
                    label={"Male"}
                />
                <FormControlLabel
                    control={
                        <Radio
                            checked={sex === "LongHairMiaWallace"}
                            onChange={this.handleChange}
                            value="LongHairMiaWallace"
                            name={"sex"}
                            aria-label={"Female"}
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
                    label={"Female"}
                />
            </div>
        </ErrorCatcher>
    );
  }
}