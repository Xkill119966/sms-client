import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import { DatePicker, Divider } from 'antd';
import { Radio, Button } from 'antd';
import { Row, Col, Form, Input, Select } from 'antd';
import api from 'apis';
import { noti } from 'utils/index';
//import moment from 'moment';
const uuidv4 = require('uuid/v4');
const moment = require('moment')
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {Option} = Select;

const columns = [
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


class As extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      complain_id: props.complain_id,
      count: props.count,
      currentPagination: 1,
      customPagesize: 5,
      selectedRowKeys: [],
      selectedid: [],
      selectedList:[]

    };

  }
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
          complain_id: this.state.complain_id,
          job_code: fieldsValue.job_code,
          job_description: fieldsValue.job_description,
          job_title: fieldsValue.job_title,
          s_amount: fieldsValue.s_amount,
          job_status: fieldsValue.job_status,
          inspection: fieldsValue.inspection,
          watching_list: fieldsValue.watching_list,
          service_charge: fieldsValue.service_charge,
          sdate: moment(rangev[0]).format('YYYY/MM/DD'),
          edate: moment(rangev[1]).format('YYYY/MM/DD'),
          employee_name: emp_string
        }
        console.log("Test", values.sdate);
         this.postData(values).then((result) => {
            if(result) {
               this.props.form.resetFields();
            }
        }).then(()=> {
          const data = {
            complain_status: 'Accepted'
          }
          api.put(`complains/${this.state.complain_id}`, data)
        })

        noti('success', 'Successfully!', 'Schedules have been created successfully.')
      } else {
        noti('error', 'Unsuccessfully!', 'Fail to Create.')
      }
    });
  };
  async postData(v) {
    const response = await api.post('schedules', v);
    console.log("Schedule Response", response.data.data);

    const empList = this.state.selectedList;
    empList.map(value => {
      const putData = {
        schedule_id : response.data.data.id
      }
      
      api.put(`employees/${value.id}`, putData);
    })

  }

  onSelectChange = (selectedRowKeys, selectedRow) => {
    let did = selectedRow.map(r => r.name);
    this.setState({ selectedRowKeys, selectedid: did, selectedList: selectedRow });
  };


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({
        loading: false,
        data: this.props.dataSource,
        count: this.props.count
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, selectedRowKeys } = this.state;


    const dateFormat = 'YYYY/MM/DD';
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,

      onSelection: this.onSelection,
    };
    const renderModel = (
      <Select style={{
          width: '300px',
          marginleft: '10px',
          display: 'inline-block'
      }} placeholder="Please select model">
          {["Assign", "Ongoin", "Accept"].map(item => {
              return <Option value={item}>{item}</Option>
          })}
      </Select>
  )
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <Row>
            <Col span={9} offset={1}>
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
            <Col span={9} offset={1}>
              <Form.Item label='Amount:'>

                {getFieldDecorator('s_amount', {
                  rules: [{
                    required: true,
                    message: 'Please input your amount!'
                  }]
                })(<Input addonAfter="Kyats" />)}
              </Form.Item>
            </Col>
            <Col span={9} offset={1}>
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
            <Col span={4} offset={1}>
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
            <Col span={9} offset={1}>
              <Form.Item label='Job Code:'>

                {getFieldDecorator('job_code', {
                  rules: [{
                    required: true,
                    message: 'Please input Job Code!'
                  }]
                })(<Input placeholder="Enter Code" />)}
              </Form.Item>
            </Col>
            <Col span={9} offset={1}>
            <Form.Item label="Job Status:">
                                    {getFieldDecorator('job_status', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your job status !'
                                        }]
                                    })(
                                 renderModel
                                    )}
                                </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={9} offset={1}>
              <Form.Item label='Job Title:'>

                {getFieldDecorator('job_title', {
                  rules: [{
                    required: true,
                    message: 'Please input Job title!'
                  }]
                })(<Input placeholder="Enter Title" />)}
              </Form.Item>
            </Col>
            <Col span={9} offset={1}>
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
            key={data.key}
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            bordered
          />

          <Button htmlType="submit" shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>Submit</Button>

          <Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }} onClick={this.handleCancel}>Cancel</Button>
        </Form>
      </div>);
  }
}
const SelectTable = Form.create()(As);
export default SelectTable;
