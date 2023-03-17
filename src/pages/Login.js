import React from "react";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../style/auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://busbuddy-application.onrender.com/api/users/login",
        values
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <>
      <div className="auth">
        <div className="row justify-content-center align-items-center w-100 h-100">
          <div className="col-md-4">
            <Form layout="vertical" onFinish={onFinish}>
              <h1 className="auth-title">BusBuddy - Login</h1>
              <Form.Item label="Email" name="email" className="mt-3">
                <Input type="text" className="inputfield" />
              </Form.Item>
              <Form.Item label="Password" name="password" className="mt-2">
                <Input type="password" className="inputfield" />
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to="/register" className="auth-link">
                  Not Registered Yet , Click Here To Register
                </Link>
                <button className="primary-btn" type="submit">
                  LOGIN
                </button>
              </div>
            </Form>
          </div>
          <div className="col-md-5">
            <div className="lottie">
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_mehcmoif.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
