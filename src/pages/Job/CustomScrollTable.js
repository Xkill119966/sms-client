import React from 'react';
import {
  Table,
  Card,
  Select,
  Input,
  Icon,
  message
} from 'antd';
import { Link } from 'react-router-dom';
import api from '../../apis';

class ScrollTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.dataSource,
      count: props.count,
      currentPagination: 1,
      customPagesize: 5,

    };
    this.columns = props.columns.concat({
      title: 'Action',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: record => (
        <>
          <Link to={'/job/jobview/' + record.id} style={{ color: '#14e006', fontWeight: 'bold', marginRight: '0.5em' }}>View</Link>



        </>
      )
    });
  }
  //tableFunction
  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  cancel(e) {
    message.error('Cancel Delete');
  }
  //filter
  PositionFilter(event) {
    let inputdata = event.target.value.toLowerCase();
    const master = this.props.dataSource;
    console.log('user type: ', inputdata);
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

      console.log('Matched', clone);
    }
  }
  isEditing = record => record.key === this.state.editingKey;

  delete = key => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];

    this.props.deleteData(item.id);
    // message.success('Deleted !');
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
  render() {
    const { data, neworedit, currentPagination, customPagesize } = this.state;

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
    const columns = this.columns.map(col => {
      if (col.key === 'title' && neworedit === false) {
        col.editable = false;
      } else if (col.key === 'title' && neworedit === true) {
        col.editable = true;
      }
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <Card bordered={false}>
        <h2 style={{ paddingBottom: '10px' }}>
          {this.props.title}
          <Select
            onChange={pageSizeHandler}
            defaultValue={customPagesize.toString()}
            style={{
              width: '100px',
              float: 'right',
              clear: 'left',
              borderRadius: '20px'
              // paddingLeft: '10px'
            }}
          >
            <Select.Option value="5">5 / page</Select.Option>
            <Select.Option value="10">10 / page</Select.Option>
            <Select.Option value="20">20 / page</Select.Option>
          </Select>
          <Input
            style={{
              // maxWidth: '170px',
              // alignContent: 'center',
              // justifyContent: 'center',
              width: '19%', float: 'right', marginRight: '1em'
            }}
            onChange={event => {
              this.PositionFilter(event);
              console.log('worked');
            }}
            placeholder="Search"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </h2>
        <div style={{ border: '1px solid #e8e8e8' }}>
          <Table
            key={data.key}
            pagination={{
              onChange: onChange,
              pageSize: Number(customPagesize),
              position: 'bottom'
            }}
            dataSource={data}
            columns={columns}
            scroll={{ x: 1200 }}
            rowClassName="editable-row"
            bordered

          />
          {this.state.view}
        </div>
      </Card>
    );
  }
}

export default ScrollTable;