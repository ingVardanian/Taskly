import React, { useState } from 'react';
import { Typography, Input, Button, Divider, Form, notification, Flex } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, setDoc, doc, db } from '../../../../services/firebase/firebase';
import AuthWrapper from '../../../components/shared/AuthWrapper';
import registerCoverImg from '../../../../core/images/registerCover.png';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../routes';

import './index.css';

const { Title, Text } = Typography;

const Register = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            const { email, password, ...restData } = values;
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const uid = response.user.uid;
            const createDoc = doc(db, 'registerUsers', uid);
            await setDoc(createDoc, {
                email, ...restData
            });
            navigate(ROUTES_CONSTANTS.LOGIN);
        }catch{
            notification.error({
                message: 'Wrong Registration',
                description: `Ooooops :(`
            })
        }finally{
            setLoading(false);
        }
    }

    return (
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
    )
};

export default Register;









