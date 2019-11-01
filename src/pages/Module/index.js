import React from 'react';

import { Table, Divider, Tag } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchModules, putModule, postModule, deleteModule } from '../../actions/Module'
import { connect } from "react-redux";
import CustomTable from './CustomTable'
import './index.css';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'

const uuidv4 = require('uuid/v4');

const Search = Input.Search;

const routes = [
  {
    path: 'User Management',
    breadcrumbName: 'User Management'
  },

  {
    path: 'Modules',
    breadcrumbName: 'Modules'
  }

];

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    this.getAllModule();
  }

  getAllModule() {
    console.log("Get", this.props.fetchModules())
  }

  
  deleteModule = (id) => {
    this.props.deleteModule(id);
  }

  render() {
    const columns = [
      {
        title: 'Controller Name',
        dataIndex: 'controller',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],

      },
      {
        title: 'Action Name',
        dataIndex: 'action',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],

      },
      {
        title: 'Remark',
        dataIndex: 'remark',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],

      }
    ];

   

    let dataSource = this.props.module;
    console.log("DataSouce", dataSource);

    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div className='wrap'>
      <PageHeaderWrapper title="Module" breadcrumb={{ routes }} />

      <p>You can add module basic data by one after clicking the Add New button and can see the employees' data in table.</p>
      <Link to="/module/create">
        <Button style={{ color: 'yellow', backgroundColor: '#333' }} size='large'>Create New Module</Button>
      </Link>
     

        <CustomTable
          dataSource={dataSource}
          columns={columns}
          title="Module List"
          role={this.props.roleid}
          // perform={permission}
          // newData={newData}
          getData={this.getAllPosition}
          editData={(data, id) => this.editPosition(data, id)}
          createNewData={(data) => this.createNewPosition(data)}
          deleteData={(id) => this.deleteModule(id)}
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
    module: state.module.list
  };
}
export default connect(
  mapStateToProps,
  { postModule, fetchModules, putModule, deleteModule }
)(Module);;

