import React from 'react'

import {
    Form,
    Button,
    Input, Select, DatePicker
} from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { connect } from "react-redux";
import api from 'apis';
import { noti } from 'utils/index';
import { postReport } from '../../actions/DailyReport';
import { Link } from 'react-router-dom'
import './index.css';


const { Option } = Select;
class DReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white',
            tcolor: 'black',
            disable: true

        }
    }
    handleClick = () => {

        //var newColor = this.state.color == 'white' ? 'black' : 'white';
        //var d = this.state.disable == true ? false : true;
        this.setState({ disable: false, color: '#555', tcolor: 'white' });


    }
    getdatabyd = (dat) => {
        this.getd(dat);
    }
    async getd(dat) {
        api.get(`reports/${dat}`);
    }
    handleDClick = () => {

        //var newColor = this.state.color == 'white' ? 'black' : 'white';
        //var d = this.state.disable == true ? false : true;
        this.setState({ disable: true, color: 'white', tcolor: '#333' });


    }
    handleBlur = () => {
        //var newColor = this.state.color == 'black' ? 'white' : 'white';
        var d = this.state.disable == false ? true : false;
        this.setState({ disable: true });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {

                const values = {
                    ...fieldsValue,
                    date: `${this.props.year}/${this.props.month}/${this.props.date}`,
                    schedule_id: this.props.id,
                    fup_number: this.props.fup

                };
                console.log(values.date);
                
                console.log('Values', values);
                // if (this.getdatabyd(values.date)) {
                //     api.put('reports', values).then((result) => {

                //         if (result) {
                //             this.props.form.resetFields();
                //         }
                //     })
                // }
                // else {

                    api.post('reports', values).then((result) => {

                        if (result) {
                            this.props.form.resetFields();
                        }
                    })
                // }
                noti('success', 'Successfully!', 'Report has been created successfully.')
            } else {
                noti('error', 'Unsuccessfully!', 'Fail to Create.')
            }
        });
    };




    render() {

        const { getFieldDecorator } = this.props.form;
        var date = this.props.date;
        var month = this.props.month;
        var year = this.props.year;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14, offset: 2 },
            },
        };

        return (
            <Card className='car' style={{ borderTopRightRadius: '50px', borderBottomLeftRadius: '160px', borderBottomRightRadius: '50px', borderTopLeftRadius: '50px', backgroundColor: this.state.color, color: this.state.tcolor }} onClick={this.handleClick} onDoubleClick={this.handleDClick} >

                <Form {...formItemLayout} onSubmit={this.handleSubmit} >



                    <div style={{
                        marginLeft: '4em', marginRight: '20em', display: 'inline-block', color: this.state.tcolor,
                        width: '300px', textAlign: 'left', position: 'relative', border: 'black', borderRadius: "0px 50px 0 160px"
                    }}>
                        <Row>
                            <Col span={24}>

                                Date:<span style={{ marginLeft: '5.2em', fontSize: '1.1em' }}>{date + '/' + Number(month) + '/' + year}</span>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                                FUP Number:<span style={{ marginLeft: '2em', fontSize: '1.1em' }}>{this.props.fup}</span>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>

                                <Form.Item label="Working Hour:">
                                    {getFieldDecorator('working_hour', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your working hour!'
                                        }]
                                    })(
                                        <Input placeholder="Enter Hour" disabled={this.state.disable} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Description:">
                                    {getFieldDecorator('description', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input description!'
                                        }]
                                    })(<Input placeholder="Enter Description" disabled={this.state.disable} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Remark:">
                                    {getFieldDecorator('remark', {
                                        rules: [{
                                            required: true,
                                            message: 'Please input remark!'
                                        }]
                                    })(<Input placeholder="Enter Remark" disabled={this.state.disable} />)}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={24}><Button htmlType="submit" shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0', marginLeft: '10em' }} disabled={this.state.disable}>
                                Report</Button></Col>
                        </Row>



                    </div>
                </Form>

            </Card>



        );
    }
}


const Reports = Form.create()(DReport);

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        reports: state.report.list,
    };
}

export default connect(
    mapStateToProps,
    { postReport }
)(Reports);
