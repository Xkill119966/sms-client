import React from 'react'
import Job from './index';
import { Divider, Button } from 'antd';
import { Card } from 'antd';
import './view.css';
import api from 'apis';
import {putSchedule} from '../../actions/Schedule'
import { noti } from 'utils/index';
import {connect} from 'react-redux'
const moment = require('moment');


const renderCom1 = (id) => {
    return (

        <Button style={{
            width: '130px', height: '50px', color: 'white', borderRadius: '10px',
            backgroundColor: 'blue', textAlign: 'center', fontStyle: 'Book Man Old Style',
            marginLeft: '30em', fontWeight: 'bold', position: 'absolute'
        }} type="jobstart" onClick={this.handleChage}>
        Job Start
        </Button>         
    );
}



class jobview extends React.Component {
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
        const response = await api.get(`schedules/${this.state.id}`);
        if (response && response.status == 200) {
            let data = response.data.data;
            console.log(data)
            this.setState({ data: data })

        }
    }



    handleChage = (id) => {
        const editData = {
            job_status : 'Ongoing'
        }
       this.props.putSchedule(editData, id)
        noti('success', 'Successfully!', 'Ybur Job is Start.')

        // console.log("Job Start", id);
        // console.log("Hi");


    }
    render() {
        // const {id}=this.props.location.state;
        const { id, model_number,
            fup_number,
            complain_number,
            schedule_status,
            warranty_year,
            warranty_description,
            working_hour,
            customer_name,
            distance,
            location,
            name,
            date,
            amount,
            job_title,
            complain_job_title,
            complain_description,
            sdate,
            edate,
            job_code,
            job_status,
            inspection,
            watching_list,
            s_amount,
            service_charge } = this.state.data;

        return (
            <div>
                <h1>Job</h1>
                <p>Lorem Ipsum is simply dummy text of the printing.
                    Lorem Ipsum is simply dummy text of the <br />printing.
                    Lorem Ipsum is simply dummy text of the printing.</p><br /><br />
                <div>
                    <Card title={job_code} style={{ width: 1000, borderRadius: '45px' }}>
                        <Divider orientation="left" style={{ fontSize: '13px' }}>Complain Details</Divider><br />
                        <Card style={{ width: 950, borderRadius: '20px' }}>
                            <div style={{
                                marginLeft: '4em', marginRight: '20em', display: 'inline-block',
                                width: '300px', textAlign: 'left', position: 'relative'
                            }}>
                                Complain Number:<span style={{ marginLeft: '4em', color: '#000000', fontSize: '1.1em' }}>
                                    {complain_number}</span><br /><br />
                                Warranty Year:<span style={{ marginLeft: '6em', color: '#000000', fontSize: '1.1em' }}>
                                    {warranty_year}</span><br /><br />
                                FUP Number:<span style={{ marginLeft: '6.5em', color: '#000000', fontSize: '1.1em' }}>
                                    {fup_number}</span><br /><br />
                                Customer Name:<span style={{ marginLeft: '5em', color: '#000000', fontSize: '1.1em' }}>
                                    {customer_name}</span><br /><br />
                                Location:<span style={{ marginLeft: '8em', color: '#000000', fontSize: '1.1em' }}>
                                    {location}</span><br /><br />
                                Date:<span style={{ marginLeft: '9.8em', color: '#000000', fontSize: '1.1em' }}>
                                    {moment(date).format('YY/DD/MM')}</span><br /><br />
                                Job Title: <span style={{ marginLeft: '8em', color: '#000000', fontSize: '1.1em' }}>
                                    {job_title}</span><br /><br />
                                Job Description: <span style={{ marginLeft: '5em', color: '#000000', fontSize: '1.1em' }}>
                                    {complain_description}</span><br /><br />

                            </div>

                            <div style={{ display: 'inline-block', position: 'absolute' }}>
                                Model Number: <span style={{ marginLeft: '3.5em', color: '#000000', fontSize: '1.1em' }}>{model_number}</span><br /><br />
                                Warranty Description: <span style={{ marginLeft: '1em', color: '#000000', fontSize: '1.1em' }}>{warranty_description}
                                </span><br /><br />
                                Working hour:<span style={{ marginLeft: '4.5em', color: '#000000', fontSize: '1.1em' }}>{working_hour}
                                </span><br /><br />
                                Distance:<span style={{ marginLeft: '6em', color: '#000000', fontSize: '1.1em' }}>{distance}
                                </span><br /><br />
                                Department: <span style={{ marginLeft: '5em', color: '#000000', fontSize: '1.1em' }}>{name}
                                </span><br /><br />
                                Amount:<span style={{ marginLeft: '7em', color: '#000000', fontSize: '1.1em' }}>{amount}
                                </span><br /><br />
                                Job Title(Complain):<span style={{ marginLeft: '2em', color: '#000000', fontSize: '1.1em' }}>
                                    {complain_job_title} </span><br /><br />
                            </div>

                        </Card><br />
                        <Divider orientation="left" style={{ fontSize: '13px' }}>Schedule Details</Divider><br />
                        <Card style={{ width: 950, borderRadius: '20px' }}>
                            <div style={{
                                marginLeft: '4em', marginRight: '20em', display: 'inline-block',
                                width: '300px', textAlign: 'left', position: 'relative'
                            }}>
                                Interval Date:<span style={{ marginLeft: '4.8em', color: '#000000', fontSize: '1.1em' }}>
                                    {moment(sdate).format('YY/DD/MM')}~{moment(edate).format('YY/DD/MM')}</span><br /><br />
                                Job Code:<span style={{ marginLeft: '6em', color: '#000000', fontSize: '1.1em' }}>
                                    {job_code}</span><br /><br />
                                Job Title:<span style={{ marginLeft: '6.2em', color: '#000000', fontSize: '1.1em' }}>
                                    {job_title}</span><br /><br />
                                Inspection:<span style={{ marginLeft: '5.5em', color: '#000000', fontSize: '1.1em' }}>
                                    {inspection}</span><br /><br />
                                Amount:<span style={{ marginLeft: '6.5em', color: '#000000', fontSize: '1.1em' }}>
                                    {amount}</span><br /><br />
                            </div>
                            <div style={{ display: 'inline-block', position: 'absolute' }}>
                                Job Status: <span style={{ marginLeft: '6.8em', color: '#15f23d', fontSize: '1.1em', fontWeight: 'bold' }}>{job_status}</span><br /><br />
                                Job Description: <span style={{ marginLeft: '4.5em', color: '#000000', fontSize: '1.1em' }}>
                                    {complain_description}</span><br /><br />
                                Watching List:<span style={{ marginLeft: '6.3em', color: '#000000', fontSize: '1.1em' }}>
                                    {watching_list}</span><br /><br />
                                Major Service Charge:<span style={{ marginLeft: '3.3em', color: '#000000', fontSize: '1.1em' }}>
                                    {s_amount}</span><br /><br />
                            </div>
                        </Card><br /><br />
                    </Card>

                </div><br />
                <Button style={{
                    width: '130px', height: '50px', color: 'white', borderRadius: '10px',
                    backgroundColor: 'blue', textAlign: 'center', fontStyle: 'Book Man Old Style',
                    marginLeft: '30em', fontWeight: 'bold', position: 'absolute'
                }} type="jobstart" onClick={this.handleChage.bind(this, id)}>
                    Job Start
                            </Button><br /><br />
                    {renderCom1}
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
    };
  }
  export default connect(
    mapStateToProps,
    { putSchedule }
  )(jobview);
  