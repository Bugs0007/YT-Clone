import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recommended.css";
import moment from "moment";
import { API_KEY } from "./../../data";
import { value_converter } from "../../data";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      // Use videos endpoint for reliable results
      const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=45&key=${API_KEY}`;
      const response = await fetch(relatedVideo_url);
      const data = await response.json();

      if (data.items) {
        setApiData(data.items);
      }
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }
  };

  useEffect(() => {
    console.log("Recommended categoryId:", categoryId);
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item) =>
        item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.medium ? (
          <Link
            to={`/video/${categoryId}/${item.id}`}
            className="side-video-list"
            key={item.id}
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>
                {value_converter(item.statistics?.viewCount)} Views &bull;{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        ) : null
      )}
    </div>
  );
};

export default Recommended;
