import React, { useState } from "react";

//functions
import { login } from "../../functions/auth";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//react-toastify
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBasedRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/index"); // use navigate instead of history.push
    } else {
      navigate("/user/index"); // use navigate instead of history.push
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

    // Call login function
    login(value)
      .then((res) => {
        //console.log(res.data);
        toast.info(res.data.payload.user.username + " Login successful!");

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        roleBasedRedirect(res.data.payload.user.role); // Pass the role to the redirect function
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message || "Login failed!");
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <button
              className="btn btn-success"
              disabled={value.password.length < 6}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
