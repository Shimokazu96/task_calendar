import React from "react";
import MaterialTable from "material-table";
import Dashboard from "@/components/templates/dashboard";

// const UserPage: React.FC = () => {
//     return (
//         <Dashboard title="ユーザーページ">
//             <>User Page</>
//         </Dashboard>
//     );
// };

type Props = {};

const UserPage: React.FC<Props> = (props) => {
    return (
        <Dashboard title={"ユーザーページ"}>
            <MaterialTable
                columns={[
                    { title: "商品名", field: "itemName" },
                    { title: "カテゴリー", field: "category" },
                    { title: "重量(g)", field: "weight" },
                    { title: "価格(円)", field: "price" },
                ]}
                data={[
                    {
                        itemName: "チョコレート",
                        category: "お菓子",
                        weight: 100,
                        price: 120,
                    },
                    {
                        itemName: "ケーキ",
                        category: "お菓子",
                        weight: 400,
                        price: 480,
                    },
                    {
                        itemName: "りんご",
                        category: "フルーツ",
                        weight: 500,
                        price: 360,
                    },
                    {
                        itemName: "バナナ",
                        category: "フルーツ",
                        weight: 200,
                        price: 300,
                    },
                    {
                        itemName: "みかん",
                        category: "フルーツ",
                        weight: 250,
                        price: 180,
                    },
                    {
                        itemName: "チョコレート",
                        category: "お菓子",
                        weight: 100,
                        price: 120,
                    },
                    {
                        itemName: "ケーキ",
                        category: "お菓子",
                        weight: 400,
                        price: 480,
                    },
                    {
                        itemName: "りんご",
                        category: "フルーツ",
                        weight: 500,
                        price: 360,
                    },
                    {
                        itemName: "バナナ",
                        category: "フルーツ",
                        weight: 200,
                        price: 300,
                    },
                    {
                        itemName: "みかん",
                        category: "フルーツ",
                        weight: 250,
                        price: 180,
                    },
                    {
                        itemName: "チョコレート",
                        category: "お菓子",
                        weight: 100,
                        price: 120,
                    },
                    {
                        itemName: "ケーキ",
                        category: "お菓子",
                        weight: 400,
                        price: 480,
                    },
                    {
                        itemName: "りんご",
                        category: "フルーツ",
                        weight: 500,
                        price: 360,
                    },
                    {
                        itemName: "バナナ",
                        category: "フルーツ",
                        weight: 200,
                        price: 300,
                    },
                    {
                        itemName: "みかん",
                        category: "フルーツ",
                        weight: 250,
                        price: 180,
                    },
                    {
                        itemName: "チョコレート",
                        category: "お菓子",
                        weight: 100,
                        price: 120,
                    },
                    {
                        itemName: "ケーキ",
                        category: "お菓子",
                        weight: 400,
                        price: 480,
                    },
                    {
                        itemName: "りんご",
                        category: "フルーツ",
                        weight: 500,
                        price: 360,
                    },
                    {
                        itemName: "バナナ",
                        category: "フルーツ",
                        weight: 200,
                        price: 300,
                    },
                    {
                        itemName: "みかん",
                        category: "フルーツ",
                        weight: 250,
                        price: 180,
                    },
                ]}
                options={{
                    showTitle: false,
                    paging: true,
                    pageSize: 10, // make initial page size
                    emptyRowsWhenPaging: false,
                }}
            />
        </Dashboard>
    );
};
export default UserPage;
