import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from '../../components/InlineCustomTable/CustomTable';
import { getUserInfo, getUserToken } from '../../utils';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchRole, putRole, postRole, deleteRole } from '../../actions/Role';
import {getPermissionByRole} from '../../actions/Auth'
import { connect } from "react-redux";

const uuidv4 = require('uuid/v4');



class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.getPermissionByRole()
    this.getAllRole();
  }

  getAllRole() {
    console.log(this.props.fetchRole())
  }

  //update position
  editPosition = (data, id) => {
    this.props.putRole(data, id);
  }

  // to create new position
  createNewPosition = (data) => {
    let userInfo = getUserInfo();
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postRole(data);
  }

  // to delete position
  deletePosition = (id) => {
    this.props.deleteRole(id);
  }

  render() {
    const columns = [
      {
        title: 'Role Name',
        dataIndex: 'name',
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
        width: '45%',
        backgroundcolor: '#343434',
        align: 'center',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      },
    ];
   
    const newData = {
      title: "",
      code: "",
      description: ""

    }

    let data = this.props.roles;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    const permission = this.props.permission.map(a => a.perform );
    console.log(permission);
    
    const list = permission.filter(a => a === 'rolelist')
    const edit = permission.filter(a => a === 'roleedit')
    const create = permission.filter(a => a === 'rolecreate')
    const perform = {
      create: edit,
      edit: create
    }    

    return (
      <div>
        <Can
          role={this.props.roleid}
          perform= {list}
          no={() => {
            return <Forbidden />
          }}
        >

          <PageHeaderWrapper title='Role' para='you can add position basic data by entering one by one using following form.' />

          <EditableTable
            dataSource={data}
            columns={columns}
            title="Role List"
            role= {this.props.roleid}
            perform={perform}
            newData={newData}
            getData={this.getAllPosition}
            editData={(data, id) => this.editPosition(data, id)}
            createNewData={(data) => this.createNewPosition(data)}
            deleteData={(id) => this.deletePosition(id)}
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
    roles: state.role.list,
    permission: state.permission.list
  };
}
export default connect(
  mapStateToProps,
  { fetchRole, putRole, postRole, deleteRole,getPermissionByRole }
)(Role);