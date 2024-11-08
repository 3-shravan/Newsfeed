//1--->2191fb33ca34496cabbfecd217cb46bb
//2--->b857b79e02fb481ea9fb5594e198badd
//3--->5da03a0e041246c4aad4ec6b878170a2
import React, { useState, useEffect } from "react";
import styles from "../Newsfeed/News.module.css";

const News = () => {
  const apiKey = "459f08fd5bf84c29bba2d57a824e8bd1";
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState("ALL"); 
  
  
    
  


  const fetchAllNews = async () => {
    const urls = [
      `https://newsapi.org/v2/everything?q=tesla&from=2024-11-06&sortBy=publishedAt&apiKey=${apiKey}`,
      `https://newsapi.org/v2/everything?q=apple&from=2024-11-06&to=2024-11-06&sortBy=popularity&apiKey=${apiKey}`,
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`,
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`,
      `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`,
    ];

    try {
      setLoading(true);
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      const allArticles = data.flatMap((d) => d.articles);

      setNews(allArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildApiUrl = () => {
    if (query) {
      return `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&apiKey=${apiKey}`;
    } else if (category) {
      return `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    } else if (source) {
      return `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
    } else {
      return null;
    }
  };

  const fetchFilteredNews = async () => {
    const apiUrl = buildApiUrl();
    if (!apiUrl) return;

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();

      setNews(data.articles);
      console.log("Filtered news:", data.articles);
     
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNews([]);

    if (query || category || source) {
      fetchFilteredNews();
    } else {
      fetchAllNews();
    }
  }, [query, category, source]);

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  const handleButtonClick = (type, value) => {
    setSelectedButton(type); // Set the selected button type
    setQuery(""); // Reset query
    setCategory(""); // Reset category
    setSource(""); // Reset source

    if (type === "ALL") {
      fetchAllNews(); // Fetch all news for the 'ALL' tab
    } else if (type === "query") {
      setQuery(value);
    } else if (type === "category") {
      setCategory(value);
    } else if (type === "source") {
      setSource(value);
    }
  };

  return (
    <div className={styles.newsContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.mainHeading}>
          Stay Updated with the Latest{" "}
          <span className={styles.highlight}>News</span>
        </h1>
        <p className={styles.supportLine}>
          Bringing you the freshest stories from around the world, as they
          happen.
        </p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search headlines..."
          className={styles.inputField}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className={styles.filterButtons}>
        <button
          onClick={() => handleButtonClick("ALL")}
          className={`${styles.button} ${
            selectedButton === "ALL" ? styles.selectedButton : ""
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => handleButtonClick("query", "tesla")}
          className={`${styles.button} ${
            selectedButton === "query" && query === "tesla"
              ? styles.selectedButton
              : ""
          }`}
        >
          Tesla
        </button>
        <button
          onClick={() => handleButtonClick("query", "apple")}
          className={`${styles.button} ${
            selectedButton === "query" && query === "apple"
              ? styles.selectedButton
              : ""
          }`}
        >
          Apple
        </button>
        <button
          onClick={() => handleButtonClick("category", "business")}
          className={`${styles.button} ${
            selectedButton === "category" && category === "business"
              ? styles.selectedButton
              : ""
          }`}
        >
          Business
        </button>
        <button
          onClick={() => handleButtonClick("category", "technology")}
          className={`${styles.button} ${
            selectedButton === "category" && category === "technology"
              ? styles.selectedButton
              : ""
          }`}
        >
          Technology
        </button>
        <button
          onClick={() => handleButtonClick("category", "sports")}
          className={`${styles.button} ${
            selectedButton === "category" && category === "sports"
              ? styles.selectedButton
              : ""
          }`}
        >
          Sports
        </button>
        <button
          onClick={() => handleButtonClick("source", "techcrunch")}
          className={`${styles.button} ${
            selectedButton === "source" && source === "techcrunch"
              ? styles.selectedButton
              : ""
          }`}
        >
          TechCrunch
        </button>
        
      </div>

      <div className={styles.newsList}>
  {news.length > 0 ? (
    news
      .filter(article => article.title !== "Removed") // Filter out articles with "Removed" title
      .map((article, index) => (
        <div key={index} className={styles.newsCard}>
          <div className={styles.imageContainer}>
            <img
              src={article.urlToImage}
              alt={article.title}
              className={styles.image}
            />
            <span className={styles.tag}>Source: <strong>{article.source.name}</strong></span>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{article.title}</h3>
            <p className={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <p className={styles.description}>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.readMore}
            >
              READ MORE
            </a>
          </div>
        </div>
      ))
  ) :  !loading && <p>No news available</p>}
</div>


     <div className={styles.load}> {loading && <p className={styles.loader}>.</p>}</div>
    </div>
  );
};

export default News;
