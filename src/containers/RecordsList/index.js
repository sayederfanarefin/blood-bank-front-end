import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Form, reduxForm } from 'redux-form';
import { updateDocTitle } from "helpers/htmlHelper";
import { updateRecordValidation } from 'helpers/validation';
import { fetchRecords, updateRecord, registerRecord, deleteRecord, setRegisterRecordInitialValue } from "actions/records";
// import './index.scss';

import LoadingWrapper from "components/LoadingWrapper";
import AddVehicle from "../AddVehicle";
import Record from './Record';

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
  record: Object,
  records: Array<Object>,
  serverError: string,
  isAdding: boolean,
  invalid: boolean,
  user: Object,
  fetchRecords: Object,
  registerRecord: Object,
  deleteRecord: Object,
  setInitialValue: Function,
  handleSubmit: Function
}

type State = {
    data: Array<Object>,
    alert: any,
    addModal: boolean,
    isDeleting: boolean,
    updating: boolean,
    isRecordAction: boolean,
}


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

@connect(
    state => ({
        isFetching: state.records.recordsRequest,
        isAdding: (state.records.registerRecordRequest || state.records.updateRecordRequest),
        record: (state.records.registerRecordData || state.records.updateRecordData),
        records: state.records.data,
        serverErrorMessage: state.dashboard.recordsError,
        deleteRequest: state.records.deleteRequest,
        deleteSuccess: state.records.deleteSuccess,
        deleteError: state.records.deleteError,
        user: state.user.data,
        initialValues: state.records.initialRecordRegistration
    }),
    dispatch => ({
        registerRecord: bindActionCreators(registerRecord, dispatch),
        updateRecord: bindActionCreators(updateRecord, dispatch),
        deleteRecord: bindActionCreators(deleteRecord, dispatch),
        fetchRecords: bindActionCreators(fetchRecords, dispatch),
        setInitialValue: bindActionCreators(setRegisterRecordInitialValue, dispatch),
    })
)
@withStyles({...extendedTablesStyle, ...sweetAlertStyle})
@reduxForm({
    form: 'recordInfo',
    validate: updateRecordValidation,
    enableReinitialize: true
})
@withRouter
export default class RecordsList extends React.Component<Props, State> {
    state = {
        data: [],
        alert: null,
        addModal: false,
        isDeleting: false,
        updating: false,
        isRecordAction: false,
    }

    componentWillMount() {
        const { fetchRecords, user, classes } = this.props;

        // Update page title
        updateDocTitle('Records list');

        fetchRecords.request({
            email: user.email,
            id: user.userId
        })


        const mockRecord = [
            {
                vehicle: "KM1",
                category: "Maintenance",
                title: "Planned Oil Change",
                cost: "$ 403.5",
                odometer: "55.000 km",
                date: "2015 May 10"
            },
            {
                vehicle: "KM2",
                category: "Accident",
                title: "Rear End Accident",
                cost: "$ 403.5",
                odometer: "75.000 km",
                date: "2018 Dec 11"
            },
            {
                vehicle: "KM3",
                category: "Repair",
                title: "Planned Oil Change",
                cost: "$ 55.5",
                odometer: "124.000 km",
                date: "2018 Dec 10"
            }
        ]

        const data = mockRecord.map(record => [
            record.vehicle,
            record.category,
            record.title,
            record.cost,
            record.odometer,
            record.date,
            <React.Fragment>
                <Button
                    simple
                    className={classes.actionButton}
                    size="lg"
                    style={{color: "rgb(80, 80, 80)"}}
                    onClick={() => this.handleClickOpen(record)}
                >
                    <Settings className={classes.icon} />
                </Button>
                <Button
                    simple
                    className={classes.actionButton}
                    size="lg"
                    style={{color: "rgb(80, 80, 80)"}}
                    onClick={() => this.confirmDelete(record.plateName, record.id)}
                >
                    <DeleteOutline className={classes.icon} />
                </Button>
            </React.Fragment>
        ]);

        this.setState({ data })
    }

    componentWillReceiveProps(nextProps: Object) {
        const { classes, record, deleteSuccess } = nextProps;
        const { isDeleting, isRecordAction } = this.state;
        const mockRecord = [
            {
                vehicle: "KM1",
                category: "Maintenance",
                title: "Planned Oil Change",
                cost: "$ 403.5",
                odometer: "55.000 km",
                date: "2015 May 10"
            }
        ]

        // if (records && JSON.stringify(records) !== JSON.stringify(this.props.records)) {
            const data = mockRecord.map(record => [
                record.vehicle,
                record.category,
                record.title,
                record.cost,
                record.odometer,
                record.date,
                <React.Fragment>
                    <Button
                        simple
                        className={classes.actionButton}
                        size="lg"
                        style={{color: "rgb(80, 80, 80)"}}
                        onClick={() => this.handleClickOpen(record)}
                    >
                        <Settings className={classes.icon} />
                    </Button>
                    <Button
                        simple
                        className={classes.actionButton}
                        size="lg"
                        style={{color: "rgb(80, 80, 80)"}}
                        onClick={() => this.confirmDelete(record.plateName, record.id)}
                    >
                        <DeleteOutline className={classes.icon} />
                    </Button>
                </React.Fragment>
            ]);

            this.setState({ data })
        // }
        if (record && record !== this.props.record && isRecordAction) {
            this.onRecordActionSuccess()
            this.props.reset()
        }

        if (isDeleting && deleteSuccess && deleteSuccess !== this.props.deleteSuccess) {
            this.successDelete(deleteSuccess);
        }
    }
        
    onRecordActionSuccess = () => {
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
                    {updating ? "Record has successfully been updated." : "New Record has successfully been added."}
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
                this.props.deleteRecord.request({ id })
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
                    Record was deleted successfully.
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null,
            addModal: false,
            isRecordAction: false,
        });
    }

    handleChange = name => event => this.setState({ [name]: event.target.checked })

    handleClickOpen = async (record?: Object) => {
        console.log('setInitialValue: ', record)
        await this.props.setInitialValue(record);
        this.setState({
            updating: !!record.name,
            addModal: true,
        })
    }

    handleClose = () => this.setState({ addModal: false })
  
    onSubmit = async (values: Object) => {
    //   const { updateRecord, registerRecord } = this.props;
    //   const { updating } = this.state;
    //   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};

      await this.setState({ isRecordAction: true });
      console.log('values: ', values)

    //   if (updating) {
    //     return updateRecord.request({
    //         userEmail: user.email,
    //         uid: user.userId,
    //         id: values.id,
    //         make: values.make,
    //         model: values.model,
    //         modelYear: values.modelYear,
    //         plateName: values.plateName,
    //         startOdometer: values.startOdometer,
    //         recordEmail: values.recordEmail,
    //         recordPassword: values.recordPassword,
    //         vin: values.vin,
    //         zoneId: values.zoneId,
    //     });
    //   }
      
    //   registerRecord.request({
    //     userEmail: user.email,
    //     uid: user.userId,
    //     vin: values.vin,
    //     recordEmail: values.recordEmail,
    //     recordPassword: values.recordPassword,
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
                                    <Icon className={classes.icon} style={{color: '#ffffff'}}>
                                        receipt
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
                                    Records
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching}>
                                    <Table
                                        hover
                                        striped
                                        tableHead={[
                                            "VEHICLE NAME",
                                            "CATEGORY",
                                            "TITLE",
                                            "COST",
                                            "ODOMETER",
                                            "DATE",
                                            "ACTIONS"
                                        ]}
                                        tableData={data}
                                        customCellClasses={[
                                            classes.left,
                                            classes.left,
                                            classes.left,
                                            classes.center,
                                            classes.center,
                                            classes.center,
                                            classes.center
                                        ]}
                                        customClassesForCells={[1, 2, 3, 4, 5, 6, 7]}
                                        customHeadCellClasses={[
                                            classes.left,
                                            classes.left,
                                            classes.left,
                                            classes.center,
                                            classes.center,
                                            classes.center,
                                            classes.center
                                        ]}
                                        customHeadClassesForCells={[1, 2, 3, 4, 5, 6, 7]}
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
                                        <h4 className={classes.modalTitle}>{updating ? 'Update' : 'Add'} Record</h4>
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
                                            { stepName: "Items", stepComponent: Record, stepId: "items" },
                                            { stepName: "Additional", stepComponent: Record, stepId: "additional" },
                                        ]}
                                        title="Add Record"
                                        // subtitle="Before adding the record, please add the dashboard blackbox information"
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
