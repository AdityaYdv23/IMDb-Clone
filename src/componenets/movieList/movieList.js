import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () =>{

    const [movieList, setMovieList] = useState([])

    const {type} =useParams()

    useEffect(() =>{
        getData()
    }, [])

    useEffect(() =>{
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type?type:'popular'}?api_key=95e0702f55d95f87a05616d512de41e2&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    return (
        <div className="movie_list">
            <h2 className="list_title">{(type?type.replace('_','-'):"POPULAR").toUpperCase()}</h2>
            <div className="list_cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList;