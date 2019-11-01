import React from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Divider } from 'antd';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import api from 'apis';
class ViewMachine extends React.Component {
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

    async  getData() {
        const response = await api.get(`machines/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;

            this.setState({ data: data })

        }
    }
    render() {
        // const {id}=this.props.location.state;
        const { modelnumber, fup_number,
            machine_serial_number, 
            engine_serial_number, warranty_year, working_hour} = this.state.data;
        return <div>
            <PageHeaderWrapper title='View Machine' para='You can view machine basic data.' />
            <Link to="/machines">
                <Button style={{ position: 'absolute', right: '2em', top: '5em' }}>
                    <Icon type="left" />
                    Go Back
                    </Button>
            </Link>
            <Divider orientation="left">Machine Information</Divider> <br/><br/>
                <Row style={{marginLeft:'4em'}}>
                    <Col span={6}>Model Number:</Col>
                    <Col span={4}>{modelnumber}</Col>
                    <Col span={6} offset={4}>FUP Number:</Col>
                    <Col span={4}>{fup_number}</Col>

                </Row>
                <br />
                <Row style={{marginLeft:'4em'}}>
                    <Col span={6}>Machine Serial Number:</Col>
                    <Col span={4}>{machine_serial_number}</Col>
                    <Col span={6} offset={4}>Engine Serial Number:</Col>
                    <Col span={4}>{engine_serial_number}</Col>
                </Row>
                <br />
                <Row style={{marginLeft:'4em'}}>
                    <Col span={6}>Warranty Year:</Col>
                    <Col span={4}>{warranty_year}</Col>
                    <Col span={6} offset={4}>Working Hour:</Col>
                    <Col span={4}>{working_hour}</Col>
                </Row>
                <br />
            
            <Link to={"/machines/edit/" + this.state.id}><Button htmlType="submit" shape='round' style={{ position: 'relative', top: '1.5em', left: '3em', fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>Edit</Button></Link>

        </div>
    }
}
export default ViewMachine;