import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const handleWheel = (e) => {
    // Only handle vertical mouse wheel
    // Desktop users can scroll horizontally
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();

      if (cardsRef.current) {
        cardsRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url =
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

        if (category === "popular") {
          url =
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        } else if (category === "top_rated") {
          url =
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        } else if (category === "upcoming") {
          url =
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setApiData(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    const cardsElement = cardsRef.current;

    if (cardsElement) {
      cardsElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">

      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <Link
            className="card"
            key={card.id}
            to={`/player/${card.id}`}
          >
            <img
              src={
                card.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                  : "/placeholder.jpg"
              }
              alt={card.title || card.original_title}
              loading="lazy"
            />

            <p>
              {card.original_title || card.title}
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default TitleCard;