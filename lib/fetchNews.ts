import { gql } from "graphql-request";
import { sortNewsByImage } from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  //graphQL query
  const query = gql`
    query myQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;
  //fetching function from nextjs 13 caching
  try {
    const res = await fetch(
      "https://okegawa.stepzen.net/api/anj_news_app/__graphql",
      {
        method: "POST",
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
          "Content-Type": "application/json",
          Authorization: `APIkey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords,
          },
        }),
      }
    );
    console.log({ res });
    const newsResponse = await res.json();
    console.log({ newsResponse });
    const news = sortNewsByImage(newsResponse.data.myQuery);
    console.log({ news });
    return news;
  } catch (e) {
    console.log({ e });
  }
};
export default fetchNews;
