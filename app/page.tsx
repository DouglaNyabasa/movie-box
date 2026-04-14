"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import { API_URL, IMAGE_PATH } from "@/constants";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
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
      <HeroSection/>
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
              <div className="absolute top-3 right-3 items-center flex gap-1 backdrop-blur-sm rounded-xl px-2.5 py-1 bg-black/70">
                <Star className="h-3.5 w-3.5 text-saffron fill-saffron" />
                <span className="text-sm font-semibold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
               <div className="absolute bottom-0 left-0 right-0 px-4 opacity-0 group-hover:opacity-100">
                <p className="line-clamp-4 text-sm text-white/90 text-center">{movie.overview}</p>
               </div>
            </div>
              <div className="mt-3 px-1">
                <h3 className="font-semibold transition-colors group-hover:text-red-500">{movie.title}</h3>
                <p className="text-sm text-santas-gray">{movie.release_date.split("-")[0]}</p>
              </div>
          </div>
        ))}
      </div>
    </>
  );
}
