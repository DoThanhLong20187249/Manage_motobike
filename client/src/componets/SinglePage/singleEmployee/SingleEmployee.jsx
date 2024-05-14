import"./singleEmployee.scss"

const SingleEmployee = () => {
    return (
        <div className="single-employee-container">
            <div className="single-employee-main">
                <h1>
                   Thông tin nhân viên
                </h1>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input className="form-field" type="text" id="name" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input className="form-field" type="text" id="phone" name="phone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input className="form-field" type="text" id="address" name="address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">vị trí</label>
                        <input className="form-field" type="text" id="position" name="position" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shop">Xưởng</label>
                        <span>Xưởng</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-field" type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input className="form-field" type="password" id="password" name="password" required  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Tuổi</label>
                        <input className="form-field" type="text" id="age" name="age" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính</label>
                        <input className="form-field" type="text" id="gender" name="gender" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleEmployee;