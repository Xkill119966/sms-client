import React from 'react'
import { Link } from 'react-router-dom'
import { Menu,Icon } from 'antd';
import {FormattedMessage} from 'react-intl';

import history from '../../router/history'
import { menu } from './menus.json'

const { SubMenu } = Menu;

const MenuList = menu.map((menuItem,i) =>{
    if(menuItem.children === undefined || menuItem.children.length === 0){
        return(
            <Menu.Item key={menuItem.path.toString()}>
                <Link to={menuItem.path}>
                    <Icon type={menuItem.icon} />
                    <span><FormattedMessage
                        id={menuItem.name}
                        defaultMessage={menuItem.name}/>
                    </span>

                </Link>
            </Menu.Item>
        )
    }else{
      return(
        <SubMenu key={menuItem.key.toString()}  title={<span><Icon type={menuItem.icon} /><span>
                <FormattedMessage
                    id={menuItem.name}
                    defaultMessage={menuItem.name}/>
            </span></span>}>
              {menuItem.children.map(p =>
                  <Menu.Item  key={p.path.toString()} >
                      <Link to={p.path}>
                      <Icon type={p.icon} />
                        <FormattedMessage
                            id={p.name}
                            defaultMessage={p.name}/>
                      </Link>
                  </Menu.Item >
              )}
          </SubMenu>
          );
      }
    }
)

export  { MenuList }

export function getDefaultSelectedKeys(){
    let key = [];
    key.push(history.location.pathname)
    return key;
}

export function getDefaultOpenKeys(){
    var openKeys = menu.filter(x => x.children !== undefined)
                .map(x => (x.children.filter(y => y.path === history.location.pathname).length > 0 ? x.key : null))
                .filter(el => {return el != null });
    return openKeys
}
