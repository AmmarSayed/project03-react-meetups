import React, { useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useFetch from "../../hooks/useFetch";
const AvailableMeals = () => {
  const { meals, fetchData, isLoading, httpError } = useFetch();

  const URL = "https://react-http-f0957-default-rtdb.firebaseio.com/meals.json";

  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);

  useEffect(() => {
    fetchData(URL);
  }, [fetchData]);

  // component content
  let mealsContent;

  if (httpError) {
    mealsContent = (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    mealsContent = (
      <section className={classes.loading}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (!httpError && !isLoading) {
    mealsContent = (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
  }
  return mealsContent;
};

export default AvailableMeals;
