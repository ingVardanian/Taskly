import { Layout, Button, Typography, Space } from 'antd';
import UserProfile from '../../shared/UserProfile';
import { Link } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../routes';
import { useSelector } from 'react-redux';
import './index.css';

const MainHeader = () => { 
    const { authUserInfo: { isAuth, userProfileInfo }} = useSelector(state => state.authInfo);

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
                        <UserProfile userProfileInfo={userProfileInfo} />
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