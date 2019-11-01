import React from 'react';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { Card } from 'antd';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from 'apis';
import {
    Form,
    Breadcrumb,
    
    Upload, message, Divider, 
    Input, Select, DatePicker
} from 'antd';
import { connect } from "react-redux";
const moment = require('moment');

class DetailModule extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await api.get(`module/${this.state.id}`);
        if (response && response.status == 200) {
            this.setState({ data: response.data.data })
        }
    }


    render(){

        const data = this.state.data ;
        console.log("Data", data);
        

        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>User Management</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Module </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>View Module</Breadcrumb.Item>
                </Breadcrumb>
            <Link to="/">

                <Button style={{ position: 'absolute', right: '2em', top: '7em' }} type="primary">
                    <Icon type="left" />
                    Go back
                </Button>

            </Link>
            <h2>View Module</h2>
            <br/>
            <Card>

                <Row>
                    <Col span={6}>Controller name:</Col>
                    <Col span={4}>{data.controller}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Action name:</Col>
                    <Col span={4}>{data.action}</Col>
                </Row>
                <br />
                <Row>
                    <Col span={6}>Remark:</Col>
                    <Col span={4}>{data.remark}</Col>
                </Row>
                <br />
             </Card>
             <Link to={"/modules/edit/" + this.state.id}><Button htmlType="submit" shape='round' style={{ position: 'relative', top: '1.5em', left: '3em', fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>Edit</Button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      lang: state.locale.lang,
      isSignedIn: state.auth.isSignedIn,
      roleid: state.auth.roleid,
      isloaded: state.loading.isloaded,
      module: state.module.list
    };
  }
  export default connect(
    mapStateToProps,
    {  }
  )(DetailModule);
  