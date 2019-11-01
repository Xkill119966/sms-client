import React from 'react'
import { Breadcrumb } from 'antd';
import { Divider } from 'antd';
import { Button } from 'antd';
import { Avatar } from 'antd';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'
import api from 'apis';
const moment = require('moment');
const imgurl = "http://localhost:9005/"
class Employee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await api.get(`employees/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }
    }

    render() {
        const data = this.state.data;

        console.log();

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="employee">Employee</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>View Employee</Breadcrumb.Item>
                </Breadcrumb><br />
                <Button style={{ position: 'absolute', right: '2em', top: '5em' }} onClick={() => window.history.go(-1)}><Icon type="left" />
                    Go Back
                </Button>
                <h1>Employee</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>You can view Employee</Breadcrumb.Item>
                </Breadcrumb><br />

                <Avatar
                style = {{marginLeft : '40%'}}
                    src={imgurl + data.image}
                    shape="square" size="large"
                />
                <br /><br />
                <div>
                    <Divider orientation="left" style={{ fontSize: '13px' }}>Personal Information</Divider><br />
                    <div style={{
                        marginLeft: '4em', marginRight: '27em', display: 'inline-block',
                        width: '200px', textAlign: 'left'
                    }}>
                        Name:<span style={{ marginLeft: '2em', color: '#000000', fontSize: '1.1em' }}>
                            {data.name} </span><br /><br />
                        NRC:<span style={{ marginLeft: '3em', color: '#000000', fontSize: '1.1em' }}>
                            {data.nric}</span></div>
                    <div style={{ display: 'inline-block' }}>Code:
                <span style={{ marginLeft: '4em', color: '#000000', fontSize: '1.1em' }}>{data.code}</span><br /><br />
                        Date of Birth: <span style={{ marginLeft: '1em', color: '#000000', fontSize: '1.1em' }}>
                            {moment(data.dob).format('YY/MM/DD')}</span></div>

                </div><br /><br />
                <div >
                    <Divider orientation="left" style={{ fontSize: '13px' }}>Parent Information</Divider><br />
                    <div style={{
                        marginLeft: '4em', marginRight: '27em', display: 'inline-block',
                        width: '200px', textAlign: 'left'
                    }}>
                        Father Name:<span style={{ marginLeft: '1em', color: '#000000', fontSize: '1.1em' }}>
                            {data.father_name}</span><br /><br />
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '5em' }}>Mother Name:
                <span style={{ marginLeft: '2em', color: '#000000', fontSize: '1.1em' }}>{data.mother_name}</span><br /><br />
                    </div>
                </div><br /><br />
                <div>
                    <Divider orientation="left" style={{ fontSize: '13px' }}>Job Information</Divider><br />
                    <div style={{
                        marginLeft: '4em', marginRight: '27em', display: 'inline-block',
                        width: '200px', textAlign: 'left'
                    }}>
                        Position:<span style={{ marginLeft: '2em', color: '#000000', fontSize: '1.1em' }}>
                            {data.posname}</span><br /><br />
                        Start Date:<span style={{ marginLeft: '2.5em', color: '#000000', fontSize: '1.1em' }}>
                            {moment(data.start_date).format('YY/MM/DD')}</span></div>
                    <div style={{ display: 'inline-block', position: 'absolute' }}>Department:
                <span style={{ marginLeft: '2em', color: '#000000', fontSize: '1.1em' }}>{data.depname}</span><br /><br />
                    </div>
                </div><br /><br />
                <div >
                    <Divider orientation="left" style={{ fontSize: '13px' }}>Contact Information</Divider><br />
                    <div style={{
                        marginLeft: '4em', marginRight: '20em', display: 'inline-block',
                        width: '300px', textAlign: 'left'
                    }}>
                        Email:<span style={{ marginLeft: '2em', color: '#000000', fontSize: '1.1em' }}>
                            {data.email}</span><br /><br />
                        Permanment Address:<br /><span style={{ margin: '0em', color: '#000000', fontSize: '1.1em' }}>
                            {data.parmanent_address}</span></div>
                    <div style={{ display: 'inline-block', position: 'absolute' }}>Phone:
                <span style={{ marginLeft: '4em', color: '#000000', fontSize: '1.1em' }}>{data.phone}</span><br /><br />
                        Temporary Address:<br /> <span style={{ color: '#000000', fontSize: '1.1em' }}>
                            <br />{data.temporary_address}</span></div>

                </div><br /><br />
                <div >
                    <Divider orientation="left" style={{ fontSize: '13px' }}>Other Information</Divider><br />
                    <div style={{
                        marginLeft: '4em', marginRight: '20em', display: 'inline-block',
                        width: '300px', textAlign: 'left'
                    }}>
                        Education:<br /><span style=
                            {{ marginRight: '5em', color: '#000000', fontSize: '1.1em' }}>
                            {data.education}
                        </span><br /><br />
                    </div>
                    <div style={{ display: 'inline-block', position: 'absolute' }}>Social Media Links: <br />
                        <span style=
                            {{ color: '#000000', fontSize: '1.1em' }}>{data.social_media_link}
                        </span><br /><br />
                    </div>
                </div><br /><br />
                <div>
                    <Link to={`/employees/edit/${this.state.id}`}><Button style={{ width: '85px', height: '30px', color: 'white', borderRadius: '10px', backgroundColor: '#0B0B61', textAlign: 'center', fontStyle: 'Book Man Old Style', marginLeft: '2em' }} type="edit">Edit</Button></Link>
                </div>
            </div>
        )
    }
}
export default Employee;