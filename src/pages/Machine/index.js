

import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchMachines, fetchMachine, deleteMachine, postMachine } from '../../actions/Machine'
import {getPermissionByRole} from '../../actions/Auth';
import { connect } from "react-redux";
import Can from '../../utils/Can';
import Forbidden from '../Forbidden'
import CustomTable from './CustomTable'
import './index.css';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
// import {  Typography } from 'antd';

const uuidv4 = require('uuid/v4');

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
    this.getAllMachine();
    this.props.getPermissionByRole()
  }

  getAllMachine() {
    this.props.fetchMachines()

  }


  deleteMachine = (id) => {
    this.props.deleteMachine(id);
  }




  render() {

    const columns = [

      {
        title: 'Model Number',
        dataIndex: 'modelnumber',
        width: 320,
        sorter: (a, b) => a.modelno.length - b.modelno.length,

      },
      {
        title: 'Machine Serial Number',
        dataIndex: 'machine_serial_number',
        width: 320,
        sorter: (a, b) => a.msn.length - b.msn.length,
        sortDirections: ['ascend', 'descend'],


      },
      {
        title: 'Engine Serial Number',
        dataIndex: 'engine_serial_number',
        width: 320,
        sorter: (a, b) => a.esn.length - b.esn.length,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'FUP No',
        dataIndex: 'fup_number',
        width: 320,
        sorter: (a, b) => a.fup.length - b.fup.length,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Warranty Year',
        dataIndex: 'warranty_year',
        width: 315,
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.wyear - b.wyear
        // sorter: (a, b) => {var as=a.sdate.replace(/[-]/g,'');var bs=b.sdate.replace(/[-]/g,'');return as - bs ;}
      },
      {
        title: 'Working Hour',
        dataIndex: 'working_hour',
        width: 350,
        sorter: (a, b) => a.workinghr - b.workinghr,
        sortDirections: ['descend', 'ascend']
      },
    ];

    const permission = this.props.permission.map(a => a.perform);
    const a = permission.filter(a => a === 'machinelist')

    console.log(permission);

    let dataSource = this.props.machines;
    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
        <Can
          role={this.props.roleid}
          perform={a}
          no={() => {
            return <Forbidden />
          }}
        >

          <PageHeaderWrapper title="Employee" breadcrumb={{ routes }} />
          
            <p>You can add Machine basic data by one after clicking the Add New button and can see the employees' data in table.</p>
            <Link to="/machines/create">
              <Button style={{ color: 'yellow', backgroundColor: '#333' }} size='large'>Create New Machine</Button>
            </Link>

          <CustomTable
            dataSource={dataSource}
            columns={columns}
            title="Machine List"
            role={this.props.roleid}
            perform={permission}
            // newData={newData}
            getData={this.getAllMachine}
            // editData={(data, id) => this.editPosition(data, id)}
            // createNewData={(data) => this.createNewPosition(data)}
            deleteData={(id) => this.deleteMachine(id)}
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
    machines: state.machine.list,
    permission: state.permission.list
  };
}
export default connect(
  mapStateToProps,
  { fetchMachine, fetchMachines, deleteMachine, postMachine , getPermissionByRole}
)(Employee);
