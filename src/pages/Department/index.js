import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from '../../components/InlineCustomTable/CustomTable';

import {getUserInfo,getUserToken } from '../../utils';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import {fetchDepartment, putDepartment,postDepartment,deleteDepartment} from '../../actions/Department';
import {getPermissionByRole} from '../../actions/Auth';
import { connect } from "react-redux";
const uuidv4 = require('uuid/v4');


class Department extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    this.props.getPermissionByRole();   
    this.getAllDepartment();
  }

  getAllDepartment(){
    console.log(this.props.fetchDepartment())
  }

  //update position
  editDepartment=(data,id)=>{
   this.props.putDepartment(data,id);
  }

  // to create new position
  createNewDepartment=(data)=>{
    let userInfo=getUserInfo();
    data.created_by="admin";
    data.updated_by='';
    this.props.postDepartment(data);
  }

   // to delete position
   deleteDepartment=(id)=>{
    this.props.deleteDepartment(id);
  }

  render() {
    const columns = [
      {
        title: 'Depart Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        editable: true,
        width: '20%',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: 'Code',
        dataIndex: 'code',
        width: '20%',
        backgroundcolor: '#343434',
        align: 'center',
        key: 'code',
        sorter: (a, b) => a.code.length - b.code.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '45%',
        align: 'center',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      }
    ];
    const newData = {
      title: "",
      description: ""
    }

    let data=this.props.departments;
      data.map(d=>{
        let uuid=uuidv4();
        d.key=uuid;
      })
    const permission = this.props.permission.map(a => a.perform);
    const list = permission.filter(a => a === 'departmentlist')
    const edit = permission.filter(a => a === 'departmentedit')
    const create = permission.filter(a => a === 'departmentcreate')
    const perform = {
      create: edit,
      edit: create
    }  
    return (
      <div style={{backgroundColor:'white'}}>
        <Can
          role= {this.props.roleid}
          perform= {list}
          no={() => {
            return <Forbidden />
          }}
        >

          <PageHeaderWrapper title='Department' para='You can add model basic data by using following form.'/>

          {/* <PageHeaderWrapper /> */}
          <EditableTable
            dataSource={data}
            columns={columns}
            title="Department List"
            role= {this.props.roleid}
            perform={perform}
            newData={newData}
            getData={this.getAllDepartment}
            editData={(data,id)=>this.editDepartment(data,id)}
            createNewData={(data)=>this.createNewDepartment(data)}
            deleteData={(id)=>this.deleteDepartment(id)}
          />
        </Can>
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
    departments: state.department.list,
    permission: state.permission.list
  };
}
export default  connect(
  mapStateToProps,
  { fetchDepartment, putDepartment,postDepartment,deleteDepartment, getPermissionByRole }
)(Department);
