import DataTable from "../componets/dataTable/DataTable";



const Users = () => {
    return (
        <div className="users-container">
            <div className="infor">
                <h1>Users</h1>
                <button className="btn">Add User</button>
            </div>
            <DataTable/>
        </div>
    );
};

export default Users;