import { useSelector } from "react-redux";
import "./profile.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isToastShown, setIsToastShown] = useState(false);
  const [isManagerOrReceptionist, setIsManagerOrReceptionist] = useState(false);


  useEffect(() => {
    if (
      user?.role_account === "manager"
    ) {
      setIsManagerOrReceptionist(true);
      setIsToastShown(false);
    }else{
      setIsManagerOrReceptionist(false);
      setIsToastShown(true);
    }

  }, [user]);

  useEffect(() => {
    if (isToastShown == true) {
      toast.error("Bạn không thể thực hiện chức năng này");
    }
  }, [isToastShown]);

  return (
    <>
      {isManagerOrReceptionist && (
        <div className="profile">
          <h1>Thông tin cửa hàng</h1>
          <div className="contain">
            <div className="area area1">
              <div className="area1-container">
                <div className="area-1 ">
                  <img
                    src="src/assets/logo_moto.jpg"
                    style={{ width: 250, height: 200 }}
                    alt="logo"
                  />
                  <div className="upload-button">
                    <label htmlFor="imageUpload">
                      <img alt="Upload Icon" src="src/assets/camera-icon.svg" />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="area-1 region2 ">
                  <div className="profile-info">
                    <div className="info-item">
                      <span className="label ">Tên cửa hàng:</span>
                      <span>{user.shop_name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label ">Chủ cửa hàng:</span>
                      <span>{user.shop_owner_name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label ">Địa chỉ:</span>
                      <span>{user.shop_address}</span>
                    </div>
                    <div className="info-item">
                      <span className="label ">Số điện thoại:</span>
                      <span>{user.hotline}</span>
                    </div>
                    <div className="info-item">
                      <span className="label ">Email:</span>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="area-1 region1 ">
                  <h3> Mô tả: </h3>
                  <p>
                    Cửa hàng sửa chữa xe máy của chúng tôi chuyên cung cấp dịch
                    vụ bảo dưỡng và sửa chữa toàn diện cho tất cả các loại xe
                    máy. Với đội ngũ kỹ thuật viên có kinh nghiệm và tay nghề
                    cao, chúng tôi cam kết mang lại cho khách hàng những dịch vụ
                    tốt nhất, từ kiểm tra, thay thế linh kiện đến bảo dưỡng định
                    kỳ. Cửa hàng sử dụng các thiết bị hiện đại và phụ tùng chính
                    hãng để đảm bảo chất lượng và độ bền cho xe của bạn. Hãy đến
                    với chúng tôi để trải nghiệm dịch vụ sửa chữa xe máy chuyên
                    nghiệp và tận tâm{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="area ">
              <h2>Cài đặt hệ thống</h2>
              <div className="form-group">
                <label htmlFor="">Chọn số lượng sản phẩm hiện thị</label>
                <select name="" id="" className="input-field">
                  <option value="">50</option>
                  <option value="">100</option>
                  <option value="">150</option>
                  <option value="">200</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Chọn số lượng danh mục sản phẩm</label>
                <select name="" id="" className="input-field">
                  <option value="">10</option>
                  <option value="">20</option>
                  <option value="">25</option>
                  <option value="">30</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Ngôn ngữ</label>
                <select name="" id="" className="input-field">
                  <option value="">Tiếng Việt</option>
                  <option value="">Tiếng Anh</option>
                </select>
              </div>
            </div>
            <div className="area">
              <div className="working-hours">
                <h2>Giờ làm việc</h2>
                <p>Thứ Hai - Thứ Sáu: 8:00 - 18:00</p>
                <p>Thứ Bảy: 8:00 - 14:00</p>
                <p>Chủ Nhật: Nghỉ</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
