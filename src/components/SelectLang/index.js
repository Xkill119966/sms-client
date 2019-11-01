
//react
import React from 'react';
 import HeaderDropdown from '../HeaderDropdown'
//redux
import { connect } from 'react-redux'
import { setLocale } from '../../actions/locale'
//ant
import { Menu, Icon } from 'antd';
//css
import './index.css'
//image
import Profile from '../../assets/img/Profile.svg'
import bell from '../../assets/img/lambor/bell.svg'

const SelectLangComponent =  ({setLocale}) => {
    const locales = ['Mrs.john', 'ChangePassword', 'LogOut'];
    const languageIcons = {
        'Mrs.john': <span><img src={Profile} alt='English Flag' /></span>,
        'ChangePassword': <span style={{color: 'green'}}>ChangePassword</span>,
        'LogOut' : <span><button style={{color: 'red',width:'85px',height:'30px',borderRadius:'10px',textAlign:'center'}} type="logout">logout</button></span>
        };
    const languageLabels = {
        'Mrs.john': 'Mrs.john',
        'ChangePassword': '',
        'LogOut':'',
    };
    const langMenu = (
        <Menu className='menu'>
            {locales.map(locale => (
                <Menu.Item key={locale} onClick={()=>setLocale(locale)}>
                    <span role="img" aria-label={languageLabels[locale]}>
                    {languageIcons[locale]}
                    </span>{' '}
                    {languageLabels[locale]}
                </Menu.Item>
            ))}        
        </Menu>
    );
    return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight"> 
             {/* <Icon type="user" style = {{color : '#1890ff'}} className="Mrs.john" title='logout'/> */}
               <div className="pos">
                   <img src = {bell} alt='bell' style={{width:"35px",height:"35px",paddingBottom:"10"}}/>
                   <img src = {Profile} alt="Profile" style={{width:"35px",height:"35px",paddingBottom:"10"}}/>
                   <Icon type="down" style = {{color : '#1890ff'}} className = "" title= ''/>
               </div>
           </HeaderDropdown>
      )
}
function mapStateToProps(state){
    return{
        lang : state.locale.lang
    }
}
const SelectLang = connect( mapStateToProps, {setLocale})(SelectLangComponent)  
export default SelectLang