import React from 'react'
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

class Login extends React.Component {

  state = { loading: false }




  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);

      if (!err) {
        api.post(`/users/resetuser`, values).then(res => {
          console.log(res);
          if (res.data.status === 'success') {
            this.props.form.resetFields();
            noti('success', 'Successfully Send Email!')
          }

        })

      }
      noti('error', 'Your email is not exist in db')

      this.props.form.resetFields();


    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isloaded } = this.props
    return (
      <React.Fragment>

        <div style={{ marginLeft: 700, marginTop: 200, }}>
          <Row gutter={16}>
            <Col span={8}>

              <div className={styles.form}>
                <QueueAnim delay={200} type="top">
                  <div className={styles.logo} key="1">
                    {/* <img alt="logo" src={logo} /> */}
                  </div>
                  <div className={styles.textdes} key="2">
                    <span>ForgotPass</span>
                  </div>
                </QueueAnim>
                <br />
                <form layout="vertical" onSubmit={this.handleSubmit}>
                  <QueueAnim delay={200} type="top">
                    <FormItem key="1">
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Required email',
                          },
                        ],
                      })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Email" />)}
                    </FormItem>

                    <FormItem key="3">
                      <Button style={{ backgroundColor: "#1890ff", color: "white", borderRadius: "10px" }} htmlType="submit" size="default" loading={isloaded}>
                        Send Email
                  </Button>
                    </FormItem>


                  </QueueAnim>
                </form>
              </div>
            </Col>
          </Row>
        </div>


      </React.Fragment>
    )
  }
}
function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded
  }
}
const ForgotPassword = (Form.create()(Login));

export default ForgotPassword


