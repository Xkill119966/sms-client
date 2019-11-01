import React from 'react'

import {
    Form,
    Breadcrumb,
    Button, Icon,
    Upload, message, Divider, Row, Col,
    Input, Select, DatePicker
} from 'antd';
import { connect } from "react-redux";

import api from 'apis';
import { noti } from 'utils/index';


import { fetchComplain, postComplain } from '../../../actions/Complain';
import { fetchDepartment } from '../../../actions/Department';
import {fetchMachines} from '../../../actions/Machine';

import { Link } from 'react-router-dom'







const { Option } = Select;
class CreateComplain extends React.Component {
    constructor(props) {
        super(props)
        
    }

    componentDidMount() {
        this.props.fetchDepartment();
        this.props.fetchMachines();

        this.getAllComplain();
    }

    getAllComplain() {
        this.props.fetchComplain();
    }

    state = {
        size: 'large',
    };

  




    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {...fieldsValue,
                    'date': fieldsValue['date'].format('YYYY-MM-DD'),
                }

                console.log(values);
                
                api.post('complains', values).then((result) => {
                    if(result) {
                        this.props.form.resetFields();
                    }
                   
                })
                noti('success', 'Successfully!', 'Complain has been created successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }
        });
    };




    render() {


        const size = this.state.size;

        const { getFieldDecorator } = this.props.form;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+95',
        })(
            <Select style={{ width: 70 }}>
                <Option value="01">+96</Option>

            </Select>,
        );
        const renderDepartment = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select department">
                {this.props.department.map(item => {
                    return <Option value={item.id}>{item.name}</Option>
                })}
            </Select>
        )
        
        const renderMachine = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select machine">
                {this.props.machine.map(item => {
                    return <Option value={item.id}>{item.modelnumber}</Option>
                })}
            </Select>
        )

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Complain </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Create Complain</Breadcrumb.Item>
                </Breadcrumb>
                <Link to="/">
                    <Button style={{ position: 'absolute', right: '0', top: '1' }} type="primary">
                        <Icon type="left" />
                        Go back
        </Button>
                </Link>
                <h2>Create Complain</h2>
                <p> You can add Complain basic data by entering one by one using the following form.</p>
                <br />

                <Form onSubmit={this.handleSubmit} >

                    <br />

                    <div>
                        <Divider orientation="left"> Complain Information</Divider><br/><br/>

                        <div style={{
                            width: '400px',
                            display: 'inline-block'
                        }}>
                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'block'
                            }} label="Complain Number:">
                                {getFieldDecorator('complain_number', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your comaplain number'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter number" />)}
                            </Form.Item>

                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'inline-block'
                            }} label="Complain Job Title:">
                                {getFieldDecorator('complain_job_title', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your complain job title!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter complain title" />)}
                            </Form.Item>
                        </div>
                        <div style={{
                            width: '300px',
                            marginLeft: '100px',
                            display: 'inline-block'
                        }}>
                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'inline-block'
                            }} label="Job Title:">
                                {getFieldDecorator('job_title', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your Job Title!'
                                    }]
                                })(
                                    <Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter title" />
                                )}
                            </Form.Item>

                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'inline-block'
                            }} label="Description:">
                                {
                                    getFieldDecorator('complain_description', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input description!'
                                        }]
                                    })(
                                        <Input style={{
                                            marginleft: '10px',
                                            height: '100px',
                                            display: 'inline-block'
                                        }} placeholder="Enter Description" />

                                    )}
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        {/* <Divider orientation="left">  Parent Information</Divider> */}


                        <div style={{
                            width: '300px',
                            display: 'inline-block'
                        }}>
                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'block'
                            }} label="Department:">
                                {getFieldDecorator('department_id', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your Department!'
                                    }]
                                })(
                                    renderDepartment
                                )}
                            </Form.Item>
                        </div>

                    </div>

                    <div>

                        <div style={{
                            width: '300px',
                            display: 'inline-block'
                        }}>
                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'block'
                            }} label="Amount:">
                                {getFieldDecorator('amount', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your amount!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter amount" />)}
                            </Form.Item>
                        </div>
                        <Form.Item style={{
                            width: '400px',
                            marginLeft: '250px',
                            display: 'inline-block'
                        }} label="Model number:">
                            {
                                getFieldDecorator('machine_id', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input model number!'
                                    }]
                                })(
                                    renderMachine

                                )}
                        </Form.Item>
                    </div>



                    <div>
                        <Divider orientation="left"> Customer Information</Divider><br/><br/>
                        <div style={{
                            width: '300px',
                            display: 'inline-block'
                        }}>
                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'block'
                            }} label="Customer Name:">
                                {getFieldDecorator('customer_name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input name!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter name" />)}
                            </Form.Item>

                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'block'
                            }} label="Distance">
                                {getFieldDecorator('distance', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your Distance !'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter Distance" />)}
                            </Form.Item>

                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '50px',
                                display: 'inline-block'
                            }} label="Date:">
                                {getFieldDecorator('date', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input date!'
                                    }]
                                })(
                                    <DatePicker style={{
                                        width: '300px',


                                    }} placeholder="yy/mm/dd" />
                                )}
                            </Form.Item>
                        </div>
                        <div style={{
                            width: '300px',
                            marginLeft: '100px',
                            display: 'inline-block'
                        }}>
                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '150px',
                                display: 'block'
                            }} label="Customer Ph No.:">
                                {getFieldDecorator('customer_phone', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your phone no:!'
                                    }]
                                })(<Input style={{
                                    marginleft: '150px',
                                    display: 'inline-block'
                                }} addonBefore={prefixSelector} placeholder="0 0000 0000" />)}
                            </Form.Item>

                            <Form.Item style={{
                                width: '300px',
                                marginLeft: '150px',
                                display: 'inline-block'
                            }} label="Location:">
                                {getFieldDecorator('location', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input Location!'
                                    }]
                                })(<Input style={{
                                    marginleft: '10px',
                                    display: 'inline-block'
                                }} placeholder="Enter location" />)}
                            </Form.Item>



                        </div>
                    </div>
                    <div style = {{marginLeft: 380}}>
                    <Button
                        htmlType="submit"
                        shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }} size={size}>
                        Submit</Button>

                    <Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }} size={size}>
                        Cancel</Button>
                    </div>
                </Form>
            </div>



        );
    }
}


const Complain = Form.create()(CreateComplain);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedICreateEmployeen: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        department: state.department.list,
        machine: state.machine.list
    };
}

export default connect(
    mapStateToProps,
    { postComplain, fetchComplain, fetchDepartment, fetchMachines }
)(Complain);