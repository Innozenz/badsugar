import React from 'react';
import AddWorks from "../../components/admin/AddWorks";

const Dashboard = () => {
    return (
        <div>
            <AddWorks />
        </div>
    );
};
Dashboard.auth = {adminOnly: true};
export default Dashboard;
