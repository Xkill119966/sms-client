import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim'
import history from '../../router/history'
import config from '../../utils/config'
//redux
import { connect } from 'react-redux'
import { signIn, currentUser } from '../../actions/Auth'
//ant
import { Checkbox, Card, Col, Row, Button, Icon, Form, Input, Layout } from 'antd'
//image
import logo from '../../assets/img/logo3.png'
//css
import { noti } from 'utils/index';
import api from 'apis';
import styles from './index.module.less'
import './index.css';
import { Link } from 'react-router-dom';
const {
  Footer
} = Layout;

const FormItem = Form.Item

class ResetPasswords extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: this.props.match.params.token,
      updated: false,
      email: '',
      id: '',
      success: false
    }
  }

  async componentDidMount() {
    try {
      const response = await api.get(`/users/reset/${this.state.token}`);

      console.log(response.data.data.email);

      if (response.data.status === 'success') {
        this.setState({
          email: response.data.data.email,
          id: response.data.data.id,
          updated: false,
          success: true
        })
      }
    } catch (err) {
      console.log(err);

    }
  }

  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.password_hash === values.password_cofirm) {
        const email = this.state.email;
        const token = this.state.token
        const updatePass = {
          ...values,
          email,
          token

        }
        api.put(`users/updatePasswordWithEmail/${this.state.id}`, updatePass).then(res => {
          if(res.data.status === 'success') {
            this.setState({
              updated: true
            })
          }
        })
        
        
        noti('success', 'Update Password Successfully')
        this.props.form.resetFields();

      } else {
        noti('error', 'Password does not match')
      }

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isloaded } = this.props

    const renderButton = () => {
      if (this.state.updated === false) {
        return (
          <Button style={{ backgroundColor: "#1890ff", color: "white", borderRadius: "10px" }} htmlType="submit" size="default" loading={isloaded}>
            Update
          </Button>
        )
      }else {
        return (
         <Link to ="/login">Back to Login</Link>
         
        )
      }
    }
    if (this.state.success === true) {
      return (
        <div style={{ marginLeft: 700, marginTop: 200, }}>
          <Row gutter={16}>
            <Col span={8}>

              <div className={styles.form}>
                <QueueAnim delay={200} type="top">
                  <div className={styles.logo} key="1">
                    {/* <img alt="logo" src={logo} /> */}
                  </div>
                  <div className={styles.textdes} key="2">
                    <span>Reset Password</span>
                  </div>
                </QueueAnim>
                <br />
                <form layout="vertical" onSubmit={this.handleSubmit}>
                  <QueueAnim delay={200} type="top">
                    <FormItem key="1">
                      {getFieldDecorator('password_hash', {
                        rules: [
                          {
                            required: true,
                            message: 'Required password',
                          },
                        ],
                      })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
                    </FormItem>

                    <FormItem key="2">
                      {getFieldDecorator('password_cofirm', {
                        rules: [
                          {
                            required: true,
                            message: 'Required password',
                          },
                        ],
                      })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />)}
                    </FormItem>


                    <FormItem key="3">
                      {
                        renderButton()
                      }
                    </FormItem>


                  </QueueAnim>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      )
    }

    if (this.state.success === false) {
      return (
        <div>
          <h1>Token Does not match</h1>
        </div>
      )
    }

  }
}

const ResetPassword = (Form.create()(ResetPasswords));


export default ResetPassword;
