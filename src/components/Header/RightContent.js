import React from 'react'
import { connect } from 'react-redux'
import { Menu, Avatar, Icon ,Spin } from 'antd'
import { FormattedMessage } from 'umi-plugin-locale';
import HeaderDropdown from '../HeaderDropdown'
import SelectLang from '../SelectLang'
import styles from './index.module.less'
import { signOut } from '../../actions/Auth'
const RightContent =  ({username,signOut}) => {

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            signOut()
        }
      };
    const menu = (
        <Menu className={styles.menu}  selectedKeys={[]} onClick={handleMenuClick}>
          <Menu.Item key="logout" >
            <Icon type="logout" />
                <FormattedMessage id="menu.account.logout" defaultMessage="Sign Out" />
          </Menu.Item>
        </Menu>
    )
    console.log(username);
    
    return (
         <div className={styles.right}>
            {
                username ? ( 
                <HeaderDropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar
                        size="small"
                        className={styles.avatar}
                        src=""

                       alt=""
                    />
                    <span className={styles.name}>{username}</span>
                </span>
                </HeaderDropdown>
                 ) :(
                <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
                 ) 
                 }
            {/* <SelectLang className={styles.action}/> */}
         </div>
    )
}
function mapStateToProps (state) {
    return {
        username: state.auth.roleid
    }
}

export default connect(mapStateToProps,{signOut})(RightContent)