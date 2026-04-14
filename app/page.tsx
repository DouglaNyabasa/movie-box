"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import { API_URL, IMAGE_PATH } from "@/constants";
import Image from "next/image";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      console.log("Fetching movies...");
      try {
        const response = await fetch(`${API_URL}/discover/movie`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMovies(data.results || []); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <HeroSection />
      <div className="flex flex-col m-10 mt-0">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-alabaster mb-3">
            Popular Movies Right Now
          </h2>
          <p className="text-lg text-santas-gray">
            Explore what everyone is watching
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div className="group" key={movie.id}>
            <div className="relative overflow-hidden cursor-pointer group rounded-xl">
              <Image
                className="group-hover:scale-110 duration-500 h-full w-full object-cover"
                src={
                  movie.poster_path
                    ? `${IMAGE_PATH}${movie.poster_path}`
                    : "/placeholder-img.svg"
                }
                width={250}
                height={250}
                alt={movie.title || "Movie poster"} 
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
