import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams, useNavigate } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState(null);

  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const trailer =
          data.results.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer"
          ) || data.results[0];

        setApiData(trailer || null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="player">

      {/* Back Button */}
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-arrow"
        onClick={() => navigate("/")}
      />

      {/* Trailer */}
      {apiData?.key ? (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name || "Trailer"}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ) : (
        <p className="loading">Loading trailer...</p>
      )}

      {/* Video Information */}
      {apiData && (
        <div className="player-info">

          <p>
            <span>Published Date:</span>{" "}
            {apiData.published_at
              ? new Date(apiData.published_at).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            <span>Name:</span> {apiData.name}
          </p>

          <p>
            <span>Type:</span> {apiData.type}
          </p>

        </div>
      )}

    </div>
  );
};

export default Player;