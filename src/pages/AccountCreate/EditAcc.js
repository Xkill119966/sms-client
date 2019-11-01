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

import { fetchRole } from '../../actions/Role';

import { Link } from 'react-router-dom'

import { getUserToken } from '../../utils'


const { Option } = Select;
class EditAccViews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: [],
        }
    }
    componentDidMount() {
        this.props.fetchRole()
        this.getData();
    }

    async  getData() {
        var saveToken = getUserToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${saveToken}`;
        const response = await api.get(`users/${this.state.id}`);
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
                role_id: data.role_id,
                password_hash: data.password_hash,
                emp_code: data.emp_code,
                nric: data.nric,
                password_cofirm: data.password_cofirm,
                phone_no: data.phone_no,
                email: data.email,
                user_name: data.user_name



            });
    };

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
                console.log('User Values', values);

                api.put(`/users/${this.state.id}`, values).then((result) => {

                    if (result) {
                        this.props.form.resetFields();
                    }
                })
                noti('success', 'Successfully!', 'User has been updated successfully.')
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


                <Link to="/accounts">
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
                                <Form.Item label="User Name:">
                                    {getFieldDecorator('user_name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your User Nmae!'
                                        }]
                                    })(<Input placeholder="Enter User Name" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="Employee Id">
                                    {getFieldDecorator('emp_code', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input Employee Id!'
                                        }]
                                    })(<Input placeholder="Enter Employee Id" />)}
                                </Form.Item>
                            </Col>

                            <Col span={8} offset={4}>
                                <Form.Item label="NRIC ">
                                    {
                                        getFieldDecorator('nric', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your NRIC!'
                                            }]
                                        })(<Input placeholder="Enter NRIC" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="Password :">
                                    {
                                        getFieldDecorator('password_hash', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input Password!'
                                            }]
                                        })(<Input.Password placeholder="Enter Password" />)}
                                </Form.Item>
                            </Col>

                            <Col span={8} offset={4}>
                                <Form.Item label="Confirm Password">
                                    {
                                        getFieldDecorator('password_cofirm', {
                                            rules: [{
                                                required: true,
                                                message: 'Confirm Password!'
                                            }]
                                        })(<Input.Password placeholder="Enter Confirm Password" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
                                <Form.Item label="Email ">
                                    {
                                        getFieldDecorator('email', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input email!'
                                            }]
                                        })(<Input placeholder="Enter Email" />)}
                                </Form.Item>
                            </Col>

                            <Col span={8} offset={4}>
                                <Form.Item label="Phone">
                                    {
                                        getFieldDecorator('phone_no', {
                                            rules: [{
                                                required: true,
                                                message: 'Confirm Phone!'
                                            }]
                                        })(<Input placeholder="Enter Phone" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Button htmlType="submit" shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>
                            Update</Button>

                        <Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }} onClick={this.handleCancel}>
                            Cancel</Button>
                    </Card>
                </Form>
            </div>



        );
    }
}


const EditAccView = Form.create()(EditAccViews);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        roles: state.role.list
    };
}

export default connect(
    mapStateToProps,
    { fetchRole }
)(EditAccView);
