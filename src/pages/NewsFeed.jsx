import { useState, useEffect } from "react";
import apiService from "../services/apiService";

function NewsFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/news?pageSize=8");
        setNewsData(response[0].articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [loading]);

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const extractImageUrl = (htmlString) => {
    const regex = /src="(https:\/\/[^"]+)"/;
    const match = htmlString.match(regex);
    return match ? match[1] : null;
  };

  const cleanAndTruncateContent = (htmlString, maxLength) => {
    const cleanedString = htmlString.replace(/<[^>]*>/g, "");
    return cleanedString.length > maxLength
      ? cleanedString.slice(0, maxLength) + "..."
      : cleanedString;
  };

  return (
    <div className="news-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search News"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="news-cards-container">
        <div className="news-cards">
          {!loading &&
            filteredNews.map((news) => (
              <div className="news-card" key={news.id}>
                <img src={extractImageUrl(news.image_url)} alt={news.title} />
                <h3>{news.title}</h3>
                <p>{cleanAndTruncateContent(news.content, 100)}</p>
                <a href={news.url} target="_blank" rel="noreferrer">
                  Read more
                </a>
                <p>{news.author}</p>
                <p>{news.source}</p>
                <p>{news.published_at}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;
