import React from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Divider } from 'antd';
import ScrollTable from '../CustomScrollTable';
import { Button, Table } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { Link } from 'react-router-dom';
import api from 'apis';
import { connect } from "react-redux";
import { fetchComplain } from '../../../actions/Complain'
import '../index.css';
const moment = require('moment');
const uuidv4 = require('uuid/v4');



class AssignSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }

    componentDidMount() {
        this.getAllComplain()
        this.getData();
    }


    getAllComplain() {
        this.props.fetchComplain()
    }
    async getData() {
        const response = await api.get(`complains/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }

    }

    render() {

        const { working_hour, model_number, complain_number,
            fup_number,
            warranty_year,
            warranty_description,
            customer_phone,
            customer_name,
            name,
            distance,
            job_title,
            date,
            amount,
            complain_job_title,
            complain_description, location } = this.state.data;
        const columns = [
            {
                title: 'Model No',
                dataIndex: 'model_number',
                width: 100

            },
            {
                title: 'FUP No',
                dataIndex: 'fup_number',
                width: 100
            },
            {
                title: 'Complain No',
                dataIndex: 'complain_number',
                width: 100,

            },
            {
                title: 'Date',
                dataIndex: 'date',
                width: 100,

            },
            {
                title: 'Status',
                dataIndex: 'complain_status',
                width: 100,

            },
        ];

        const dataSource = this.props.complain;
        console.log("Data", dataSource);

        dataSource.map(d => {
            let uuid = uuidv4();
            d.key = uuid;
        })
        return (
            <div>
                <PageHeaderWrapper title='' />
                <Divider orientation='left'>Complain Information</Divider><br/><br/>
                    <Row>
                        <Col span={5} offset={1}>Complain Number:</Col>
                        <Col span={4}>{complain_number}</Col>
                        <Col span={6} offset={4}>Model Number:</Col>
                        <Col span={4}>{model_number}</Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Warranty year:</Col>
                        <Col span={4}>{warranty_year}</Col>
                        <Col span={10} offset={4}><p>Warranty Description:<br /><span className='black'>{warranty_description}</span></p></Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>FUP Number:</Col>
                        <Col span={4}>{fup_number}</Col>

                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Working hr:</Col>
                        <Col span={4}>{working_hour}</Col>
                        <Col span={6} offset={4}>Customer Ph No:</Col>
                        <Col span={4}>{customer_phone}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Customer Name:</Col>
                        <Col span={4}>{customer_name}</Col>
                        <Col span={6} offset={4}>Location:</Col>
                        <Col span={4}>{location}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Distance:</Col>
                        <Col span={4}>{distance}</Col>
                        <Col span={6} offset={4}>Department:</Col>
                        <Col span={4}>{name}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Date:</Col>
                        <Col span={4}>{moment(date).format('YYYY-MM-DD')}</Col>
                        <Col span={6} offset={4}>Job Title:</Col>
                        <Col span={4}>{job_title}</Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Amount:</Col>
                        <Col span={4}>{amount}</Col>
                        <Col span={10} offset={4}><p>Description<br /><span className='black'>{complain_description}</span></p></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={5} offset={1}>Complain Job Title:</Col>
                        <Col span={4}>{complain_job_title}</Col>
                    </Row>

                
                <div style={{ width: '85%', margin: ' 6% 13% 0 2%', borderRadius: '14px' }}>
                    <Divider orientation="left">Machine History</Divider>
                    <ScrollTable
                        dataSource={dataSource}
                        columns={columns}
                    />
                    <Link to= "/assingschedule"><Button shape='round' style={{ marginTop: '0', marginLeft: '2em', fontSize: '15px', color: 'white', backgroundColor: '#0014C0' }}>Accept</Button></Link>
                    <Link to="/machines"><Button shape='round' style={{ fontSize: '15px', marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }}>Reject</Button></Link>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        complain: state.complain.list,
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain }
)(AssignSchedule);