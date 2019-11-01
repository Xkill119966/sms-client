import React from 'react'

import {
    Form,
    Breadcrumb,
    Button, Icon,
    Upload, message, Divider,
    Input, Select, DatePicker
} from 'antd';
import { connect } from "react-redux";

import api from 'apis';
import { noti } from 'utils/index';

import { fetchEmployee, postEmployee } from '../../../actions/Employee';
import { fetchPosition } from '../../../actions/Position';
import { fetchDepartment } from '../../../actions/Department';

import { Link } from 'react-router-dom'
import './index.css';

const image = {
    width: '100px',
    height: '100px',
    backgroundColor: '#fff',
    // padding: '20px',
    // marginLeft: '30%',
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


const { Option } = Select;
class CreateEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData() {
        this.props.fetchDepartment();
        this.props.fetchPosition();
    }



    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file);
            console.log(info);
            let preview = URL.createObjectURL(info.file.originFileObj);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                console.log("Hello", imageUrl);

                this.setState({
                    preview: preview,
                    file: imageUrl,
                    loading: false,
                })
            });
        }
    };


    state = {
        size: 'large',
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };




    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'dob': fieldsValue['dob'].format('YYYY-MM-DD'),
                    'start_date': fieldsValue['start_date'].format('YYYY-MM-DD')
                }
                values.image = this.state.file
                api.post('employees', values).then((result) => {

                    this.props.form.resetFields();

                })
                noti('success', 'Successfully!', 'Emp has been created successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }
        });
    };




    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.preview;
        const size = this.state.size;

        const { getFieldDecorator } = this.props.form;

        const renderPosition = (
            <Select style={{
                width: '300px',
                marginleft: '10px',
                display: 'inline-block'
            }} placeholder="Please select position">
                {this.props.position.map(item => {
                    return <Option value={item.id}>{item.name}</Option>
                })}
            </Select>
        )
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
        const prefixSelector = getFieldDecorator('prefixphone', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );



        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Configuration</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Employee </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Create Employee</Breadcrumb.Item>
                </Breadcrumb>
                <Link to="/">
                    <Button style={{ position: 'absolute', right: '0', top: '1' }} type="primary">
                        <Icon type="left" />
                        Go back
                 </Button>
                </Link>
                <h2>Create Employee</h2>
                <p> You can add Employee basic data by entering one by one using the following form.</p>
                <br />

                <Form onSubmit={this.handleSubmit} >
                    <Form.Item label="Profile Image">
                        {getFieldDecorator("image", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please upload your image"
                                }
                            ]
                        })(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={image} /> : uploadButton}
                            </Upload>

                            // <input type="file" name="image" onChange={this.onChange} />
                        )
                        }
                    </Form.Item>


                    <br />
                    <div style={{ marginLeft: 220 }}>
                        <div>
                            <Divider orientation="left">  Personal Information</Divider>

                            <div style={{
                                width: '300px',
                                display: 'inline-block'
                            }}>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'block'
                                }} label="Code">
                                    {getFieldDecorator('code', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your code!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Code" />)}
                                </Form.Item>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="NRIC:">
                                    {getFieldDecorator('nric', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your NRIC!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter NRIC" />)}
                                </Form.Item>
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '100px',
                                display: 'inline-block'
                            }}>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Name:">
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your name!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Name" />)}
                                </Form.Item>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Date Of Birth">
                                    {
                                        getFieldDecorator('dob', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your date of birth!'
                                            }]
                                        })(<DatePicker style={{
                                            width: '200px',
                                            marginleft: '10px',
                                            display: 'inline-block'
                                        }} placeholder="dd/mm/yyyy" />)}
                                </Form.Item>
                            </div>
                        </div>

                        <div>
                            <Divider orientation="left">  Parent Information</Divider>


                            <div style={{
                                width: '300px',
                                display: 'inline-block'
                            }}>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'block'
                                }} label="Father Name:">
                                    {getFieldDecorator('father_name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your father name!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Father Name" />)}
                                </Form.Item>
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '100px',
                                display: 'inline-block'
                            }}>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'block'
                                }} label="Mother Name:">
                                    {getFieldDecorator('mother_name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your mother name!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Mother Name" />)}
                                </Form.Item>
                            </div>
                        </div>

                        <div>
                            <Divider orientation="left">  Job Information</Divider>

                            <div style={{
                                width: '300px',
                                display: 'inline-block'
                            }}>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'block'
                                }} label="Position:">
                                    {getFieldDecorator('position_id', {
                                        rules: [{ required: true, message: 'Please select position' }],
                                    })
                                        (renderPosition)
                                    }
                                </Form.Item>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Start Date:">
                                    {getFieldDecorator('start_date', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your start date!'
                                        }]
                                    })(
                                        <DatePicker
                                            dateRender={current => {
                                                const style = {};
                                                if (current.date() === 1) {
                                                    style.border = '1px solid #1890ff';
                                                    style.borderRadius = '50%';
                                                }
                                                return (
                                                    <div className="ant-calendar-date" style={style}>
                                                        {current.date()}
                                                    </div>
                                                );
                                            }}
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <div style={{

                                width: '300px',
                                display: 'inline-block',

                            }}>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    marginLeft: '100px',
                                    display: 'inline-block'
                                }} label="Department:">
                                    {getFieldDecorator('department_id', {
                                        rules: [{ required: true, message: 'Please select department' }],
                                    })
                                        (renderDepartment)}
                                </Form.Item>
                                <div style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    marginLeft: '100px',
                                    display: 'inline-block'
                                }}></div>
                            </div>
                        </div>

                        <div>
                            <Divider orientation="left">  Contact Information</Divider>


                            <div style={{
                                width: '300px',
                                display: 'inline-block'
                            }}>
                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'block'
                                }} label="Email:">
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your email!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Email" />)}
                                </Form.Item>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Parment Address:">
                                    {getFieldDecorator('parmanent_address', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your parment address!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Parment Address" />)}
                                </Form.Item>
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '100px',
                                display: 'inline-block'
                            }}>

                                <Form.Item
                                    style={{
                                        width: '300px',
                                        margin: '0 300px 8px 0',
                                        display: 'block'
                                    }}
                                    label="Phone Number">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: 'Please input your phone number!' }],
                                    })(<Input
                                        placeholder="951214444"
                                        addonBefore={prefixSelector} style={{
                                            width: '100%',
                                            width: '300px',
                                            margin: '0 300px 8px 0',
                                            display: 'block'
                                        }} />)}
                                </Form.Item>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Temporary Address:">
                                    {getFieldDecorator('temporary_address', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your temporary address!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter Temporary Address" />)}
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <Divider orientation="left">  Other Information</Divider>


                            <div style={{
                                width: '300px',
                                display: 'inline-block'
                            }}>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Education">
                                    {getFieldDecorator('education', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your education address!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter education Address" />)}
                                </Form.Item>
                            </div>
                            <div style={{
                                width: '300px',
                                marginLeft: '100px',
                                display: 'inline-block'
                            }}>

                                <Form.Item style={{
                                    width: '300px',
                                    margin: '0 300px 8px 0',
                                    display: 'inline-block'
                                }} label="Social_Media_Link">
                                    {getFieldDecorator('social_media_link', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your social_media_link address!'
                                        }]
                                    })(<Input style={{
                                        marginleft: '10px',
                                        display: 'inline-block'
                                    }} placeholder="Enter social_media_link Address" />)}
                                </Form.Item>
                            </div>
                        </div>

                        <div style = {{marginLeft: 250, marginTop: 50}}>
                            <Button
                                htmlType="submit"
                                shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }} size={size}>
                                Submit</Button>

                            <Button shape='round' style={{ marginLeft: '10px', color: 'white', backgroundColor: '#D10000' }} size={size}>
                                Cancel</Button>
                        </div>
                    </div>
                </Form>
            </div >



        );
    }
}


const Employee = Form.create()(CreateEmployee);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        position: state.position.list,
        department: state.department.list
    };
}

export default connect(
    mapStateToProps,
    { fetchEmployee, postEmployee, fetchPosition, fetchDepartment }
)(Employee);
