import React from 'react';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { Divider } from 'antd';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from 'apis';
const moment = require('moment');
 
class Complain extends React.Component {
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
        const response = await api.get(`complains/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;

            this.setState({ data: data })

        }
    }
    render() {
        // const {id}=this.props.location.state;
        const {working_hour, model_number, complain_number,
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
            complain_description, location } = this.state.data;
             
        return <div>
            <PageHeaderWrapper title='View Complain' para='You can view Complain basic data.' />
            <Link to="/complains">

                <Button style={{ position: 'absolute', right: '2em', top: '7em' }} type="primary">
                    <Icon type="left" />
                    Go back
        </Button>

            </Link>
            <Divider orientation='left'>Complain Information</Divider><br/><br/>
                <Row>
                    <Col span={6}>Complain Number:</Col>
                    <Col span={4}>{complain_number}</Col>
                    <Col span={6} offset={4}>Model number:</Col>
                    <Col span={4}>{model_number}</Col>

                </Row>
                <br />
                <Row>
                    <Col span={6}>Warranty hour:</Col>
                    <Col span={4}>{warranty_year}</Col>
                    <Col span={6} offset={4}>Warranty description:</Col>
                    <Col span={4}>{warranty_description}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>FUP number:</Col>
                    <Col span={4}>{fup_number}</Col>

                </Row>
                <br />
                <Row>
                    <Col span={6}>Working hour:</Col>
                    <Col span={4}>{working_hour}</Col>
                    <Col span={6} offset={4}>Customer Ph No:</Col>
                    <Col span={4}>{customer_phone}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Customer Name:</Col>
                    <Col span={4}>{customer_name}</Col>
                    <Col span={6} offset={4}>Location:</Col>
                    <Col span={4}>{location}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Distance:</Col>
                    <Col span={4}>{distance}</Col>
                    <Col span={6} offset={4}>Department:</Col>
                    <Col span={4}>{name}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Date:</Col>
                    <Col span={4}>{moment(date).format('YYYY-MM-DD')}</Col>
                    <Col span={6} offset={4}>Job Title:</Col>
                    <Col span={4}>{job_title}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Amount:</Col>
                    <Col span={4}>{location}</Col>
                    <Col span={6} offset={4}>Description:</Col>
                    <Col span={4}>{complain_description}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Complain Job Title:</Col>
                    <Col span={4}>{job_title}</Col>

                </Row>

            
            <Link to={"/complains/edit/" + this.state.id}><Button htmlType="submit" shape='round' style={{ position: 'relative', top: '1.5em', left: '3em', fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>Edit</Button></Link>

        </div>
    }
}
export default Complain;