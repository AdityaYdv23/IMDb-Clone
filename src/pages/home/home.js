import React, { useEffect, useState } from "react";
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../componenets/movieList/movieList";

const Home = () =>{

    const [popularMovies, setpopularMovies] =useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=95e0702f55d95f87a05616d512de41e2&language=en-US")
        .then(res => res.json())
        .then(data => setpopularMovies(data.results))
    }, [])
    return (
        <>
            <div className="poster">
                <Carousel showThumbs={false} autoPlay={true} transitionTime={5} infiniteLoop={true} showStatus={false}>
                    {
                        popularMovies.map(movie =>(
                            <Link style={{textDecoration:"none", color:"white"}} to={`/movie/${movie.id}`}>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>
                                </div>
                                <div className="posterImage_overlay">
                                    <div className="posterImage_title">{movie?movie.original_title: ""}</div>
                                    <div className="posterImage_runtime">
                                        {movie?movie.release_date:""}
                                        <span className="posterImage_rating">
                                            <i className="fas fa-star"/>{" "}
                                            {movie?movie.vote_average: ""}
                                        </span>
                                    </div>
                                    <div className="posterImage_description">{movie?movie.overview: ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList/>
            </div>
        </>
    )
}

export default Home