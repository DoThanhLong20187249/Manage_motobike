import { useSelector } from "react-redux";
import"./profile.scss";

const Profile = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>Thông tin cửa hàng </h1>
            </div>
            <div className="profile-body">
                <img src="src/assets/logo_moto.jpg" alt="" />
                <div className="profile-info">
                    <div className="info-item">
                        <span className="label ">Tên cửa hàng:</span>
                        <span>{user.info.shop_name}</span>
                    </div>
                    <div className="info-item">
                        <span className="label ">Chủ cửa hàng:</span>
                        <span>{user.info.shop_owner_name}</span>
                    </div>
                    <div className="info-item">
                        <span className="label ">Địa chỉ:</span>
                        <span>{user.info.shop_address}</span>
                    </div>
                    <div className="info-item">
                        <span className="label ">Số điện thoại:</span>
                        <span>{user.info.hotline}</span>
                    </div>
                    <div className="info-item">
                        <span className="label ">Email:</span>
                        <span>{user.email}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;