import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Input, Popconfirm } from 'antd';
import { Link, Route } from 'react-router-dom'
import { fetchComplain, putComplain, postComplain, deleteComplain } from '../../actions/Complain'
import {getPermissionByRole} from '../../actions/Auth'
import Forbidden from '../Forbidden';
import Can from '../../utils/Can'
import { connect } from "react-redux";
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
    path: 'Complains',
    breadcrumbName: 'Complains'
  }

];

class Complain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    this.getAllComplain();
    this.props.getPermissionByRole()
  }

  getAllComplain() {
    console.log(this.props.fetchComplain())
  }

  delete = key => {
    const newData = this.props.complains;
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.deleteCpm(item.id);
    // message.success('Deleted !');
  };

  deleteCpm = (id) => {
    this.props.deleteComplain(id);
  }




  render() {
    const columns = [
      {
        title: 'Complain No',
        dataIndex: 'complain_number',
        
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],
        
      },
      {
        title: 'Model No',
        dataIndex: 'model_number',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],
       
      },
      {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],
        
        
       
      },
      {
        title: 'Distance',
        dataIndex: 'distance',
        
        

        
      },
      {
        title: 'Location',
        dataIndex: 'location',
        
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => { var as = a.sdate.replace(/[-]/g, ''); var bs = b.sdate.replace(/[-]/g, ''); return as - bs; }
      }
    ];
    const permission = this.props.permission.map(a => a.perform);
    const a = permission.filter(a => a === 'complainlist')

    console.log(permission);
    
    let dataSource = this.props.complains;
    dataSource.map(d => {
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

          <PageHeaderWrapper title="Complain" breadcrumb={{ routes }} />
          
          <p>You can add Complain basic data by one after clicking the Add New button and can see the employees' data in table.</p>
          <Link to="/complains/create">
            <Button style={{ color: 'yellow', backgroundColor: '#333' }} size='large'>Create New Complain</Button>
          </Link>

        <CustomTable
          dataSource={dataSource}
          columns={columns}
          title="Complain List"
          role={this.props.roleid}
          perform= {permission}
          // newData={newData}
          getData={this.getAllEmployee}
          // editData={(data, id) => this.editPosition(data, id)}
          // createNewData={(data) => this.createNewPosition(data)}
          deleteData={(id) => this.deleteCpm(id)}
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
    complains: state.complain.list,
    permission: state.permission.list
  };
}
export default connect(
  mapStateToProps,
  { fetchComplain, putComplain, postComplain, deleteComplain, getPermissionByRole }
)(Complain);