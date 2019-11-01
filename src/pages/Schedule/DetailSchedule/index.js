
import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { Divider } from 'antd';
import { Table } from 'antd';
import { Pagination } from 'antd';
import { Form, Input, Dropdown, Icon, label } from 'antd'
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import { fetchComplain } from '../../../actions/Complain';
import api from 'apis';
import './index.css';
import { Card } from 'antd';
const moment = require('moment');
const uuidv4 = require('uuid/v4');






class Schedule extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      data: [],
      currentPagination: 1
    }
  }

  componentDidMount() {
    this.props.fetchComplain();
    this.getData();
  }

  async getData() {
    const response = await api.get(`schedules/${this.state.id}`);
    if (response && response.status == 200) {
      this.setState({ data: response.data.data })
    }
  }



  render() {

    const data = this.state.data;
    console.log();

    const { currentPagination } = this.state;
    const onChange = page => {
      this.setState({
        currentPagination: page
      });
    };

    const columns = [
      {
        title: 'Model No',
        dataIndex: 'model_number',
        width: 100

      },
      {
        title: 'FUP No',
        dataIndex: 'fup_number',
        width: 100
      },
      {
        title: 'Complain No',
        dataIndex: 'complain_number',
        width: 100,

      },
      {
        title: 'Date',
        dataIndex: 'date',
        width: 100,

      },
      {
        title: 'Status',
        dataIndex: 'complain_status',
        width: 100

      },
      {
        title: 'Action',
        dataIndex: 'action',
        align: 'center',
        key: 'action',
        width: 100,
        render: (text, record) => (
          <span>
            <a style={{ color: 'green' }} href="javascript:;">View</a>
          </span>
        )
      }
    ];
    const dataSource = this.props.complain;
    console.log("Data", dataSource);

    dataSource.map(d => {
        let uuid = uuidv4();
        d.key = uuid;
    })
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item style={{ marginLeft: '0em', fontSize: '1.1em' }}> Schedule</Breadcrumb.Item>
          <Breadcrumb.Item style={{ marginLeft: '0em', color: '#000000', fontSize: '1.1em' }}>View Schedule</Breadcrumb.Item>
        </Breadcrumb>
        <Button style={{ width: '130px', height: '30px', color: 'white', borderRadius: '10px', backgroundColor: '#000000', textAlign: 'center', fontStyle: 'Book Man Old Style', marginLeft: '60em', fontWeight: 'bold' }} icon="arrow-left" type="goback">Go  Back</Button><br /><br />
        <div>
          <Divider orientation="left" style={{ fontSize: '13px' }}>Complain Information</Divider><br />
          <div style={{
            marginLeft: '4em', marginRight: '20em', display: 'inline-block',
            width: '300px', textAlign: 'left', position: 'relative'
          }}>
            Complain Number:<span style={{ marginLeft: '4em', color: '#000000', fontSize: '1.1em' }}>
              {data.complain_number}</span><br /><br />
            Working hour:<span style={{ marginLeft: '6em', color: '#000000', fontSize: '1.1em' }}>
              {data.working_hour}</span><br /><br />
            FUP Number:<span style={{ marginLeft: '6.5em', color: '#000000', fontSize: '1.1em' }}>
              {data.fup_number}</span><br /><br />
            Warranty Year:<span style={{ marginLeft: '6.3em', color: '#000000', fontSize: '1.1em' }}>
              {data.warranty_year}</span><br /><br />
            Customer Name:<span style={{ marginLeft: '5em', color: '#000000', fontSize: '1.1em' }}>
              {data.customer_name}</span><br /><br />
            Distance:<span style={{ marginLeft: '8em', color: '#000000', fontSize: '1.1em' }}>
              {data.distance}</span><br /><br />
            Date:<span style={{ marginLeft: '9.8em', color: '#000000', fontSize: '1.1em' }}>
            {moment(data.complain_job_titledate).format('YYYY-MM-DD')}</span><br /><br />
            Amount:<span style={{ marginLeft: '8.3em', color: '#000000', fontSize: '1.1em' }}>
              {data.amount} Kyats</span><br /><br />
            Complain Job Title:<span style={{ marginLeft: '3.5em', color: '#000000', fontSize: '1.1em' }}>
              {data.complain_job_title}</span><br /><br />
          </div>
          <div style={{ display: 'inline-block', position: 'absolute' }}>
            Model Number: <span style={{ marginLeft: '4.5em', color: '#000000', fontSize: '1.1em' }}>{data.model_number}</span><br /><br />
            Warranty Description: <span style={{ marginLeft: '1em', color: '#000000', fontSize: '1.1em' }}><br />
              {data.warranty_description}</span><br /><br />
            Customer Ph No: <span style={{ marginLeft: '3.8em', color: '#000000', fontSize: '1.1em' }}>
              {data.customer_phone}</span><br /><br />
            Location: <span style={{ marginLeft: '7em', color: '#000000', fontSize: '1.1em' }}>
              {data.location}</span><br /><br />
            Department: <span style={{ marginLeft: '5.5em', color: '#000000', fontSize: '1.1em' }}>
              {data.name}</span><br /><br />
            Job Title: <span style={{ marginLeft: '7em', color: '#000000', fontSize: '1.1em' }}>
              {data.job_title}</span><br /><br />
            Description: <span style={{ marginLeft: '1em', color: '#000000', fontSize: '1.1em' }}><br />
              {data.complain_description}</span><br /><br />
          </div>
        </div><br /><br />


        <div>
          <Divider orientation="left">Machine History</Divider>
          <Card bordered={false}>
            <Row>
              <Col sm={24} md={24} style={{ paddingBottom: '10px' }}>
                <div>
                  <Input shape="round" onSearch={value => console.log(value)}
                    style={{ width: '18%', float: 'right', paddingBottom: '10px' }}
                    prefix={<Icon type="search" />}
                    placeholder="Search" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={24} md={24}>
                <div style={{ border: '1px solid #e8e8e8' }}>
                  <Table
                    pagination={{
                      onChange: onChange,
                      position: 'bottom'
                    }}
                    dataSource={dataSource}
                    columns={columns}
                    bordered />
                </div>
              </Col>
            </Row>
          </Card><br />
          <Pagination defaultCurrent={1} total={50} style={{ textAlign: 'center' }} />
        </div>

        <div>
          <Divider orientation="left" style={{ fontSize: '13px' }}> Schedule Detail</Divider><br />

          <div>
            <Row>
              <Col span={6}><p>Job Code :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.job_code}</span></p></Col>
              <Col span={6}><p>Job Status :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.job_status}</span></p></Col>
              <Col span={6}><p>Job Title :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.job_title}</span></p></Col>
              <Col span={6}><p>Job Description :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.job_description}</span></p></Col>
            </Row>
            <br />
            <Row>
              <Col span={6}><p>Inspection :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.inspection}</span></p></Col>
              <Col span={6}><p>Watching List :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.watching_list}</span></p></Col>
              <Col span={6}><p>Amount :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.s_amount}</span></p></Col>
              <Col span={6}><p>Service Charge :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.service_charge}</span></p></Col>
            </Row>
            <br />
            <Row>
              <Col span={6}><p>Service Man List :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{data.employee_name}</span></p></Col>
              <Col span={6}><p>Time Interval :<br /><span className='black' style={{ color: '#000000', fontSize: '1.1em' }}>{moment(data.sdate).format('YYYY-MM-DD')} ~ {moment(data.edate).format('YYYY-MM-DD')}</span></p></Col>

            </Row>
          </div>




        </div><br /><br />
        <Button style={{
          width: '100px', height: '30px', color: 'white', borderRadius: '10px',
          backgroundColor: 'blue', textAlign: 'center', fontStyle: 'Book Man Old Style',
          marginRight: '60em', fontWeight: 'bold', position: 'absolute'
        }} type="edit">
          Edit
            </Button>


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
    complain: state.complain.list,
  };
}
export default connect(
  mapStateToProps,
  { fetchComplain }
)(Schedule);