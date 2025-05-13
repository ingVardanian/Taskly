import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../services/firebase/firebase';
import { Typography, Input, Button, Divider, Form, Flex, notification } from 'antd';
import AuthWrapper from '../../../components/shared/AuthWrapper';
import LoginCoverImg from '../../../../core/images/logInImg.jpg';
import { ROUTES_CONSTANTS } from '../../../../routes';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../../../state-managment/slices/authUserInfoSlice';
import './index.css'
const { Title, Text } = Typography;


const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [ form ] = Form.useForm();
    const handleLogin = async (values) => {
        setLoading(true);

        try{
            const { email, password } = values;
            await signInWithEmailAndPassword(auth, email, password);
            dispatch(setIsAuth(true));
        }catch(error) {
            notification.error({
                message: 'Error',
                description: 'Invalid login credentials',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='loginCover'>
        <AuthWrapper coverImg={LoginCoverImg}>
            <Title level={3}>
                Sign In
            </Title>

            <Form form={form} onFinish={handleLogin} layout="vertical">
                <Form.Item 
                    name="email" label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!'
                        }
                    ]}
                >
                    <Input 
                        type="text"
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item 
                    name="password" 
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password required!'
                        }
                    ]}
                >
                    <Input.Password
                        placeholder="Password"
                    />
                </Form.Item>

                <Divider />
                
                <Flex justify="space-between" align="flex-end">
                    <Text>
                        <Link to={ROUTES_CONSTANTS.REGISTER}>
                            Create Account
                        </Link>
                    </Text>

                    <Button 
                        type="primary"
                        loading={loading}
                        htmlType="submit"
                    >
                        Login
                    </Button>
                </Flex>
                
            </Form>
        </AuthWrapper>
        </div>
    )
};

export default Login;

