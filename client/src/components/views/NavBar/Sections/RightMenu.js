/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('При виході сталась помилка')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Авторизація</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Реєстрація</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
          <Menu.Item key="addAuthor">
              <a href={"/addAuthor"}>Додати автора</a>
          </Menu.Item>
          <Menu.Item key="addBook">
              <a href={"/addBook"}>Додати книгу</a>
          </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Вийти</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

