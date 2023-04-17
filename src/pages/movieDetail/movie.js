import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()

    const {id} = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=95e0702f55d95f87a05616d512de41e2&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    return (
        <div className="movie">
            <div className="movie_intro">
                <img className="movie_backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail?currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img className="movie_poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail?currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{currentMovieDetail?currentMovieDetail.original_title : ""}</div>
                        <div className="movie_tagline">{currentMovieDetail?currentMovieDetail.tagline : ""}</div>
                        <div className="movie_rating">
                        <i class="fas fa-star" /> {currentMovieDetail?currentMovieDetail.vote_average: ""}
                            <span className="movie_voteCount">{currentMovieDetail? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie_runtime">{currentMovieDetail?currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie_releaseDate">{currentMovieDetail?"Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie_genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie_genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie_links">
                <div className="movie_heading">Useful Links:</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie_homeButton movie_Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie_imdbButton movie_Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie_heading">Production companies</div>
            <div className="movie_production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie_productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie;