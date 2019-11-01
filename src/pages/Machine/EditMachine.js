import React from 'react'

// import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Select } from 'antd';
import { Button, Radio, Icon } from 'antd';
import { Upload, message } from 'antd';
import { Divider } from 'antd';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { fetchMachine, postMachine } from '../../actions/Machine';
import { fetchModel } from '../../actions/Model';
// import { fetchPosition } from '../../actions/Model';
// import Button from './button';
import api from 'apis';
import { noti } from 'utils/index';
import { connect } from "react-redux";
const moment = require('moment');


const { Option } = Select;

class EditMachine extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      id: this.props.match.params.id,
      data: [],

    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue
        }

        console.log(`machines/${this.state.id}`);

        api.put(`machines/${this.state.id}`, values).then((result) => {
          if(result) {
            this.props.form.resetFields();
          }
        })
        noti('success', 'Successfully!', 'Machine has been updated successfully.')
      } else {
        noti('error', 'Unsuccessfully!', 'Fail to update.')
      }
    });
  };

  componentDidMount() {
    this.props.fetchModel()
    this.getData();
  }


  async  getData() {
    const response = await api.get(`machines/${this.state.id}`);
    // this.props.fetchPosition();
    if (response && response.status == 200) {
      let data = response.data.data;

      this.setState({ data: data })
      this.setInitialValues();
    }
  }

  setInitialValues = () => {
    const data = this.state.data;
    const { form } = this.props;
    if (data)
      form.setFieldsValue({
        model_id: data.model_id,
        fup_number: data.fup_number,
        machine_serial_number: data.machine_serial_number,
        engine_serial_number: data.engine_serial_number,
        warranty_year: data.warranty_year,
        working_hour: data.working_hour,
        warranty_description: data.warranty_description
      });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const renderModel = (
      <Select style={{
        width: '300px',
        marginleft: '10px',
        display: 'inline-block'
      }} placeholder="Please select model">
        {this.props.models.map(item => {
          return <Option value={item.id}>{item.model_number}</Option>
        })}
      </Select>
    )
    return (
      <div>
        <PageHeaderWrapper title='Edit Machine' para='You can edit machine basic data by using following form.' />



        <Button style={{ position: 'absolute', right: '2em', top: '5em' }} onClick={() => window.history.go(-1)}><Icon type="left" />
          Go Back
                </Button>



        <Form onSubmit={this.handleSubmit} >


          <Divider orientation="left">  Machine Information</Divider><br/><br/>
          <Card style={{ marginRight: '16px' }}>
            <Row>
              <Col span={8}>

                <Form.Item label="Model No:">
                  {getFieldDecorator('model_id', {
                    rules: [{
                      required: true,
                      message: 'Please input your model no!'
                    }]
                  })(
                    renderModel
                  )}
                </Form.Item>
              </Col>

              <Col offset={4} span={8}>
                <Form.Item label="FUP No:">
                  {getFieldDecorator('fup_number', {
                    rules: [{
                      required: true,
                      message: 'Please input your FUP!'
                    }]
                  })(<Input placeholder="Enter FUP" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Machine Serial No:">
                  {getFieldDecorator('machine_serial_number', {
                    rules: [{
                      required: true,
                      message: 'Please input your machine serial no!'
                    }]
                  })(<Input placeholder="Enter Serial No" />)}
                </Form.Item>
              </Col>

              <Col span={8} offset={4}>
                <Form.Item label="Engine Serial No:">
                  {
                    getFieldDecorator('engine_serial_number', {
                      rules: [{
                        required: true,
                        message: 'Please input your engine serial no!'
                      }]
                    })(<Input placeholder="Enter Serial No" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Warranty Year:">
                  {
                    getFieldDecorator('warranty_year', {
                      rules: [{
                        required: true,
                        message: 'Please input your warranty year!'
                      }]
                    })(<Input placeholder="Enter Warranty year" />)}
                </Form.Item>
              </Col>

              <Col span={8} offset={4}>
                <Form.Item label="Working Hour:">
                  {
                    getFieldDecorator('working_hour', {
                      rules: [{
                        required: true,
                        message: 'Please input your working hr!'
                      }]
                    })(<Input placeholder="Enter working hour" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>  
                        <Col span={8}>              
                        <Form.Item style={{
                    width: '300px',
                    margin: '0 300px 8px 0',
                    display: 'block'
                }} label="Warranty Description:">
                    {getFieldDecorator('warranty_description', {
                        rules: [{
                            required: true,
                            message: false
                        }]
                    })(<Input style={{
                        marginleft: '10px',
                        height: '120px'
                    }} placeholder="Enter description" />)}
                </Form.Item>
                        </Col>
                    </Row>




            <Button htmlType="submit" shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>Update</Button>
            <Link to="/machines"><Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }}>Cancel</Button></Link>
          </Card>
        </Form>
      </div>


    );
  }
}

{/* <Form {...formItemLayout} onSubmit={this.handleSubmit}> */ }


const Machine = Form.create()(EditMachine);

function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded,
    machines: state.machine.list,
    models: state.model.list
  };
}
export default connect(
  mapStateToProps,
  { fetchMachine, postMachine, fetchModel }
)(Machine);