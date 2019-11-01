

import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import {getPermissionByRole} from '../../actions/Auth';
import { connect } from "react-redux";
import Can from '../../utils/Can';
import Forbidden from '../Forbidden'
import CustomTable from './CustomTable'
import './index.css';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
// import {  Typography } from 'antd';

const uuidv4 = require('uuid/v4');
const moment = require('moment')
const Search = Input.Search;
// const { Paragraph } = Typography;



const routes = [
  {
    path: 'Configuration',
    breadcrumbName: 'Configuration'
  },

  {
    path: 'Employees',
    breadcrumbName: 'Employees'
  }

];

class Employee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    this.getAllEmployee();
    this.props.getPermissionByRole();
  }

  getAllEmployee() {
    this.props.fetchEmployee()

  }



  deleteEmp = (id) => {
    this.props.deleteEmployee(id);
  }




  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 100,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],
        fixed: 'left'
      },
      {
        title: 'NRC',
        dataIndex: 'nric',
        width: 100,
        filters: [
          {
            text: 'DaKaMa',
            value: '12/DaKaMa',
          },
          {
            text: 'ThaKaTa',
            value: '12/ThaKaTa',
          },
          {
            text: 'ThaMaNa',
            value: '12/ThaMaNa',
          }
        ],
        fixed: 'left',
        onFilter: (value, record) => record.NRC.indexOf(value) === 0
      },
      {
        title: 'Position',
        dataIndex: 'posname',
        width: 100,
        filters: [
          {
            text: 'service',
            value: 'service'
          },
          {
            text: 'management',
            value: 'management'
          }
        ],
        fixed: 'left',
        onFilter: (value, record) => record.position.indexOf(value) === 0
      },
      {
        title: 'Department',
        dataIndex: 'depname',
        width: 100,
        filters: [
          {
            text: 'service',
            value: 'service'
          },
          {
            text: 'management',
            value: 'management'
          }
        ],

        onFilter: (value, record) => record.department.indexOf(value) === 0
      },
      {
        title: 'StartDate',
        dataIndex: 'start_date',
        width: 150,
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => { var as = a.sdate.replace(/[-]/g, ''); var bs = b.sdate.replace(/[-]/g, ''); return as - bs; }
      },
      {
        title: 'Address',
        dataIndex: 'parmanent_address',
        width: 200,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Phone No',
        dataIndex: 'phone',
        width: 150,
        defaultSortOrder: 'descend',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.phno - b.phno,
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        width: 150,
      },
      {
        title: 'DateofBirth',
        dataIndex: 'dob',
        key: 'dob',
        width: 150,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: 'Education',
        dataIndex: 'education',
        key: 'education',
        width: 250,
      },
      {
        title: 'Social Media Link',
        dataIndex: 'social_media_link',
        key: 'social_media_link',
        width: 250,
      },
      {
        title: 'Father Name',
        dataIndex: 'father_name',
        key: 'father_name',
        width: 200,
      },
      {
        title: 'Mother Name',
        dataIndex: 'mother_name',
        key: 'mother_name',
        width: 200,
      }
    ];
    
    const permission = this.props.permission.map(a => a.perform );
    const a = permission.filter(a => a === 'employeelist')
    let dataSource = this.props.employees;
    dataSource.map(d => {
      d.dob = moment(d.dob).format('YYYY/MM/DD');
      d.start_date = moment(d.start_date).format('YYYY/MM/DD')
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
        <Can
          role={this.props.roleid}
          perform= {a}
          no={() => {
            return <Forbidden />
          }}
        >

          <PageHeaderWrapper title="Employee" breadcrumb={{ routes }} />
          
          <p>You can add Employee basic data by one after clicking the Add New button and can see the employees' data in table.</p>
          <Link to="/employee/create">
            <Button style={{ color: 'yellow', backgroundColor: '#333' }} size='large'>Create New Employee</Button>
          </Link>

        <CustomTable
          dataSource={dataSource}
          columns={columns}
          title="Employee List"
          role={this.props.roleid}
          perform= {permission}
          // newData={newData}
          getData={this.getAllEmployee}
          // editData={(data, id) => this.editPosition(data, id)}
          // createNewData={(data) => this.createNewPosition(data)}
          deleteData={(id) => this.deleteEmp(id)}
        />

        </Can>
     
      </div >

    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    employees: state.employee.list,
    permission: state.permission.list
  };
}
export default connect(
  mapStateToProps,
  { fetchEmployee, postEmployee, putEmployee, deleteEmployee, getPermissionByRole }
)(Employee);
