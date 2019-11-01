import React from 'react';
import {
  Table,
  Button,
  Card,
  Select,
  Popconfirm,
  Input,
  Icon,
  message
} from 'antd';
import { Link } from 'react-router-dom';
// import api from '../../apis';

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
      
      align: 'center',
      width: 100,
      render: record => (
        <>
           <Link style={{ color: 'green',marginRight:'0.5em' }} to={"/machines"}>View</Link>
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
          <Input
            style={{ width: '21%', float: 'right',margin:'0 0.5em 0.2em 0'}}
            onChange={event => {
              this.PositionFilter(event);
            }}
            
            placeholder="Search"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </h2>

       
          <Table
            key={data.key}
            pagination={{
              onChange: onChange,
              pageSize: Number(customPagesize),
              position: 'bottom'
            }}
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            bordered
            
          />
          
        
        </Card>
     
    );
  }
}

export default ScrollTable;
