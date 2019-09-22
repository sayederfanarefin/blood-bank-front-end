import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import { Form, reduxForm } from 'redux-form';
import { updateDocTitle } from "helpers/htmlHelper";
import { vehicleRegistrationValidation } from "helpers/validation";
import { fetchVehicles, updateVehicle, registerVehicle, deleteVehicle, setRegisterVehicleInitialValue } from "actions/vehicles";
import './index.scss';

import LoadingWrapper from "components/LoadingWrapper";
import AddVehicle from "../AddVehicle";
import Vehicle from '../AddVehicle/Vehicle';

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
import Icon from '@material-ui/core/Icon';
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
  vehicle: Object,
  vehicles: Array<Object>,
  serverError: string,
  isAdding: boolean,
  invalid: boolean,
  user: Object,
  fetchVehicles: Object,
  registerVehicle: Object,
  deleteVehicle: Object,
  setInitialValue: Function,
  handleSubmit: Function
}

type State = {
    data: Array<Object>,
    alert: any,
    addModal: boolean,
    isDeleting: boolean,
    updating: boolean,
    isVehicleAction: boolean,
}


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

@connect(
    state => ({
        isFetching: state.vehicles.vehiclesRequest,
        isAdding: (state.vehicles.registerVehicleRequest || state.vehicles.updateVehicleRequest),
        vehicle: (state.vehicles.registerVehicleData || state.vehicles.updateVehicleData),
        vehicles: state.vehicles.data,
        serverErrorMessage: state.dashboard.vehiclesError,
        deleteRequest: state.vehicles.deleteRequest,
        deleteSuccess: state.vehicles.deleteSuccess,
        deleteError: state.vehicles.deleteError,
        user: state.user.data,
        initialValues: state.vehicles.initialVehicleRegistration
    }),
    dispatch => ({
        registerVehicle: bindActionCreators(registerVehicle, dispatch),
        updateVehicle: bindActionCreators(updateVehicle, dispatch),
        deleteVehicle: bindActionCreators(deleteVehicle, dispatch),
        fetchVehicles: bindActionCreators(fetchVehicles, dispatch),
        setInitialValue: bindActionCreators(setRegisterVehicleInitialValue, dispatch),
    })
)
@withStyles({...extendedTablesStyle, ...sweetAlertStyle})
@reduxForm({
    form: 'vehicleRegistration',
    validate: vehicleRegistrationValidation,
    enableReinitialize: true
})
@withRouter
export default class VehiclesList extends React.Component<Props, State> {
    state = {
        data: [],
        alert: null,
        addModal: false,
        isDeleting: false,
        updating: false,
        isVehicleAction: false,
    }

    componentWillMount() {
        const { fetchVehicles, user } = this.props;

        // Update page title
        updateDocTitle('Vehicles list');

        fetchVehicles.request({
            email: user.email,
            id: user.userId
        })
    }

    componentWillReceiveProps(nextProps: Object) {
        const { classes, vehicles, vehicle, deleteSuccess } = nextProps;
        const { isDeleting, isVehicleAction } = this.state;

        if (vehicles && JSON.stringify(vehicles) !== JSON.stringify(this.props.vehicles)) {
            const data = vehicles.map(vehicle => [
                <Link className={classes.tdNameAnchor} to={`/dashboard/${vehicle.vin}`}>{vehicle.plateName}</Link>,
                vehicle.make,
                vehicle.model,
                (vehicle.modelYear ? new Date(vehicle.modelYear).getFullYear() : "2019"),
                (vehicle.startOdometer || 0).toFixed(0) + ' km',
                <React.Fragment>
                    <Button
                        simple
                        className={classes.actionButton}
                        size="lg"
                        style={{color: "rgb(80, 80, 80)"}}
                        onClick={() => this.handleClickOpen(vehicle)}
                    >
                        <Settings className={classes.icon} />
                    </Button>
                    <Button
                        simple
                        className={classes.actionButton}
                        size="lg"
                        style={{color: "rgb(80, 80, 80)"}}
                        onClick={() => this.confirmDelete(vehicle.plateName, vehicle.id)}
                    >
                        <DeleteOutline className={classes.icon} />
                    </Button>
                </React.Fragment>
            ]);

            this.setState({ data })
        }
        if (vehicle && vehicle !== this.props.vehicle && isVehicleAction) {
            this.onVehicleActionSuccess()
            this.props.reset()
        }

        if (isDeleting && deleteSuccess && deleteSuccess !== this.props.deleteSuccess) {
            this.successDelete(deleteSuccess);
        }
    }
        
    onVehicleActionSuccess = () => {
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
                    {updating ? "Vehicle has successfully been updated." : "New Vehicle has successfully been added."}
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
                this.props.deleteVehicle.request({ id })
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
                    Vehicle was deleted successfully.
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null,
            addModal: false,
            isVehicleAction: false,
        });
    }

    handleChange = name => event => this.setState({ [name]: event.target.checked })

    handleClickOpen = async (vehicle?: Object) => {
        await this.props.setInitialValue(vehicle);
        this.setState({
            updating: !!vehicle.vin,
            addModal: true,
        })
    }

    handleClose = () => this.setState({ addModal: false })
  
    onSubmit = async (values: Object) => {
      const { updateVehicle, registerVehicle } = this.props;
      const { updating } = this.state;
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};

      await this.setState({ isVehicleAction: true });

      if (updating) {
        return updateVehicle.request({
            userEmail: user.email,
            uid: user.userId,
            id: values.id,
            make: values.make,
            model: values.model,
            modelYear: values.modelYear,
            plateName: values.plateName,
            startOdometer: values.startOdometer,
            vehicleEmail: values.vehicleEmail,
            vehiclePassword: values.vehiclePassword,
            vin: values.vin,
            zoneId: values.zoneId,
        });
      }
      
      registerVehicle.request({
        userEmail: user.email,
        uid: user.userId,
        vin: values.vin,
        vehicleEmail: values.vehicleEmail,
        vehiclePassword: values.vehiclePassword,
        zoneId: values.zoneId
      });
    }
    
    render() {
        const { isFetching, classes, isAdding, handleSubmit, invalid } = this.props;
        const { data, addModal, alert } = this.state;

        return (
            <ErrorCatcher>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        {alert}
                        <Card>
                            <CardHeader color="primary" icon>
                                <CardIcon color="primary">
                                    <Icon className={classes.icon} style={{color: '#ffffff'}}>
                                    list
                                    </Icon>
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
                                    Vehicle Snapshot
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching}>
                                    <Table
                                        hover
                                        striped
                                        tableHead={[
                                            "VEHICLE NAME",
                                            "MAKE",
                                            "MODEL",
                                            "YEAR",
                                            "ODOMETER",
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
                                    <AddVehicle
                                        validate
                                        steps={[
                                            { stepName: "Vehicle", stepComponent: Vehicle, stepId: "vehicle" }
                                        ]}
                                        title="Add Vehicle"
                                        // subtitle="Before adding the vehicle, please add the dashboard blackbox information"
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
