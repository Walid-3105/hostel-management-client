import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useMeals from "../../Hooks/useMeals";
import MealsTabs from "./Meals/MealsTabs";
import "react-tabs/style/react-tabs.css";

const MealsCategory = () => {
  const categories = ["breakfast", "lunch", "dinner"];
  const { category } = useParams();
  const initialIndex = category ? categories.indexOf(category) : 0;
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [meals] = useMeals();

  const breakfast = meals.filter((item) => item.category === "breakfast");
  const lunch = meals.filter((item) => item.category === "lunch");
  const dinner = meals.filter((item) => item.category === "dinner");

  return (
    <div className="my-14">
      <h3 className="text-3xl">Flavors for Every Craving</h3>
      <Tabs
        className="mt-5 items-center text-center"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>All Meals</Tab>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
        </TabList>
        <TabPanel>
          <MealsTabs items={meals}></MealsTabs>
        </TabPanel>
        <TabPanel>
          <MealsTabs items={breakfast}></MealsTabs>
        </TabPanel>
        <TabPanel>
          <MealsTabs items={lunch}></MealsTabs>
        </TabPanel>
        <TabPanel>
          <MealsTabs items={dinner}></MealsTabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MealsCategory;
