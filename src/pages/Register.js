import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../style/auth.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://busbuddy-application.onrender.com/api/users/register",
        values
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
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
          <div className="col-md-4">
            <Form layout="vertical" onFinish={onFinish}>
              <h1 className="auth-title">BusBuddy - Register</h1>
              <Form.Item label="Name" name="fullName" className="mt-3">
                <Input type="text" className="inputfield" />
              </Form.Item>
              <Form.Item label="Email" name="email" className="mt-2">
                <Input type="text" className="inputfield" />
              </Form.Item>
              <Form.Item label="Password" name="password" className="mt-2">
                <Input type="password" className="inputfield" />
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to="/login" className="auth-link">
                  Already Registered , Click Here To Login
                </Link>
                <button className="primary-btn" type="submit">
                  REGISTER
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
