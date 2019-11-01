import React from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import ScrollTable from './CustomScrollTable'
import { fetchEmployee, putEmployee, postEmployee, deleteEmployee } from '../../actions/Employee'
import { connect } from "react-redux";
import './dailyreportview.js'
const uuidv4 = require('uuid/v4');

class DailyReportAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEmployee();
  }
  render() {
    const columns = [
      {
        title: 'Name',
        width: 250,
        dataIndex: 'name',
        backgroundcolor: '#fafafa',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'NRIC',
        width: 250,
        dataIndex: 'nric',
        backgroundcolor: '#fafafa',
        key: 'nric',
        sorter: (a, b) => a.nric.length - b.nric.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Position',
        dataIndex: 'depname',
        backgroundcolor: '#fafafa',
        key: 'name',
        width: 250,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Address',
        dataIndex: 'parmanent_address',
        backgroundcolor: '#fafafa',
        key: 'address',
        width: 250,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'PhoneNumber',
        dataIndex: 'phone',
        backgroundcolor: '#fafafa',
        key: 'phone_no',
        width: 250,
        sorter: (a, b) => a.job_title.length - b.job_title.length,
        sortDirections: ['descend', 'ascend']
      },
    ];

    const data = this.props.employees;
    console.log("EMP Data from report", data);
    
    
    data.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })
    return (
      <div>
        <PageHeaderWrapper title='Daily Report' para='You can view Daily Report  data by entering one by one using the following form.' />

        {/* <PageHeaderWrapper /> */}
        <br />
        <ScrollTable
          dataSource={data}
          columns={columns}
          title="Daily Report List"
          role="Admin"
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
    employees: state.employee.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchEmployee, postEmployee, putEmployee, deleteEmployee }
)(DailyReportAdmin);

