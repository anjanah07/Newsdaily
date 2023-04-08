import React from "react";
import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";
import NewsList from "./NewsList";
import response from "../response.json";

const page = async () => {
  const news = response || (await fetchNews(categories.join(",")));
  // console.log(news);

  if (news)
    return (
      <div>
        <NewsList news={news} />
      </div>
    );
  else return <div>Error</div>;
};

export default page;
