import { useContext } from 'react';
import { Layout, Button, Typography, Space } from 'antd';
import UserProfile from '../../shared/UserProfile';
import { AuthContext } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../routes';
import './index.css';

const MainHeader = () => { 
    const { isAuth, setIsAuth, userProfileInfo } = useContext(AuthContext);

    return (
        <Layout.Header className="main_header">
            <Link to="/">
                <Typography.Title level={3}>
                    Jira
                </Typography.Title>
            </Link>
            <Space>
                {
                    isAuth ? (
                        <UserProfile setIsAuth={setIsAuth} userProfileInfo={userProfileInfo} />
                    ) : (
                        <Link to={ROUTES_CONSTANTS.LOGIN}>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    )
                }
            </Space>
        </Layout.Header>
    )
};

export default MainHeader;