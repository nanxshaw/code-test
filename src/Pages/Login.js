import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from '../Redux/Actions/actions';

function Login() {
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(user != null)
        navigate("/product");
    })  

    //onchange input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    //submit button login
    const handleSubmit = (event) => {
        dispatch(UPDATE_USER(event));
        navigate("/product");

    };

    return (
        <div className='container'>
            <h2>Login User</h2>
            <Row>
                <Col span={8} />
                <Col span={8}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                          onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                value={state.username}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                value={state.email}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form>
                </Col >
                <Col span={8} />
            </Row>
        </div>
    );
}

export default Login;