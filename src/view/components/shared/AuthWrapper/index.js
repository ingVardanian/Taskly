import './index.css';

const AuthWrapper = ({ coverImg, children }) => {
    return (
        <div className="auth_style_wrapper">
            <div 
                className="cover_img_container"
                style={{backgroundImage: `url(${coverImg})`}}
            />


            <div className="form_container">
                {children}
            </div>
        </div>
    )
};

export default AuthWrapper;

