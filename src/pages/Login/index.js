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
import styles from './index.module.less'
import './index.css';
import { Link } from 'react-router-dom';

const {
  Footer
} = Layout;

const FormItem = Form.Item

class Login extends React.Component {

  state = { loading: false }


  componentDidMount() {
    if (this.props.isSignedIn) {
      history.push('/')
    }
  }

  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values)
          .then(aa => {
            this.props.currentUser()
          })
          //In this case user permission role
          .catch(e => console.log(e));
      }
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
                    <span>LogIn</span>
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
                            message: 'Required username',
                          },
                        ],
                      })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="User Name" />)}
                    </FormItem>
                    <FormItem key="2">
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: 'Required password',
                          },
                        ],
                      })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
                    </FormItem>
                    
                    <FormItem key="3">
                      <Button style={{ backgroundColor: "#1890ff", color: "white", borderRadius: "10px" }} htmlType="submit" size="default" loading={isloaded}>
                        SIGN IN
                  </Button>
                    </FormItem>

                    <FormItem key="4"><div className={styles.user} key="3">
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(<Checkbox style={{ marginLeft: '0px' }}>Remember me</Checkbox>)}
                      <Link to="/forgotPassword" >forgotPassword</Link>
                      <br />
                      <a href="">Register now!</a>
                    </div>
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
export default connect(mapStateToProps, { signIn, currentUser })(Form.create()(Login));




