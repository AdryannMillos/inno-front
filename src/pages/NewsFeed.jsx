import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { Link } from "react-router-dom";

function NewsFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [manualPageInput, setManualPageInput] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get("/news?pageSize=8");
        setNewsData(response[0].articles);
        setTotalPages(response[0].totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const fetchFilteredData = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/news", {
        params: {
          pageSize: 8,
          search: searchTerm,
          author,
          source,
          fromDate,
          toDate,
        },
      });
      setNewsData(response[0].articles);
      setTotalPages(response[0].totalPages);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  const ClearParams = () => {
    setSearchTerm("");
    setAuthor("");
    setSource("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const handleManualPageChange = () => {
    const parsedPage = parseInt(manualPageInput, 10);
    if (!isNaN(parsedPage) && parsedPage > 0 && parsedPage <= totalPages) {
      setCurrentPage(parsedPage);

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await apiService.get("/news", {
            params: {
              pageSize: 8,
              search: searchTerm,
              author,
              source,
              fromDate,
              toDate,
              page: parsedPage,
            },
          });
          setNewsData(response[0].articles);
          setTotalPages(response[0].totalPages);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }else{
        alert("Invalid page number");
    }
  };

  return (
    <div className="news-page">
        <button className="profile"><Link to="/profile">My profile</Link></button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search News Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <div className="column-div">
          <label htmlFor="fromDate">From Date</label>
          <input
            name="fromDate"
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="column-div">
          <label htmlFor="toDate">To Date</label>
          <input
            name="toDate"
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={fetchFilteredData}>Search</button>
          <button className="clear" onClick={ClearParams}>
            Clear Filters
          </button>
        </div>
      </div>
      <div className="news-cards-container">
        <div className="news-cards">
          {!loading &&
            newsData.map((news) => (
              <div className="news-card" key={news.id}>
                <img src={extractImageUrl(news.image_url)} alt={news.title} />
                <h3>{news.title}</h3>
                <p>{cleanAndTruncateContent(news.content, 100)}</p>
                <p><a href={news.url} target="_blank" rel="noreferrer">
                  Read more
                </a>
                </p>
                <p>Author: {news.author}</p>
                <p>Source: {news.source}</p>
                <p>Publish Date: {news.published_at}</p>
              </div>
            ))}
        </div>
        {!loading && (
          <div className="pagination">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <input
              type="number"
              value={manualPageInput}
              onChange={(e) => setManualPageInput(e.target.value)}
              min="1"
              max={totalPages}
            />
            <button onClick={handleManualPageChange}>Visit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsFeed;
