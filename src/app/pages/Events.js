import React from 'react';
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import Panel from "react-bootstrap/lib/Panel";
import Col from "react-bootstrap/lib/Col";
import SelectInput from "robe-react-ui/lib/inputs/SelectInput";
import Toast from "robe-react-ui/lib/toast/Toast";
import Table from "react-bootstrap/lib/Table";
import Button from "react-bootstrap/lib/Button";
import Modal from 'react-awesome-modal';
import RequestUtils from "../../utils/RequestUtils";

const options = [
    { value: '5min', label: '5min' },
    { value: '10min', label: '10min' },
    { value: '15min', label: '15min' },
    { value: '20min', label: '20min' },
    { value: '25min', label: '25min' },
    { value: '30min', label: '30min' },
    { value: '35min', label: '35min' },
    { value: '40min', label: '40min' },
    { value: '45min', label: '45min' },
    { value: '50min', label: '50min' },
    { value: '55min', label: '55min' },
    { value: '60min', label: '60min' },
];
export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsData: {},
            track1: [],
            track2: [],
            meeting: "",
            id: undefined,
            header: "",
            content: "",
            presentationTime: "",
            update: false,
            buttonName: "Add New ",
            visible: false,
            SingleSelect: "tr",
            meetingData: [],
            meetings: [],
            selectedOption: null,
            departmentData: [],
            department: "",



        };
    }

    render() {
        return (

            <Panel header={"Conference Event"} bsStyle="success">

                <Modal
                    visible={this.state.visible}
                    width="500"
                    height="400"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >

                    <Col style={{padding: 10}}>
                        <TextInput
                            label="Header"
                            name="header"
                            validationDisplay="overlay"
                            value={this.state.header}
                            onChange={this.__handleChange}
                            validations={{
                                required: true

                            }}/>

                        {/*<TextInput*/}
                            {/*label="Content"*/}
                            {/*name="content"*/}
                            {/*validationDisplay="overlay"*/}
                            {/*value={this.state.content}*/}
                            {/*onChange={this.__handleChange}*/}
                            {/*validations={{*/}
                                {/*required: true,*/}
                                {/*minLength: {*/}
                                    {/*args: [3]*/}
                                {/*}*/}
                            {/*}}/>*/}

                        <SelectInput
                            label="Presentation Time"
                            name="presentationTime"
                            items={options}
                            textField="value"
                            valueField="key"
                            readOnly={true}
                            value={this.state.presentationTime}
                            onChange={this.__handleChange}
                        />

                        {/*<TextInput*/}
                            {/*label="Presentation Time"*/}
                            {/*name="presentationTime"*/}
                            {/*validationDisplay="overlay"*/}
                            {/*value={this.state.presentationTime}*/}
                            {/*onChange={this.__handleChange}*/}
                            {/*validations={{*/}
                                {/*required: true,*/}
                                {/*minLength: {*/}
                                    {/*args: [3]*/}
                                {/*}*/}
                            {/*}}/>*/}

                        {this.__closePopupButton()}

                        <Button className="pull-right" bsStyle="success" style={{marginTop: 15}}
                                onClick={this.__saveEvent}>{this.state.buttonName} Event</Button>


                    </Col>
                </Modal>
                {this.__renderTable()}

                <Button className="pull-right" bsStyle="success" style={{margin: 15}}
                        onClick={() => this.openModal()}> Add New Events</Button>
            </Panel>
        );
    }

    __handleChange = (e) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    };

    __closePopupButton = () => {
        return <Button className="pull-left" bsStyle="success" style={{marginTop: 15}}
                       onClick={() => this.closeModal()}>Cancel</Button>;
    };

    __renderTable = () => {
        return <Table responsive style={{marginTop: 60}}>
            <thead>
            <tr>
                <th>Event Id</th>
                <th>Header</th>
                <th>Content</th>
                <th>Start Time</th>
                <th>Finish Time</th>
                <th>Presentation Time</th>
                <th>Track Id</th>
            </tr>
            </thead>
            <tbody>
            {this.__renderTableRows()}
            </tbody>
        </Table>;
    };


    __renderTableRows = () => {
        let track = this.state.eventsData;
        return this.__prepareTrack(track);
    };


    __prepareTrack(track) {
        let arr = [];
        for (let i = 0; i < track.length ; i++) {
            let data = track[i];
            let dtStart = data.startDate !== null ? new Date(data.startDate) : "-";
            let dtFinish = data.finishDate !== null ? new Date(data.finishDate) : "-";
            let startDate = dtStart !== "-" ? dtStart.getHours() + ":" + dtStart.getMinutes() : "-";
            let finishDate = dtFinish !== "-" ? dtFinish.getHours() + ":" + dtFinish.getMinutes() : "-";
            arr.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{data.header}</td>
                    <td>{data.content}</td>
                    <td>{startDate}</td>
                    <td>{finishDate}</td>
                    <td>{data.presentationTime}</td>

                    <td>
                        {/*<Button style={{margin: 5}}*/}
                                {/*onClick={this.__fillAreasWithSelectedDepartment.bind(undefined, data)}>*/}
                            {/*Update*/}
                        {/*</Button>*/}
                        {/*<Button style={{margin: 5}}*/}
                                {/*onClick={this.__onDelete.bind(undefined, data)}>*/}
                            {/*Delete*/}
                        {/*</Button>*/}
                    </td>
                </tr>);
        }
        return arr;
    }


    __clearForm() {
        this.setState({
            id: undefined,
            name: "",
            description: "",
            meeting: "",
            buttonName: "Add New ",
            update: false,
            meetings: []
        });
    };

    openModal = () => {
        this.setState({
            visible: true
        });
    };

    closeModal = () => {
        this.__clearForm();
        this.setState({

            visible: false
        });
    };


    __getEventsData = () => {

        let method = "GET";
        let thiss = this;
        RequestUtils.makeRequest("event/getAll", method, null, function (complete) {
            console.error(complete);
        }, function (success, statusText, jqXHR) {
                if (jqXHR.status === 200) {
                    let eventsData = success;
                    thiss.setState({
                        eventsData: eventsData
                    });
                }
        }, function (jqXHR, textStatus, error) {
            console.error(jqXHR);
            console.error(textStatus);
        });

    };
    __saveEvent = (e) => {

        let event = {
            header: this.state.header,
            presentationTime: this.state.presentationTime
        };
        let method = "POST";

        RequestUtils.makeRequest("event", method, event, function (complete) {
            console.error(complete);
        }, function (success, statusText, jqXHR) {
            if (jqXHR.status === 200 && jqXHR.responseJSON.data !== null) {
                if (jqXHR.status === 200) {
                    Toast.success("Events saved successfully...");
                    this.__getEventsData();
                    this.__clearForm()
                }
            }
        }, function (jqXHR, textStatus, error) {
            Toast.error("Events saved error...");
            console.error(jqXHR);
            console.error(textStatus);
        });

        this.closeModal();

    };
    __onDelete = (data) => {

    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.eventsData) {
            this.setState({
                eventsData: nextProps.eventsData
            });
        }
    };


    componentDidMount() {
        this.__getEventsData();
    };


}
