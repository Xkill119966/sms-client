import React from 'react';
import { Table, Divider, Input, Breadcrumb, Card, Row, Col, Icon, Select, Popconfirm } from 'antd';
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom'
import api from 'apis';
import Can from '../../utils/Can';
import Forbidden from '../Forbidden'
import { fetchComplain, putComplain } from '../../actions/Complain';
import { getPermissionByRole } from '../../actions/Auth';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import CustomTable from './CustomTable'
const moment = require('moment')
const uuidv4 = require('uuid/v4');



const columns = [
    {
        title: 'Complain No',
        dataIndex: 'complain_number',
        width: 300,
        align: 'center',
        sorter: (a, b) => a.cno.length - b.cno.length,
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Complain Job Title',
        dataIndex: 'complain_job_title',
        width: 300,
        align: 'center',
        sorter: (a, b) => a.complain_job_title.length - b.complain_job_title.length,
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Date',
        dataIndex: 'date',
        width: 250,
        align: 'center',
        sorter: (a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()),
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        width: 400,
        align: 'center',
        sorter: (a, b) => a.customer_name.length - b.customer_name.length,
        sortDirections: ['ascend', 'descend']
    },
    {
        title: 'Status',
        dataIndex: 'complain_status',
        width: 400,
        align: 'center'
    },
];
class AssignSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.getPermissionByRole();
        this.getAllComplain();
    }

    getAllComplain() {
        console.log(this.props.fetchComplain())
    }

    editComplain(data, id) {
        const editData = {
            complain_status: data.complain_status
        }
        this.props.putComplain(editData, id)
    }

    render() {
        const permission = this.props.permission.map( a => a.perform);
        const a = permission.filter(a => a === 'assignlist')
        const data = this.props.complains;
        data.map(d => {
            d.date = moment(d.date).format('YY/MM/DD')
            let uuid = uuidv4();
            d.key = uuid;
        })


        return (
            <div>
                <Can
                    role= {this.props.roleid}
                    perform= {a}
                    no={() => {
                        return <Forbidden />
                    }}
                >

                    <PageHeaderWrapper title='Assign To Schedule' para='you can add position basic data by entering one by one using following form.' />

                    <CustomTable
                        dataSource={data}
                        columns={columns}
                        title="Assign List"
                        role={this.props.roleid}
                        // perform={perform}
                        // newData={newData}
                        editData={(data, id) => this.editComplain(data, id)}
                    />

                </Can>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        lang: state.locale.lang,
        isSignedIn: state.auth.isSignedIn,
        roleid: state.auth.roleid,
        isloaded: state.loading.isloaded,
        complains: state.complain.list,
        permission: state.permission.list
    };
}
export default connect(
    mapStateToProps,
    { fetchComplain, putComplain, getPermissionByRole }
)(AssignSchedule);
