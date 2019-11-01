import React from 'react'
import { Menu } from 'antd';

import { MenuList, getDefaultSelectedKeys, getDefaultOpenKeys } from './menulist'
import { MenuTest } from './test';

export default ({ onselect, roleid }) => {
    console.log(roleid);
    const test = MenuTest;
    console.log(test);

    const list = MenuList
    const render = () => {
        if (roleid === 'Admin') {
            return (
                <Menu

                    onSelect={onselect}
                    theme="light"
                    mode="inline"
                    selectedKeys={getDefaultSelectedKeys()}
                    defaultOpenKeys={getDefaultOpenKeys()}
                >
                    {list}
                </Menu>
            )
        } else  {
            return (
                <Menu

                    onSelect={onselect}
                    theme="light"
                    mode="inline"
                    selectedKeys={getDefaultSelectedKeys()}
                    defaultOpenKeys={getDefaultOpenKeys()}
                >
                    {test}
                </Menu>
            )
        }
    }

    return (
        { render }
        // <Menu

        //     onSelect={onselect}
        //     theme="light"
        //     mode="inline"
        //     selectedKeys={getDefaultSelectedKeys()}
        //     defaultOpenKeys={getDefaultOpenKeys()}
        // >
        //     {list}
        // </Menu>
    )
}

