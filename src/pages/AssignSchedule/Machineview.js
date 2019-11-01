import React from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import { Button } from 'antd';
import {Icon} from 'antd';
import './index.css';

import api from 'apis';

class Machineview extends React.Component{
      constructor(props){
          super(props)
          this.state = {
          id: this.props.match.params.id,
         data : []
         }
      }

       componentDidMount() {
           this.getData();
       }

      async getData() {
          const response = await api.get(`machines/${this.state.id}`);
          if(response && response.status == 200){
             this.setState({data: response.data.data})
         }
      }

    render(){
       
        const data = this.state.data;
        const {model_no,fup,wyear,esn,msn,workinghr,location}=data;
       
        
        return(
            <div>
                <Button className='gbtn' onClick={()=>window.history.go(-1)}><Icon type="arrow-left" /> Go Back</Button>
                <PageHeaderWrapper title='View Machine History' para='kuchi kuchi kotharaye'/>
                
                <Card title="Complain Information" style={{width:'90%',marginRight:'7%',marginLeft:'3%',borderRadius:'14px'}}>
                    <Row>
                        <Col span={5} offset={1}>Complain Number:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={6} offset={4}>Model Number:</Col>
                        <Col span={4}>{}</Col>
                       
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Warranty hour:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={10} offset={4}><p>Warranty Description:<br/><span className='black'>{}</span></p></Col>
                        
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>FUP Number:</Col>
                        <Col span={4}>{}</Col>
                        
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Working hr:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={6} offset={4}>Customer Ph No:</Col>
                        <Col span={4}>{}</Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Customer Name:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={6} offset={4}>Location:</Col>
                        <Col span={4}>{}</Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Distance:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={6} offset={4}>Department:</Col>
                        <Col span={4}>{}</Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Date:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={6} offset={4}>Job Title:</Col>
                        <Col span={4}>{}</Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Amount:</Col>
                        <Col span={4}>{}</Col>
                        <Col span={10} offset={4}><p>Description<br/><span className='black'>{}</span></p></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Complain Job Title:</Col>
                        <Col span={4}>{}</Col>
                    </Row>

                </Card>
                <Card title="Machine Information" style={{width:'90%',marginRight:'7%',marginLeft:'3%',borderRadius:'14px',marginTop:'3%'}}>
                    <Row>
                        <Col span={5} offset={1}>Model Number:</Col>
                        <Col span={4}><span className='black'>{model_no}</span></Col>
                        <Col span={6} offset={4}>FUP Number:</Col>
                        <Col span={4}><span className='black'>{fup}</span></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Machine Serial Number:</Col>
                        <Col span={4}><span className='black'>{msn}</span></Col>
                        <Col span={6} offset={4}>Engine Serial Number:</Col>
                        <Col span={4}><span className='black'>{esn}</span></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Warranty year:</Col>
                        <Col span={4}><span className='black'>{wyear}</span></Col>
                        <Col span={6} offset={4}>Working hour:</Col>
                        <Col span={4}><span className='black'>{workinghr}</span></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={5} offset={1}>Location:</Col>
                        <Col span={4}><span className='black'>{location}</span></Col>
                    </Row>
                </Card>
                
            
            </div> 
        );
    }
}
export default Machineview;