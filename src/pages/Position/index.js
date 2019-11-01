import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import EditableTable from '../../components/InlineCustomTable/CustomTable';
import { getUserInfo, getUserToken } from '../../utils';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchPosition, putPosition, postPosition, deletePosition } from '../../actions/Position';
import { getPermissionByRole } from '../../actions/Auth';
import { connect } from "react-redux";
import './index.css';
const uuidv4 = require('uuid/v4');



class Position extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.getPermissionByRole();
    this.getAllPosition();
  }

  getAllPosition() {
    this.props.fetchPosition()
  }

  //update position
  editPosition = (data, id) => {
    this.props.putPosition(data, id);
  }

  // to create new position
  createNewPosition = (data) => {
    console.log("Position ", data);

    this.props.postPosition(data);
  }

  // to delete position
  deletePosition = (id) => {
    this.props.deletePosition(id);
  }

  render() {
    const columns = [
      {
        title: 'Position Name',
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
        width: '65%',
        backgroundcolor: '#343434',
        align: 'center',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
      }
    ];
    
    const newData = {
      title: "",
      code: "",
      description: ""

    }

    let data = this.props.positions;
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })



    const permission = this.props.permission.map(a => a.perform );
    const list = permission.filter(a => a === 'positionlist')
    const edit = permission.filter(a => a === 'positionedit')
    const create = permission.filter(a => a === 'positioncreate')
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

          <PageHeaderWrapper title='Position' para='you can add position basic data by entering one by one using following form.' />

          <EditableTable
            dataSource={data}
            columns={columns}
            title="Position List"
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
    positions: state.position.list,
    permission: state.permission.list
  };
}
export default connect(
  mapStateToProps,
  { fetchPosition, putPosition, postPosition, deletePosition, getPermissionByRole }
)(Position);