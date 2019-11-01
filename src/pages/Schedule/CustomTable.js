import React from 'react';
import { Link, Route } from 'react-router-dom'

import {
  Table,
  message,
  Popconfirm,
  Card,
  Input,
  Icon,
  Select,
  Row,
  Col,
  Divider,
} from 'antd';
import Can from '../../../src/utils/Can';

import api from '../../apis';
import { getUserInfo, getUserToken } from '../../utils';
import { Button } from 'antd/lib/radio';

const { Option } = Select;
const uuidv4 = require('uuid/v4');

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      act: false,
      data: props.dataSource,
      count: props.count,
      editingKey: '',
      editable: false,
      new: true,
      newEntry: false,
      currentPagination: 1,
      customPagesize: 5
    };
    this.columns = props.columns.concat({

      title: 'Action',
      key: 'action',
      width: 315,
      render: (text, record) => (
        <span>
          { record.job_status === 'Done' || record.job_status === 'Assign' ?
            (
              <div>
                <Link style={{ color: 'green', marginRight: '0.5em' }} to={"/schedules/detail/" + record.id}>View</Link>

                <Link style={{ color: '#1890FF', marginRight: '1em', marginLeft: '1em' }} to={"/schedules/edit/" + record.id}>
                  Edit
               </Link>
                <Popconfirm
                  onConfirm={() => this.delete(record.key)}
                  onCancel={this.cancel}
                  placement="left"
                  titlViewe="Are you sure delete?"
                  okText="Yes"
                  cancelText="No"
                  okType="danger"
                  style={{ backgroundColor: '#33ff33', marginLeft: '1em' }}
                >
                  <a style={{ color: '#ff3333' }}>Delete</a>
                </Popconfirm>
              </div>


            ) :
            (
              <div>
                <Button
                  onClick={() => this.update(record, record.key)}
                  shape='round' style={{ fontSize: '15', color: 'white', backgroundColor: '#0014C0' }}>
                  Job Done</Button>
              </div>

            ) 

            
          }            

        </span>
        
      
      ),
      fixed: 'right'
    });


  }
  //add
  handleAdd = () => {
    const { data, act } = this.state;
    var count = data.length.toString();
    var uuid = uuidv4();

    const newData = this.props.newData;
    newData.key = uuid;

    this.edit(uuid);
    data.unshift(newData);

    this.setState({
      neworedit: true,
      editable: true,
      data: [...data],
      editingKey: uuid,
      new: false,
      newEntry: true
    });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({
        loading: false,
        data: this.props.dataSource,
        count: this.props.count
      });
    }
  }

  //Delete
  delete = key => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.props.deleteData(item.id);
    // message.success('Deleted !');
  };

  cancel = Id => {
    const data = [...this.state.data];
    this.setState({
      data: data.filter(
        item => item.Id !== Id && item.code !== '' && item.description !== ''
      ),
      editingKey: '',
      neworedit: false,
      new: true
    });
  };

  isEditing = record => record.key === this.state.editingKey;

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return error;
      }
      this.props.createNewData(row);
    });
  }

  update(data, key) {
    console.log(key);

    const newData = [...this.state.data];
    const index = newData.findIndex(item => key === item.key);

    if (index > -1) {
      const item = newData[index];
      item.job_status = 'Done';
      this.props.editData(item, item.id);
    }
  }

  edit(key) {
    this.setState({ editingKey: key, new: false, newEntry: false });
  }
  //filter
  PositionFilter(event) {
    let inputdata = event.target.value.toLowerCase();
    const master = this.props.dataSource;
    if (inputdata === '') {
      this.setState({
        data: master
      });
    } else {
      const clone = master.filter(item => {
        return Object.keys(item).some(key =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(inputdata.toLowerCase())
        );
      });
      this.setState({
        data: clone
      });
    }
  }

  render() {
    const { data, neworedit, currentPagination, customPagesize, act } = this.state;

    // const components = {
    //   body: {
    //     row: EditableFormRow,
    //     cell: EditableCell
    //   }
    // };

    // const columns = this.columns.map(col => {
    //   if (col.key === 'title' && neworedit === false) {
    //     col.editable = false;
    //   } else if (col.key === 'title' && neworedit === true) {
    //     col.editable = true;
    //   }
    //   if (!col.editable) {
    //     return col;
    //   }
    //   return {
    //     ...col,
    //     onCell: record => ({
    //       record,
    //       dataIndex: col.dataIndex,
    //       title: col.title,
    //       editing: this.isEditing(record)
    //     })
    //   };
    // });

    const onChange = page => {
      this.setState({
        currentPagination: page
      });
    };
    const pageSizeHandler = value => {
      this.setState({
        customPagesize: value
      });
    };
    const isMobile = window.innerWidth <= 500;
    const x = isMobile ? 1130 : 0;
    return (
      <Card bordered={false}>
        <Row>
          <Col sm={24} md={24} style={{ paddingBottom: '10px' }}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              <span>{this.props.title}</span>

              <Select
                onChange={pageSizeHandler}
                defaultValue={customPagesize.toString()}
                style={{
                  width: '100px',
                  float: 'right',
                  clear: 'left',
                  borderRadius: '20px'
                  // paddingLeft: '10px',
                }}
              >
                <Select.Option value="5">5 / page</Select.Option>
                <Select.Option value="10">10 / page</Select.Option>
                <Select.Option value="20">20 / page</Select.Option>
              </Select>
              <Input
                onChange={event => this.PositionFilter(event)}
                style={{ width: '19%', float: 'right', marginRight: '1em' }}
                prefix={
                  <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Search"
              />


            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={24}>
            {/* <div style={{ border: '1px solid #e8e8e8' }}> */}
            <Table
              className='ant-table-thead'
              key={data.key}
              pagination={{
                onChange: onChange,

                pageSize: Number(customPagesize),
                position: 'bottom'
              }}
              loading={this.state.loading}
              dataSource={data}
              columns={this.columns}
              rowClassName="editable-row"
              scroll={{ x: 1200 }}



            />
          </Col>
        </Row>
      </Card>
    );
  }
}
export default CustomTable;
