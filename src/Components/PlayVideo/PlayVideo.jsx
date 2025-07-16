import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]); // Add this state

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      setApiData(data.items[0]);

      // Fetch channel data
      const channelId = data.items[0]?.snippet?.channelId;
      if (channelId) {
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${API_KEY}`;
        const channelResponse = await fetch(channelUrl);
        const channelData = await channelResponse.json();
        setChannelData(channelData.items[0]);
      }

      // Fetch comments
      const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&key=${API_KEY}`;
      const commentsResponse = await fetch(commentsUrl);
      const commentsData = await commentsResponse.json();
      setComments(commentsData.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData?.snippet?.title || "Title Here"}</h3>

      <div className="play-video-info">
        <p>
          {value_converter(apiData?.statistics?.viewCount || "0")} Views &bull;{" "}
          {moment(apiData?.snippet?.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="like" />
            {value_converter(apiData?.statistics?.likeCount || "0")}
          </span>
          <span>
            <img src={dislike} alt="dislike" />
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || user_profile}
          alt={channelData?.snippet?.title}
        />
        <div>
          <p>{channelData?.snippet?.title || "Channel Name"}</p>
          <p>
            {value_converter(channelData?.statistics?.subscriberCount || "0")}{" "}
            Subscribers
          </p>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      <div className="vide-description">
        <p>
          {apiData?.snippet?.description?.split("\n")[0] ||
            "No description available"}
        </p>
        <hr />
        <h4>
          {value_converter(apiData?.statistics?.commentCount || "0")} Comments
        </h4>

        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <img
              src={
                comment.snippet.topLevelComment.snippet.authorProfileImageUrl ||
                user_profile
              }
              alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
            />
            <div>
              <h3>
                {comment.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                <span>
                  {moment(
                    comment.snippet.topLevelComment.snippet.publishedAt
                  ).fromNow()}
                </span>
              </h3>
              <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>
                  {value_converter(
                    comment.snippet.topLevelComment.snippet.likeCount || "0"
                  )}
                </span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
