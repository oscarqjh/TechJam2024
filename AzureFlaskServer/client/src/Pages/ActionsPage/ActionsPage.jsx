import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from "react";
import { ListView } from "./components/ListView";
import { columns } from "./components/columns";
import { db_columns } from "./components/db_columns";

export default function ActionsPage() {

  const [data, setData] = useState([
    {
      "action": "Query automobile sales",
      "description": "Answers any queries related to automobile sales from the year of 2012 onwards",
      "action_type": "Query",
      "database": "Auto Sales Data"
    },
    {
      "action": "Query shopping trends",
      "description": "Answers any queries related to shopping trends from the latest studies",
      "action_type": "Query",
      "database": "Shopping Trends Updated"
    },
    {
      "action": "Query supermarket sales",
      "description": "Answers any queries related to supermarket sales from the year of 2012 onwards",
      "action_type": "Query",
      "database": "Supermarket Data"
    },
    {
      "action": "Query automobile sales by country",
      "description": "Answers any queries related to automobile sales by country",
      "action_type": "Query",
      "database": "Auto Sales Data"
    },
    {
      "action": "Email a user on the supermarket sales",
      "description": "Email a user on data retrieved regarding supermarket sales",
      "action_type": "API",
      "database": "Supermarket Data"
    },
  ])

  const [dbInfo, setDBInfo] = useState([
    {
      "db_name": "Supermarket Data",
      "description": "Contains data on sales made in supermarkets in Singapore on the year 2019",
      "date": "07-04-2024"
    },
    {
      "db_name": "Auto Sales Data",
      "description": "Contains data on sales made in automobiles in Singapore on the year 2020. The dataset also contains information on motorcycles and is not just limited to 4-wheeleed vehicles",
      "date": "21-06-2022"
    },
    {
      "db_name": "Product Data",
      "description": "This dataset contains information and details on the products sold from 2020 onwards, containing basic information such as price, type of product and quantity sold",
      "date": "01-05-2021"
    }
  ])
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between h-[15vh] p-10">
        <h1 className="text-4xl font-bold text-primary">Actions</h1>
        <div className="mt-10"> 
          <Tabs defaultValue="actions" className="w-full">
            <TabsList>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
            </TabsList>
            <TabsContent value="actions">
              <ListView data={data} columns={columns} type="Actions"/>
            </TabsContent>
            <TabsContent value="databases">
            <ListView data={dbInfo} columns={db_columns} type="Databases"/>
            </TabsContent>
          </Tabs>
        </div>
        
      </div>
      

    </div>
  );
}
