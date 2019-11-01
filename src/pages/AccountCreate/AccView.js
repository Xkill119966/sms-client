import React from 'react'
import { Breadcrumb } from 'antd';
import { Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUserToken } from '../../utils'
import api from 'apis';
class AccView extends React.Component {

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
        var saveToken = getUserToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${saveToken}`;
        const response = await api.get(`users/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;

            this.setState({ data: data })

        }
    }


    render() {
        const data = this.state.data;
        console.log(this.state.data);
        
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>User Management</Breadcrumb.Item>
                    <Breadcrumb.Item>Account Create</Breadcrumb.Item>
                    <Breadcrumb.Item>Account Create View</Breadcrumb.Item>
                </Breadcrumb><br /><br />
                <h2>View Account Create</h2>
                <p>You can view Create Account</p>
                <Divider orientation='left'>Personal Information</Divider>
                <br /><br />
                <div style={{ marginLeft: '4em', display: 'inline-block' }}>
                    EmployeeID:<span style={{ marginLeft: '7em', color: '#000' }}>{data.emp_code}</span><br /><br />
                    Role:<span style={{ marginLeft: '10em', color: '#000' }}>{data.name}</span><br /><br />
                    NRIC:<span style={{ marginLeft: '10em', color: '#000' }}>{data.nric}</span><br /><br />
                    Phone_No:<span style={{ marginLeft: '8em', color: '#000' }}>{data.phone_no}</span>
                </div>

                <div style={{ marginLeft: '20em', display: 'inline-block', position: 'absolute' }}>
                    User Name:<span style={{ marginLeft: '6em', color: '#000' }}>{data.user_name}</span><br /><br />
                    Password:<span style={{ marginLeft: '6.5em', color: '#000' }}>{data.password_hash}</span><br /><br />
                    Confirm Password:<span style={{ marginLeft: '3em', color: '#000' }}>{data.password_cofirm}</span><br /><br />
                    Email:<span style={{ marginLeft: '7em', color: '#000' }}>{data.email}</span>
                </div>
                <br /><br /><br />
                <Link to={'/accounts/edit/' + this.state.id}>
                    <Button style={{ backgroundColor: '#87CEFA', width: '5em' }} type='edit' name='Edit'>Edit</Button>
                </Link>

            </div>
        )
    }
}

export default AccView;