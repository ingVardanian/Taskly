import React, { useEffect, useState } from 'react';
import { Typography, Input, Button, Divider, Form, notification, Flex, Switch } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, setDoc, doc, db } from '../../../../services/firebase/firebase';
import AuthWrapper from '../../../components/shared/AuthWrapper';
import registerCoverImg from '../../../../core/images/register.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../routes';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { setIsAuth } from '../../../../state-managment/slices/authUserInfoSlice';

const { Title, Text } = Typography;

const Register = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const isAuth = useSelector((state) => state.authInfo.isAuth);


     useEffect(() => {
        if (isAuth) {
            navigate(ROUTES_CONSTANTS.CABINET);
        }
    }, [isAuth]);

    const dispatch = useDispatch();

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            const { email, password, ...restData } = values;
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const uid = response.user.uid;
            const createDoc = doc(db, 'registerUsers', uid);
            await setDoc(createDoc, {
                email,
                ...restData,
                isAdmin
            });
            dispatch(setIsAuth(true)); 
        } catch (error) {
            let description = 'Ooooops :(';
    
            if (error.code === 'auth/email-already-in-use') {
                description = 'This email is already in use. Please try logging in or use a different email.';
            } else if (error.code === 'auth/invalid-email') {
                description = 'The email address is not valid.';
            } else if (error.code === 'auth/weak-password') {
                description = 'Password should be at least 6 characters.';
            }
    
            notification.error({
                message: 'Registration Error',
                description
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='registerCover'> 
        <AuthWrapper coverImg={registerCoverImg}>
            <Title level={2}>
                Register
            </Title>

            <Form form={form} onFinish={handleRegister} layout="vertical">
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'First Name is required!'
                        }
                    ]}
                >
                    <Input 
                        type="text"
                        placeholder="First Name"
                    />
                </Form.Item>

                <Form.Item 
                    name="lastName"
                    label="Last Name" 
                    rules={[
                        {
                            required: true,
                            message: 'Last Name is required!'
                        }
                    ]}
                >
                    <Input 
                        type="text"
                        placeholder="Last Name"
                    />
                </Form.Item>

                <Form.Item 
                    name="headline"
                    label="Headline" 
                    rules={[
                        {
                            required: true,
                            message: 'Headline is required!'
                        }
                    ]}
                >
                    <Input 
                        type="text"
                        placeholder="Headline"
                    />
                </Form.Item>
                <Form.Item 
                    name="team"
                    label="Team" 
                    rules={[
                        {
                            required: true,
                            message: 'Team is required!'
                        }
                    ]}
                >
                    <Input 
                        type="text"
                        placeholder="Team Name"
                    />
                </Form.Item>


                <Form.Item 
                    name="email"
                    label="Email" 
                    rules={[
                        {
                            required: true,
                            message: 'Email is required!'
                        }
                    ]}
                >
                    <Input 
                        type="email"
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item label="Admin">
                    <Switch checked={isAdmin} onChange={setIsAdmin} />
                </Form.Item>

                <Form.Item 
                    name="password"
                    label="Password" 
                    rules={[
                        {
                            required: true,
                            message: 'Password is required!'
                        }
                    ]}
                >
                    <Input.Password
                        placeholder="Password"
                    />
                </Form.Item>

                <Divider />

                <Flex justify="space-between" align="flex-end">
                    <Text underline>
                        <Link to={ROUTES_CONSTANTS.LOGIN}>
                            Sign In
                        </Link>
                    </Text>
                
                    <Button
                        type="primary" 
                        loading={loading}
                        htmlType="submit"
                    >
                        Register
                    </Button>
                </Flex>
            </Form>
        </AuthWrapper>
        </div>
    )
};

export default Register;









