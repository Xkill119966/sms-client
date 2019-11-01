import React from 'react';
//component
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import CustomTable from './CustomTable';
import Can from '../../../src/utils/Can';
import Forbidden from '../Forbidden';
import { fetchSchedules, fetchSchedule, putSchedule, postSchedule, deleteSchedule } from '../../actions/Schedule';
import { connect } from "react-redux";
import {getPermissionByRole} from '../../actions/Auth'
const moment = require('moment');

const uuidv4 = require('uuid/v4');


class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.getPermissionByRole()
    this.getAllSchedule();
  }

  getAllSchedule() {
    this.props.fetchSchedules()
  }
  getSchedule(id) {
    this.props.fetchSchedule(id);
  }

  //update Schedule
  editSchedule = (data, id) => {
    const editData = {
      job_status: data.job_status
  }
    this.props.putSchedule(editData, id);
  }

  // to create new Schedule
  createNewSchedule = (data) => {
    data.created_by = "admin";
    data.updated_by = '';
    this.props.postSchedule(data);
  }

  // to delete Schedule
  deleteSchedule = (id) => {
    this.props.deleteSchedule(id);
  }

  render() {
    const dataSource = this.props.schedules

    const columns = [
      {
        title: 'Job Code',
        dataIndex: 'job_code',
        width: 150,
        sorter: (a, b) => a.jcode.length - b.jcode.length,
        sortDirections: ['ascend', 'descend'],
        fixed: 'left'

      },
      {
        title: 'Complain Number',
        dataIndex: 'complain_number',
        width: 250,
        sorter: (a, b) => a.complain_no.length - b.complain_no.length,
        sortDirections: ['ascend', 'descend'],
        fixed: 'left'


      },
      {
        title: 'Service Man',
        dataIndex: 'employee_name',
        width: 500,
        sorter: (a, b) => a.serviceman.length - b.serviceman.length,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Start Date',
        dataIndex: 'sdate',
        width: 200,
        sorter: (a, b) => { var as = a.sdate.replace(/[-]/g, ''); var bs = b.sdate.replace(/[-]/g, ''); return as - bs; },
        sortDirections: ['ascend', 'descend'],

      },
      {
        title: 'End Date',
        dataIndex: 'edate',
        width: 200,

        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => { var as = a.edate.replace(/[-]/g, ''); var bs = b.edate.replace(/[-]/g, ''); return as - bs; }
      },
      {
        title: 'Status',
        dataIndex: 'job_status',
        width: 110,
        fixed: 'right'
      },

    ];
    const perform = {
      create: "position:create",
      edit: "position:edit"
    }
    const newData = {
      title: "",
      description: ""
    }
    const permission = this.props.permission.map(a => a.perform);
    const a = permission.filter(a => a === 'schedulelist')


    let data = this.props.schedules;
    data.map(d => {
      d.edate = moment(d.edate).format('YYYY/MM/DD');
      d.sdate = moment(d.sdate).format('YYYY/MM/DD')
      let uuid = uuidv4();
      d.key = uuid;
    })

    return (
      <div>
        <Can
          role= {this.props.roleid}
          perform= {a}
          no={() => {
            return <Forbidden />
          }}
        >
          <PageHeaderWrapper title='Schedule' para='You can add Schedule basic data by using following form.' />
          <CustomTable
            dataSource={dataSource}
            columns={columns}
            title="Schedule List"
            role= {this.props.roleid}
            perform={permission}
            newData={newData}
            getData={this.getAllSchedule}
            getdata={(id) => this.getSchedule(id)}
            editData={(data, id) => this.editSchedule(data, id)}
            createNewData={(data) => this.createNewSchedule(data)}
            deleteData={(id) => this.deleteSchedule(id)}
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
    schedules: state.schedule.list,
    permission: state.permission.list
  };
}
export default connect(
  mapStateToProps,
  { fetchSchedules, fetchSchedule, putSchedule, postSchedule, deleteSchedule, getPermissionByRole }
)(Schedule);
