import React from 'react'

import {
    Form,
    Button, Icon,
    Upload, message, Divider,
    Input, Select, DatePicker
} from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { connect } from "react-redux";

import api from 'apis';
import { noti } from 'utils/index';

import { fetchRole } from '../../../actions/Role';

import { Link } from 'react-router-dom'


const { Option } = Select;
class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchRole()
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
                console.log(' Values', values);
                
                api.post(`/module`, values).then((result) => {

                    if (result) {
                        this.props.form.resetFields();
                    }
                })
                noti('success', 'Successfully!', 'Module has been created successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }
        });
    };




    render() {
        console.log(this.props.roles);

        const renderModel = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select role">
                {this.props.roles.map(item => {
                    return <Option value={item.id}>{item.name}</Option>
                })}
            </Select>
        )
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <PageHeaderWrapper title='Create Account' para='You can add account basic data by using following form.' />


                <Link to="/">
                    <Button style={{ position: 'absolute', right: '2em', top: '5em' }}><Icon type="left" />
                        Go back
                    </Button>
                </Link>


                <Form onSubmit={this.handleSubmit} >


                    <Card style={{ marginRight: '16px' }}>
                        <Row>
                            <Col span={8} >

                                <Form.Item label="Role Type">
                                    {getFieldDecorator('role_id', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your Role Type!'
                                        }]
                                    })(
                                        renderModel
                                    )}
                                </Form.Item>
                            </Col>

                            <Col offset={4} span={8}>
                                <Form.Item label="Controller Name:">
                                    {getFieldDecorator('controller', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your Controller Nmae!'
                                        }]
                                    })(<Input placeholder="Enter Controller Name" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="Action">
                                    {getFieldDecorator('action', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input action!'
                                        }]
                                    })(<Input placeholder="Enter Action" />)}
                                </Form.Item>
                            </Col>

                            <Col span={8} offset={4}>
                                <Form.Item label="Remark ">
                                    {
                                        getFieldDecorator('remark', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input Remark!'
                                            }]
                                        })(<Input placeholder="Enter Remark" />)}
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


const Account = Form.create()(CreateAccount);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        machines: state.machine.list,
        roles: state.role.list
    };
}

export default connect(
    mapStateToProps,
    { fetchRole }
)(Account);
