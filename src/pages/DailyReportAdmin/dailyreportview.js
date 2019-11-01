import React from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

import { Divider } from 'antd';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from 'apis';
const moment = require('moment');

class DailyReportViewAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    async  getData() {
        const response = await api.get(`reports/${this.state.id}`);
        console.log("Reponse Data", response);

        if (response && response.status == 200) {
            let data = response.data.data;

            this.setState({ data: data })

        }
    }
    render() {
        console.log("Daily Repoer", this.state.data);
        const data = this.state.data;
        return <div>
            {this.state.data !== undefined ? (
                <div>
                <PageHeaderWrapper title='View Daily Report' para='You can view Daily Report.' />
                <Link to="/dailyreport">
                    <Button style={{ position: 'absolute', right: '2em', top: '7em', color: "white", backgroundColor: "black" }}>
                        <Icon type="left" />
                        Go Back
                    </Button>
                </Link>

                <Divider orientation='left'>Daily Report</Divider>
                <br />
                <Row style={{ marginLeft: '3em' }}>
                    <Col span={6}>Date:</Col>
                    <Col span={4}>Heloo</Col>

                    <Col span={6} offset={4}>FUP Number:</Col>
                    <Col span={4}>{data.fup_number}</Col>

                </Row>

                <br /> <br /> <br />
                <Row style={{ marginLeft: '3em' }}>
                    <Col span={6}>WorkingHour:</Col>
                    <Col span={4}>{data.working_hour}</Col>
                </Row>
                <br /> <br /> <br />
                <Row style={{ marginLeft: '3em' }}>
                    <Col span={6}>Description:</Col>
                    <Col span={4}>{data.description}</Col>
                </Row>
                <br /> <br /> <br />
                <Row style={{ marginLeft: '3em' }}>
                    <Col span={6}>Remark:</Col>
                    <Col span={4}>{data.remark}</Col>
                </Row>


                </div>
                ) :
                (
                    <h1> This Employee have no report</h1>
                )
            }


        </div>

    }
}
export default DailyReportViewAdmin;