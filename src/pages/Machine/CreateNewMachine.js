import React from 'react'

import {
    Form,
    Button, Icon,
    Upload, message, Divider,
    Input, Select, DatePicker
} from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { connect } from "react-redux";

import api from 'apis';
import { noti } from 'utils/index';

import { fetchMachine, postMachine } from '../../actions/Machine';
import { fetchModel } from '../../actions/Model';

import { Link } from 'react-router-dom'
import './index.css';


const { Option } = Select;
class CreateMachine extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchModel()
    }

    handleCancel = e => {
        this.props.form.resetFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue
                };
                console.log('Values', values);
                
                api.post('machines', values).then((result) => {
                    
                    if (result) {
                        this.props.form.resetFields();
                    }
                })
                noti('success', 'Successfully!', 'Machine has been created successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }
        });
    };




    render() {
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
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <PageHeaderWrapper title='Create Machine' para='You can add machine basic data by using following form.' />


                <Link to="/machines">
                    <Button style={{ position: 'absolute', right: '2em', top: '5em' }}><Icon type="left" />
                        Go back
                    </Button>
                </Link>


                <Form onSubmit={this.handleSubmit} >


                    <Divider orientation="left">  Machine Information</Divider>
                    <Card style={{ marginRight: '16px' }}>
                        <Row>
                            <Col span={8}>

                                <Form.Item label="Mode
                                l No:">
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


                        <Button htmlType="submit" shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>
                            Submit</Button>

                        <Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }} onClick={this.handleCancel}>
                            Cancel</Button>
                    </Card>
                </Form>
            </div>



        );
    }
}


const Machine = Form.create()(CreateMachine);

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
