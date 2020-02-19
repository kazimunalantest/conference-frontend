import React from 'react';

import Col from "react-bootstrap/lib/Col";
import Tabs from "react-bootstrap/lib/Tabs.js";
import Tab from "react-bootstrap/lib/Tab";

import Events from "../pages/Events.js";
import Licence from "../licence/Licence";

export default class ConferenceApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventsData: [],
        };
    }

    render() {
        return (
            <Col>

                <Licence/>
                <Col style={{paddingLeft: 100, paddingRight: 100}}>

                    <Tabs defaultActiveKey={1} onSelect={this.__onSelect} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Conference Events">
                            <Events eventsData={this.state.eventsData}/>
                        </Tab>

                    </Tabs>
                </Col>
            </Col>);
    }

    ;

    __onSelect = (key) => {
        if (key === 2) {

        }
        if (key === 1) {
        }
    };


}
