import React, { useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Button, Space } from "antd";

// Router
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux state
  const { user } = useSelector((state) => ({ ...state }));
  console.log("navbar", user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  // Define items for the left side
  const leftItems = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "mail",
      icon: <HomeOutlined />,
    },
  ];

  // Define items for the right side based on user state
  let rightItems = [];

  if (user && user.token) {
    // User is logged in, show user's name with a dropdown
    const userMenu = (
      <Menu>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    );

    rightItems = [
      {
        label: (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button type="link">
              <UserOutlined />
              <Space>{user.username}</Space>
            </Button>
          </Dropdown>
        ),
        key: "user-dropdown",
      },
    ];
  } else {
    // User is not logged in, show Login and Register
    rightItems = [
      {
        label: <Link to={"/login"}>Login</Link>,
        key: "login",
        icon: <LoginOutlined />,
      },
      {
        label: <Link to={"/register"}>Register</Link>,
        key: "register",
        icon: <UserAddOutlined />,
      },
    ];
  }

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        {/* Render left side items */}
        {leftItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
            {item.label}
          </Menu.Item>
        ))}

        <Menu.Item style={{ marginLeft: "auto" }}></Menu.Item>

        {/* Render right side items */}
        {rightItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
