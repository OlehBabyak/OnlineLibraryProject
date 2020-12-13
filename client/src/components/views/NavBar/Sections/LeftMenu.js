import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
        <Menu.Item key="main">
            <a href="/">Головна сторінка</a>
        </Menu.Item>
        <Menu.Item key="authors">
            <a href="/authors">Автори</a>
        </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">Збережені книги</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu