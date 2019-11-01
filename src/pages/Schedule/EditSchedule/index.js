import React from 'react'
import { Row, Col } from 'antd';
import { Table, Card, Form, Radio, Input, DatePicker, Button } from 'antd';
import { Divider } from 'antd';
import ScrollTable from '../CustomScrollTable';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { Link } from 'react-router-dom';
import api from 'apis';
import { noti } from 'utils/index';

import { fetchComplain } from '../../../actions/Complain'
import { fetchEmployee } from '../../../actions/Employee';

import { connect } from "react-redux";
import './index.css';
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const { RangePicker } = DatePicker;
const { TextArea } = Input;


class EditSchedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      data: [],
      selectedRowKeys: [],
      selectedid: [],
      currentPagination: 1,
      customPagesize: 5,
    }
  }

  componentDidMount() {
    this.getData();
    this.props.fetchComplain()
    this.props.fetchEmployee()
  }

  async getData() {
    const response = await api.get(`schedules/${this.state.id}`);
    if (response && response.status == 200) {
      this.setState({ data: response.data.data })
    }
    this.setInitialValues()

  }
  setInitialValues = () => {
    const data = this.state.data;
    const { form } = this.props;
    if (data)
      form.setFieldsValue({
        
        s_amount: data.s_amount,
        job_status: data.job_status,
        inspection: data.inspection,
        watching_list: data.watching_list,
        service_charge: data.service_charge,
        job_code: data.job_code,
        job_description: data.job_description,
        job_title: data.job_title,


      });
  };

  handleSubmit = e => {
    const selectedRowKeys = this.state.selectedRowKeys;
    const selectedid = this.state.selectedid;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const rangev = fieldsValue['range'];
        const emp_array = selectedid
        console.log(emp_array);

        const emp_string = emp_array.join();
        const values = {
          job_code: fieldsValue.job_code,
          job_description: fieldsValue.job_description,
          job_title: fieldsValue.job_title,
          s_amount: fieldsValue.s_amount,
          job_status: fieldsValue.job_status,
          inspection: fieldsValue.inspection,
          watching_list: fieldsValue.watching_list,
          service_charge: fieldsValue.service_charge,
          sdate: rangev[0].format('YYYY/MM/DD'),
          edate: rangev[1].format('YYYY/MM/DD'),
          employee_name: emp_string
        }
        console.log("Test", values);
        api.put(`schedules/${this.state.id}`, values).then((result) => {
          if (result) {
            this.props.form.resetFields();
          }
        })

        noti('success', 'Successfully!', 'Schedules have been created successfully.')
      } else {
        noti('error', 'Unsuccessfully!', 'Fail to Create.')
      }
    });
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    let did = selectedRow.map(r => r.name);
    console.log(did);

    this.setState({ selectedRowKeys, selectedid: did });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys } = this.state;


    const dateFormat = 'YYYY/MM/DD';

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,

      onSelection: this.onSelection,
    };
    const dataSource = this.props.complain;
    dataSource.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })
    let dataService = this.props.employee;
    dataService.map(d => {
      let uuid = uuidv4();
      d.key = uuid;
    })

    const { working_hour, model_number, complain_number,
      fup_number,
      warranty_year,
      warranty_description,
      customer_phone,
      customer_name,
      name,
      distance,
      job_title,
      date,
      amount,
      complain_job_title,
      complain_description, location } = this.state.data;

    const columns = [
      {
        title: 'Model No',
        dataIndex: 'model_number',
        width: 200

      },
      {
        title: 'FUP No',
        dataIndex: 'fup_number',
        width: 200
      },
      {
        title: 'Complain No',
        dataIndex: 'complain_number',
        width: 200,

      },
      {
        title: 'Date',
        dataIndex: 'date',
        width: 300,

      },
      {
        title: 'Status',
        dataIndex: 'complain_status',
        width: 300,

      },
    ];
    const empcolumns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Position',
        dataIndex: 'posname'
      },
      {
        title: 'Phone No',
        dataIndex: 'phone',
      },
      {
        title: 'Address',
        dataIndex: 'parmanent_address',
      },
      {
        title: 'NRIC',
        dataIndex: 'nric',
      },
      {
        title: 'Employee Code',
        dataIndex: 'code',
      },

      {
        title: 'Action',
        render: record => (
          <>
            <Link style={{ color: 'green', marginRight: '0.5em' }} to={"/employees/detail/" + record.id}>View</Link>
          </>
        )
      },
    ];

    return (
      <div>
        <PageHeaderWrapper title='' />
        <Divider orientation='left'>Complain Information</Divider><br/><br/>
          <Row>
            <Col span={5} offset={1}>Complain Number:</Col>
            <Col span={4}>{complain_number}</Col>
            <Col span={6} offset={4}>Model Number:</Col>
            <Col span={4}>{model_number}</Col>

          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Working hour:</Col>
            <Col span={4}>{working_hour}</Col>
            <Col span={8} offset={4}><p>Warranty Description:<br /><span className='black'>{warranty_description}</span></p></Col>

          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>FUP Number:</Col>
            <Col span={4}>{fup_number}</Col>

          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Warranty Year</Col>
            <Col span={4}>{warranty_year}</Col>
            <Col span={6} offset={4}>Customer Ph No:</Col>
            <Col span={4}>{customer_phone}</Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Customer Name:</Col>
            <Col span={4}>{customer_name}</Col>
            <Col span={6} offset={4}>Location:</Col>
            <Col span={4}>{location}</Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Distance:</Col>
            <Col span={4}>{distance}</Col>
            <Col span={6} offset={4}>Department:</Col>
            <Col span={4}>{name}</Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Date:</Col>
            <Col span={4}>{moment(date).format('YYYY-MM-DD')}</Col>
            <Col span={6} offset={4}>Job Title:</Col>
            <Col span={4}>{job_title}</Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Amount:</Col>
            <Col span={4}>{amount}</Col>
            <Col span={10} offset={4}><p>Description<br /><span className='black'>{complain_description}</span></p></Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}>Complain Job Title:</Col>
            <Col span={4}>{complain_job_title}</Col>
          </Row>

        
        <div style={{ width: '85%', margin: ' 6% 13% 0 2%', borderRadius: '14px' }}>
          <Divider orientation="left">Machine History</Divider>
          <ScrollTable
            dataSource={dataSource}
            columns={columns}
          />
        </div>

        <div style={{ width: '85%', margin: ' 6% 13% 0 2%', borderRadius: '14px' }}>
          <Divider orientation="left">Assign Schedule</Divider>
          <div>
            <Form onSubmit={this.handleSubmit} >
              <Row>
                <Col span={9} offset={2}>
                  <Form.Item label='Interval Date:'>

                    {getFieldDecorator(['range'], {
                      rules: [{
                        type: 'array',
                        required: true,
                        message: 'Please input your range!'
                      }]
                    })(<RangePicker
                      format={dateFormat} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={9} offset={2}>
                  <Form.Item label='Amount:'>

                    {getFieldDecorator('s_amount', {
                      rules: [{
                        required: true,
                        message: 'Please input your amount!'
                      }]
                    })(<Input addonAfter="Kyats" />)}
                  </Form.Item>
                </Col>
                <Col span={9} offset={3}>
                  <Form.Item label='Service Charge:'>

                    {getFieldDecorator('service_charge', {
                      rules: [{
                        required: true,
                        message: 'Please input Service Charge!'
                      }]
                    })(<Input addonAfter="Kyats" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}>
                  <Form.Item label='Inspection:'>

                    {getFieldDecorator('inspection')(<Radio.Group>
                      <Radio value='Yes'>Yes</Radio>
                      <Radio value='No'>No</Radio>
                    </Radio.Group>)}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label='Watching List:'>
                    {getFieldDecorator('watching_list')(<Radio.Group>
                      <Radio value='Yes'>Yes</Radio>
                      <Radio value='No'>No</Radio>
                    </Radio.Group>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={9} offset={2}>
                  <Form.Item label='Job Code:'>

                    {getFieldDecorator('job_code', {
                      rules: [{
                        required: true,
                        message: 'Please input Job Code!'
                      }]
                    })(<Input placeholder="Enter Code" />)}
                  </Form.Item>
                </Col>
                <Col span={9} offset={3}>
                  <Form.Item label='Job Status:'>

                    {getFieldDecorator('job_status', {
                      rules: [{
                        required: true,
                        message: 'Please input Job Status!'
                      }]
                    })(<Input placeholder="Enter Status" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={9} offset={2}>
                  <Form.Item label='Job Title:'>

                    {getFieldDecorator('job_title', {
                      rules: [{
                        required: true,
                        message: 'Please input Job title!'
                      }]
                    })(<Input placeholder="Enter Title" />)}
                  </Form.Item>
                </Col>
                <Col span={9} offset={3}>
                  <Form.Item label='Job Description:'>

                    {getFieldDecorator('job_description', {
                      rules: [{
                        required: true,
                        message: 'Please input Job Description!'
                      }]
                    })(<TextArea rows={3} placeholder='Enter Description' />)}
                  </Form.Item>
                </Col>
              </Row>

              <Table
                rowSelection={rowSelection}
                dataSource={dataService}
                columns={empcolumns}
                rowClassName="editable-row"
                bordered
              />

              <Button htmlType="submit" shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>Submit</Button>

              <Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }} onClick={this.handleCancel}>Cancel</Button>
            </Form>
          </div>

        </div>

      </div>
    );
  }
}


const Schedule = Form.create()(EditSchedule);

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    position: state.position.list,
    complain: state.complain.list,
    employee: state.employee.list
  };
}

export default connect(
  mapStateToProps,
  { fetchEmployee, fetchComplain }
)(Schedule);