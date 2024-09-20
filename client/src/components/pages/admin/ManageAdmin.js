import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";

//functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../functions/users";

// antd
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    id: "",
    Password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData(user.token);
  }, [user.token]);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleOnchange = (enabled, id) => {
    const value = { id, enabled };
    changeStatus(user.token, value)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (role, id) => {
    const values = { id, role };
    changeRole(user.token, values)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      removeUser(user.token, id)
        .then((res) => {
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const roleData = ["admin", "user"];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>ManageAdmin Page</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item.username}</th>
                  <td>
                    <Select
                      style={{ width: 100 }}
                      value={item.role}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((role, index) => (
                        <Select.Option value={role} key={index}>
                          {role === "admin" ? (
                            <Tag color="green">{role}</Tag>
                          ) : (
                            <Tag color="red">{role}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnchange(e, item._id)}
                    />
                  </td>
                  <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                  <td>
                    {moment(item.updatedAt).locale("th").startOf().fromNow()}
                  </td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(item._id)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <EditOutlined onClick={() => showModal(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password</p>
            <input
              type="text"
              name="password"
              onChange={handleChangePassword}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
