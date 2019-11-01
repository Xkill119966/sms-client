import React from 'react'

import { Breadcrumb } from 'antd';
import BreadcrumbItem from 'antd';
import { Card } from 'antd';
import { Col, Row } from 'antd';
import { connect } from "react-redux";
import { Input } from 'antd';
import './index.css'
import api from 'apis';
import Reports from './Report';
import { Select } from 'antd'
import { fetchSchedules, putSchedule, postSchedule, deleteSchedule } from '../../actions/Schedule';
const moment = require('moment');
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Search = Input.Search;
const { Option } = Select;

const { TextArea } = Input;

class DailyReport extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      data: []
    }
  }

  componentDidMount() {
    this.getSchedule();

  }

  async getData(idd) {
    const response = await api.get(`schedules/${idd}`);
    if (response && response.status == 200) {
      this.setState({ data: response.data.data, id: idd })
    }
  }

  async getSchedule() {
    this.props.fetchSchedules();
  }

  handleChange = (value) => {
    this.getData(value);
  }



  render() {

    const { job_code, sdate, edate, fup_number } = this.state.data;
    var start = new Date(sdate);
    var end = new Date(edate);
    var diffTime = Math.abs(end.getTime() - start.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var div = [];
    console.log("TOday date", moment().format('YYYY/MM/DD'));
    console.log("Start date", moment().isBefore(sdate));

    // for (var i = 0; i <= diffDays; i++) {
    if (moment().format('YYYY/MM/DD') !== moment(edate).format('YYYY/MM/DD')) {
      div.push(
        <Reports date={start.getDate()} month={start.getMonth() + 1} year={start.getFullYear()} fup={fup_number} id={this.state.id} />
      );
    }
    //  else if (moment().format('YYYY/MM/DD') === moment(edate).format('YYYY/MM/DD')) {
    //   return (
    //     <React.Fragment>
    //       <h1>There is no report</h1>
    //     </React.Fragment>
    //   )
    // }
    // } else {
    //   return (
    //   <React.Fragment>
    //     <h1>There is no report</h1>
    //   </React.Fragment>
    //   )
    // }

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item style={{ color: '#000000', fontStyle: 'Book Man Old Style' }}>Daily Reports </Breadcrumb.Item>
        </Breadcrumb><br />
        <h2>Daily Report</h2>
        <p> You can view Daily Report  data by entering one by one using the following form.You can view
                    Daily Report  data by entering one by one using the following form. </p>

        {/* <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200, height: 40, float: 'right' }}
        /><br /><br /> */}
        <Select style={{ width: 200, float: 'right' }} onChange={this.handleChange}>
          {this.props.schedules.map(item => {
            return <Option value={item.id}>{item.job_code}</Option>
          })}
        </Select>
        <br /><br />
        <div>
          <Card title="Daily Report" headStyle={{ fontStyle: 'Book Man Old Style' }} style={{ borderTopRightRadius: '50px' }} >



            <Card title={job_code} style={{ width: 900, borderRadius: "0px 50px 0 160px" }} >
              {div}
              {div = []}
            </Card>


          </Card>

        </div>

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
  { fetchSchedules, putSchedule, postSchedule, deleteSchedule }
)(DailyReport);
