import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from '../../components/InlineCustomTable/CustomTable';
import {getUserInfo,getUserToken } from '../../utils';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import {fetchModel, deleteModel, putModel, postModel} from '../../actions/Model';
import { getPermissionByRole } from '../../actions/Auth';

import { connect } from "react-redux";
import './index.css';
const uuidv4 = require('uuid/v4');



class Model extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    this.props.getPermissionByRole()   
    this.getAllModel();
  }

   getAllModel(){
    console.log(this.props.fetchModel())
  }

  //update position
  editModel=(data,id)=>{
   this.props.putModel(data,id);
  }

  // to create new position
  createNewModel=(data)=>{
    let userInfo=getUserInfo();
    data.created_by="admin";
    data.updated_by='';
    this.props.postModel(data);
  }

   // to delete position
   deleteModel =(id)=>{
    this.props.deleteModel(id);
  }

  render() {
    const columns = [
      {
        title: 'Model Name',
        dataIndex: 'model_number',
        key: 'name',
        align: 'center',
        editable: true,
       
        width: '20%',
        color: 'red',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.name.length - b.name.length
      },
      
      {
        title: 'Description',
        dataIndex: 'description',
        width: '65%',
        backgroundcolor: '#343434',
        align: 'center',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      }
    ];
    let permission = this.props.permission.map(a => a.perform);
    const list = permission.filter(a => a === 'modellist')
    const edit = permission.filter(a => a === 'modeledit')
    const create = permission.filter(a => a === 'modelcreate')
    const perform = {
      create: edit,
      edit: create
    }     

    const newData = {
      title: "",
      code: "",
      description: ""

    }

    let data = this.props.model;
    console.log(data);
    
      data.map(d=>{
        let uuid=uuidv4();
        d.key=uuid;
      })

    return (
      <div>
        <Can
          role= {this.props.roleid}
          perform= {list}
          no={() => {
            return <Forbidden />
          }}
        >
          
         <PageHeaderWrapper title='Position' para='you can add position basic data by entering one by one using following form.'/>
         
          <EditableTable
            dataSource={data}
            columns={columns}
            title="Model List"
            role= {this.props.roleid}
            perform={perform}
            newData={newData}
            getData={this.getAllModel}
            editData={(data,id)=>this.editModel(data,id)}
            createNewData={(data)=>this.createNewModel(data)}
            deleteData={(id)=> this.deleteModel(id)}
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
    positions: state.position.list,
    model : state.model.list,
    permission: state.permission.list
  };
}
export default  connect(
  mapStateToProps,
  { fetchModel, postModel, putModel, deleteModel, getPermissionByRole }
)(Model);