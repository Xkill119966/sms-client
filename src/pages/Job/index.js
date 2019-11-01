import React from 'react'
import { Input } from 'antd';
import { Link, Route } from 'react-router-dom'
// import {Button,Table} from 'antd';
import { connect } from "react-redux";
import { fetchSchedules } from '../../actions/Schedule';
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import ScrollTable from './CustomScrollTable';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
// import  './jobview.js';
import api from 'apis';
const uuidv4 = require('uuid/v4');

// const Search = Input.Search;

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.fetchSchedules();
    this.getData();
  }

  async getData() {
    const data = localStorage.getItem("emp");
    const empData = JSON.parse(data);
    console.log("EMP Data from JOb", empData);
    
    const response = await api.get(`schedules/`);
    if (response && response.status == 200) {
      this.setState({ data: response.data.data })
  }

  }


  render() {

    const columns = [
      {
        title: 'FUP No',
        width: 250,
        dataIndex: 'fup_number',
        backgroundcolor: '#fafafa',
        key: 'fup_no',
        sorter: (a, b) => a.fup_no.length - b.fup_no.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Complain No',
        width: 250,
        dataIndex: 'complain_number',
        backgroundcolor: '#fafafa',
        key: 'complain_no',
        sorter: (a, b) => a.complain_no.length - b.complain_no.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Model No',
        dataIndex: 'model_number',
        backgroundcolor: '#fafafa',
        key: 'model_no',
        width: 250,
        sorter: (a, b) => a.model_no.length - b.model_no.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Job Code',
        dataIndex: 'job_code',
        backgroundcolor: '#fafafa',
        key: 'job_code',
        width: 250,
        sorter: (a, b) => a.job_code.length - b.job_code.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Job Title',
        dataIndex: 'job_title',
        backgroundcolor: '#fafafa',
        key: 'job_title',
        width: 250,
        sorter: (a, b) => a.job_title.length - b.job_title.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Status',
        dataIndex: 'job_status',
        key: 'job_status',
        backgroundcolor: '#fafafa;',
        width: 300,
        fixed: 'right'
      }
    ];

    const perform = {
      create: "position:create",
      edit: "position:edit"
    }
    const newData = {
      title: "",
      description: ""
    }

   let data = this.props.schedules
    
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div>
        {/* <Can
          role="Admin"
          perform="position:list"
          no={() => {
            return <Forbidden />
          }}
        > */}
          <PageHeaderWrapper title='Job' para='You can view job data in following table' />
          {/* <PageHeaderWrapper /> */}
          <ScrollTable
            dataSource={data}
            columns={columns}
            title="Job List"
            role="Admin"
            perform={perform}
            newData={newData}
            getData={this.getAllJob}
            getdata={(id) => this.getJob(id)}
          />
        {/* </Can> */}
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
    schedules: state.schedule.list,
  };
}

export default connect(
  mapStateToProps,
  { fetchSchedules }
)(Job);