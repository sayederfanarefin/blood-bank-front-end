import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Badge from "components/Badge/Badge.jsx";

import timelineStyle from "assets/jss/material-dashboard-pro-react/components/timelineStyle.jsx";


@withStyles(timelineStyle)
export default class Timeline extends React.Component {
  state = {
    index: 0
  }

  updateTimeline = (index: number) => {
    if (this.state.index !== index) {
      this.setState({ index })
      this.props.onChange(index)
    }
  }

  render() {
    const { classes, stories, simple } = this.props;
    const timelineClass =
      classes.timeline +
      " " +
      cx({
        [classes.timelineSimple]: simple
      });
    return (
      <ul className={timelineClass}>
        {stories.map((prop, key) => {
          const panelClasses =
            classes.timelinePanel +
            " " +
            cx({
              [classes.timelinePanelInverted]: prop.inverted,
              [classes.timelineSimplePanel]: simple,
              [classes['timeline' + prop.titleColor]]: prop.titleColor
            });
          const timelineBadgeClasses =
            classes.timelineBadge +
            " " +
            classes[prop.badgeColor] +
            " " +
            cx({
              [classes.timelineSimpleBadge]: simple
            });
          return (
            <li className={classes.item} key={key} onClick={() => this.updateTimeline(key)}>
              {prop.badgeIcon ? (
                <div className={timelineBadgeClasses}>
                  <prop.badgeIcon className={classes.badgeIcon} />
                </div>
              ) : null}
              <div className={panelClasses}>
                {prop.title ? (
                  <div className={classes.timelineHeading}>
                    <Badge color={prop.titleColor}>{prop.title}</Badge>
                  </div>
                ) : null}
                <div className={classes.timelineBody}>{prop.body}</div>
                {prop.footerTitle ? (
                  <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
                ) : null}
                {prop.footer ? <hr className={classes.footerLine} /> : null}
                {prop.footer ? (
                  <div className={classes.timelineFooter}>{prop.footer}</div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};