import React from "react";
import Dashboard from "@/components/templates/dashboard";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filterType: "checkbox" as any,
    filter: true as any,
};

// type Props = {};

const UserPage: React.FC = () => {
    return (
        <Dashboard title={"ユーザーページ"}>
            <MUIDataTable
                title={"成績"}
                data={data}
                columns={columns}
                options={options}
            />
        </Dashboard>
    );
};
export default UserPage;
