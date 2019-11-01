import React from 'react'
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import './AccView.js';
import ScrollTable from './CustomScrollTable'
import {fetchUsers, deleteUsers} from '../../actions/User';
import { connect } from "react-redux";
const uuidv4 = require('uuid/v4');

class AccountCreate extends React.Component{

  componentDidMount() {
    this.props.fetchUsers();
  }

  deleteAccount = (id) => {
    this.props.deleteUsers(id)
    
  }
    render(){
      console.log("User data from Api",this.props.users);
      
        const columns=[
            {
                title: 'Name',
                width: 200,
                dataIndex: 'user_name',
                backgroundcolor: '#fafafa',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend']
              },
              {
                title: 'NRIC',
                width: 300,
                dataIndex: 'nric',
                backgroundcolor: '#fafafa',
                key: 'nric',
                sorter: (a, b) => a.nric.length - b.nric.length,
                sortDirections: ['descend', 'ascend']    
              },
              { title: 'EmpCode', 
                dataIndex: 'emp_code',
                backgroundcolor: '#fafafa',
                key: 'code',
                width:300,
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend']
              },
             
              { 
                title: 'PhoneNumber',
                dataIndex: 'phone_no',
                backgroundcolor: '#fafafa',
                key: 'phone_no',
                width: 300,
                sorter: (a, b) => a.job_title.length - b.job_title.length,
                sortDirections: ['descend', 'ascend']
              },

              { 
                title: 'Email',
                dataIndex: 'email',
                backgroundcolor: '#fafafa',
                key: 'email',
                width: 300,
                sorter: (a, b) => a.job_title.length - b.job_title.length,
                sortDirections: ['descend', 'ascend']
              },
            ];
  
            const data = this.props.users;
            data.map(d => {
              let uuid = uuidv4();
              d.key = uuid;
            })


        
        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>User Management</Breadcrumb.Item>
                    <Breadcrumb.Item>Account Create</Breadcrumb.Item>
                </Breadcrumb><br/>
                <h2>Account Create</h2>
                <p>You can view Account Create data in following table.</p>
                <Link to='/createaccount'>
                    <Button style={{width:'18em',backgroundColor:'#A9A9A9',color:'yellow'}} type="submit" >Create New Account</Button>
                </Link>
                <br/><br/>
                <ScrollTable
                dataSource={data}
                columns={columns}
                title="Account List"
                role="Admin"
                deleteData={(id) => this.deleteAccount(id)}

                />
            </div>
        )
    }
}


function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    users: state.user.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchUsers, deleteUsers}
)(AccountCreate);
