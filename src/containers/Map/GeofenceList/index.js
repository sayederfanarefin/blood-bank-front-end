import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Form, reduxForm } from 'redux-form';
import { updateDocTitle } from "helpers/htmlHelper";
import { updateGeofenceValidation } from 'helpers/validation';
import { fetchGeofences, updateGeofence, registerGeofence, deleteGeofence, setRegisterGeofenceInitialValue } from "actions/geofences";
// import './index.scss';

import LoadingWrapper from "components/LoadingWrapper";
import AddVehicle from "../../AddVehicle";
import Geofence from './Geofence';

import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Table from "components/Table/Table.jsx";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Place from "@material-ui/icons/Place";
import Close from "@material-ui/icons/Close";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Settings from "@material-ui/icons/Settings";
import Add from "@material-ui/icons/Add";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import ErrorCatcher from "components/ErrorCatcher";

type Props = {
  classes: Object,
  isFetching: boolean,
  geofence: Object,
  geofences: Array<Object>,
  serverError: string,
  isAdding: boolean,
  invalid: boolean,
  user: Object,
  fetchGeofences: Object,
  registerGeofence: Object,
  deleteGeofence: Object,
  setInitialValue: Function,
  handleSubmit: Function
}

type State = {
    data: Array<Object>,
    alert: any,
    addModal: boolean,
    isDeleting: boolean,
    updating: boolean,
    isGeofenceAction: boolean,
}


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

@connect(
    state => ({
        isFetching: state.geofences.geofencesRequest,
        isAdding: (state.geofences.registerGeofenceRequest || state.geofences.updateGeofenceRequest),
        geofence: (state.geofences.registerGeofenceData || state.geofences.updateGeofenceData),
        geofences: state.geofences.data,
        serverErrorMessage: state.dashboard.geofencesError,
        deleteRequest: state.geofences.deleteRequest,
        deleteSuccess: state.geofences.deleteSuccess,
        deleteError: state.geofences.deleteError,
        user: state.user.data,
        initialValues: state.geofences.initialGeofenceRegistration
    }),
    dispatch => ({
        registerGeofence: bindActionCreators(registerGeofence, dispatch),
        updateGeofence: bindActionCreators(updateGeofence, dispatch),
        deleteGeofence: bindActionCreators(deleteGeofence, dispatch),
        fetchGeofences: bindActionCreators(fetchGeofences, dispatch),
        setInitialValue: bindActionCreators(setRegisterGeofenceInitialValue, dispatch),
    })
)
@withStyles({...extendedTablesStyle, ...sweetAlertStyle})
@reduxForm({
    form: 'geofenceInfo',
    validate: updateGeofenceValidation,
    enableReinitialize: true
})
@withRouter
export default class GeofencesList extends React.Component<Props, State> {
    state = {
        data: [],
        alert: null,
        addModal: false,
        isDeleting: false,
        updating: false,
        isGeofenceAction: false,
    }

    componentWillMount() {
        const { fetchGeofences, user } = this.props;

        // Update page title
        updateDocTitle('Geofences list');

        fetchGeofences.request({
            email: user.email,
            id: user.userId
        })
    }

    componentWillReceiveProps(nextProps: Object) {
        const { classes, geofence, deleteSuccess } = nextProps;
        const { isDeleting, isGeofenceAction } = this.state;
        const mockGeofence = [
            {
                name: "Test geofence",
                email: "nijat@dashroad.com",
                type: "Exit geofence",
                vehicle: "KM1"
            }
        ]

        // if (geofences && JSON.stringify(geofences) !== JSON.stringify(this.props.geofences)) {
            const data = mockGeofence.map(geofence => [
                geofence.name,
                geofence.email,
                geofence.type,
                geofence.vehicle,
                <React.Fragment>
                    <Button
                        simple
                        className={classes.actionButton}
                        size="lg"
                        style={{color: "rgb(80, 80, 80)"}}
                        onClick={() => this.handleClickOpen(geofence)}
                    >
                        <Settings className={classes.icon} />
                    </Button>
                    <Button
                        simple
                        className={classes.actionButton}
                        size="lg"
                        style={{color: "rgb(80, 80, 80)"}}
                        onClick={() => this.confirmDelete(geofence.plateName, geofence.id)}
                    >
                        <DeleteOutline className={classes.icon} />
                    </Button>
                </React.Fragment>
            ]);

            this.setState({ data })
        // }
        if (geofence && geofence !== this.props.geofence && isGeofenceAction) {
            this.onGeofenceActionSuccess()
            this.props.reset()
        }

        if (isDeleting && deleteSuccess && deleteSuccess !== this.props.deleteSuccess) {
            this.successDelete(deleteSuccess);
        }
    }
        
    onGeofenceActionSuccess = () => {
        const { updating } = this.state;

        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px", "top": "40%" }}
                    title={updating ? "Updated!" : "Added!"}
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    {updating ? "Geofence has successfully been updated." : "New Geofence has successfully been added."}
                </SweetAlert>
            ),
            updating: false
        });
    }

    confirmDelete = (plateName: string, id: number) => {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "-100px", "top": "40%" }}
            title="Are you sure?"
            onConfirm={() => {
                this.setState({ isDeleting: true })
                this.props.deleteGeofence.request({ id })
            }}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.danger
            }
            confirmBtnText="Yes, delete it!"
            cancelBtnText="Cancel"
            showCancel
          >
            You will delete {plateName}
          </SweetAlert>
        )
      });
    }
        
    successDelete(id: string) {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px", "top": "40%" }}
                    title="Deleted!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    Geofence was deleted successfully.
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null,
            addModal: false,
            isGeofenceAction: false,
        });
    }

    handleChange = name => event => this.setState({ [name]: event.target.checked })

    handleClickOpen = async (geofence?: Object) => {
        console.log('setInitialValue: ', geofence)
        await this.props.setInitialValue(geofence);
        this.setState({
            updating: !!geofence.name,
            addModal: true,
        })
    }

    handleClose = () => this.setState({ addModal: false })
  
    onSubmit = async (values: Object) => {
    //   const { updateGeofence, registerGeofence } = this.props;
    //   const { updating } = this.state;
    //   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};

      await this.setState({ isGeofenceAction: true });
      console.log('values: ', values)

    //   if (updating) {
    //     return updateGeofence.request({
    //         userEmail: user.email,
    //         uid: user.userId,
    //         id: values.id,
    //         make: values.make,
    //         model: values.model,
    //         modelYear: values.modelYear,
    //         plateName: values.plateName,
    //         startOdometer: values.startOdometer,
    //         geofenceEmail: values.geofenceEmail,
    //         geofencePassword: values.geofencePassword,
    //         vin: values.vin,
    //         zoneId: values.zoneId,
    //     });
    //   }
      
    //   registerGeofence.request({
    //     userEmail: user.email,
    //     uid: user.userId,
    //     vin: values.vin,
    //     geofenceEmail: values.geofenceEmail,
    //     geofencePassword: values.geofencePassword,
    //     zoneId: values.zoneId
    //   });
    }
    
    render() {
        const { isFetching, classes, isAdding, handleSubmit, invalid } = this.props;
        const { data, addModal, alert, updating } = this.state;

        return (
            <ErrorCatcher>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        {alert}
                        <Card>
                            <CardHeader color="primary" icon>
                                <CardIcon color="primary">
                                    <Place />
                                </CardIcon>
                                <Button
                                    color="info"
                                    className="card-header-right-buttons"
                                    onClick={this.handleClickOpen}
                                >
                                    <Add className={classes.icons} style={{margin: 0}} />
                                </Button>
                                {/*<Button color="info" className="card-header-right-buttons">
                                    LOAD MORE
                                </Button>*/}
                                <h4 className={classes.cardIconTitle}>
                                    Geofence Snapshot
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching}>
                                    <Table
                                        hover
                                        striped
                                        tableHead={[
                                            "GEOFENCE NAME",
                                            "EMAIL",
                                            "GEOFENCE TYPE",
                                            "SELECT VEHICLE",
                                            "ACTIONS"
                                        ]}
                                        tableData={data}
                                        customCellClasses={[
                                            classes.center,
                                            classes.center,
                                            classes.center,
                                            classes.center,
                                            classes.center
                                        ]}
                                        customClassesForCells={[1, 2, 3, 4, 5]}
                                        customHeadCellClasses={[
                                            classes.center,
                                            classes.center,
                                            classes.center,
                                            classes.center,
                                            classes.center
                                        ]}
                                        customHeadClassesForCells={[1, 2, 3, 4, 5]}
                                    />
                                </LoadingWrapper>
                            </CardBody>
                        </Card>

                        <Dialog
                            classes={{
                                root: classes.center + " " + classes.modalRoot,
                                paper: classes.modal
                            }}
                            open={addModal}
                            TransitionComponent={Transition}
                            keepMounted
                            disableBackdropClick
                            fullWidth
                            maxWidth="lg"
                            scroll="body"
                            onClose={this.handleClose}
                            aria-labelledby="classic-modal-slide-title"
                            aria-describedby="classic-modal-slide-description"
                        >
                            <Form onSubmit={handleSubmit(this.onSubmit)}>
                                <DialogTitle
                                    id="classic-modal-slide-title"
                                    disableTypography
                                    className={classes.modalHeader}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h4 className={classes.modalTitle}>{updating ? 'Update' : 'Add'} Geofence</h4>
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
                                    <AddVehicle
                                        validate
                                        steps={[
                                            { stepName: "Geofence", stepComponent: Geofence, stepId: "geofence" }
                                        ]}
                                        title="Add Geofence"
                                        // subtitle="Before adding the geofence, please add the dashboard blackbox information"
                                        footer={false}
                                        invalid={null}
                                    />
                                </DialogContent>
                                <DialogActions className={classes.modalFooter}>
                                    <Button
                                        onClick={this.handleClose}
                                        color="danger"
                                        disabled={isAdding}
                                        simple
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="success"
                                        size="lg"
                                        disabled={invalid || isAdding}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Form>
                        </Dialog>
                    </GridItem>
                </GridContainer>
            </ErrorCatcher>
        );
    }
}
