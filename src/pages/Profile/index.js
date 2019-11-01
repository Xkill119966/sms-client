import React from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Card } from 'antd';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { noti } from 'utils/index';
import { Row, Col, Divider } from 'antd';
import api from 'apis';
import {getUserInfo} from '../../utils/index'
const apiUrl = "http://localhost:9005/"

const image = {
  width: '200px',
  height: '200px',
  backgroundColor: '#fff',
  padding: '20px',
  marginLeft: '3%',
}
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      data: []
    }
  }


  componentDidMount() {
    this.getData();
  }



  getAllEmployee() {
    this.props.fetchPosition();
    this.props.fetchDepartment();
  }

  async getData() {
    var saveData = getUserInfo();
    console.log("Data from Profile", saveData.email);
    
    const response = await api.post(`/employees/ByEmail`, saveData);
    console.log(response);
    localStorage.setItem("emp", JSON.stringify(response.data.data));
    // const a = localStorage.getItem("emp");
    // console.log("Emp Data from Local Storage",JSON.parse(a));
    
    if (response && response.status == 200) {
      let data = response.data.data;
      console.log("DatafromProfile",data);

      let imgUrl = data.image ? apiUrl + data.image : '';
      this.setState({ data: data, preview: imgUrl })

    }
  }

  render() {


    const { posname, depname, name, nric, dob, code, start_date, email, phone, parmanent_address, temporary_address, father_name, mother_name, education, social_media_link } = this.state.data;
    return <div>
      <PageHeaderWrapper title='Profile' para='Lorem Ipsum is simply dummy text of the printing lorem Ipsum is simply dummy text of the printing  printing lorem Ipsum is simply dummy text of the printing ' />
      <img src={this.state.preview} style={image} />

      <br />
      <br />
      <Divider orientation="left" style={{ fontSize: '13px' }}>Personal Information</Divider><br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Name:</Col>
        <Col span={2}>{name}</Col>
        <Col span={4} offset={4}>Code:</Col>
        <Col span={2}>{code}</Col>

      </Row>
      <br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>NRIC:</Col>
        <Col span={2}>{nric}</Col>
        <Col span={4} offset={4}>Date Of Birth:</Col>
        <Col span={2}>{dob}</Col>
      </Row>
      <br />
      <br />
      <Divider orientation="left" style={{ fontSize: '13px' }}>Parent Information</Divider><br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Father Name:</Col>
        <Col span={2}>{father_name}</Col>
        <Col span={4} offset={4}>Mother Name:</Col>
        <Col span={2}>{mother_name}</Col>

      </Row>
      <br />
      <br />
      <Divider orientation="left" style={{ fontSize: '13px' }}>Job Information</Divider><br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Position:</Col>
        <Col span={2}>{posname}</Col>
        <Col span={4} offset={4}>Department:</Col>
        <Col span={2}>{depname}</Col>

      </Row>
      <br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Start Date:</Col>
        <Col span={2}>{start_date}</Col>

      </Row>
      <br />
      <br />
      <Divider orientation="left" style={{ fontSize: '13px' }}>Contact Information</Divider><br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Email:</Col>
        <Col span={2}>{email}</Col>
        <Col span={4} offset={4}>Phone:</Col>
        <Col span={2}>{phone}</Col>

      </Row>
      <br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Permanent Address:</Col>
        <Col span={2}>{parmanent_address}</Col>
        <Col span={4} offset={4}>Temporary Address:</Col>
        <Col span={2}>{temporary_address}</Col>
      </Row>
      <br />
      <br />
      <Divider orientation="left" style={{ fontSize: '13px' }}>Other Information</Divider><br />
      <Row style={{ marginLeft: '5em' }}>
        <Col span={4}>Education:</Col>
        <Col span={2}>{education}</Col>
        <Col span={4} offset={4}>Social Media Links:</Col>
        <Col span={2}>{social_media_link}</Col>
      </Row>
      
    </div>
  }
}
export default Profile;