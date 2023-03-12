import React from "react";
import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";

const page = async () => {
  const news: NewsResponse = await fetchNews(categories.join(","));
  console.log(news);
  return <div>Homepage</div>;
};

export default page;
