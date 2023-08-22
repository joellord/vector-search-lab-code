import React, { useState, useEffect } from "react";

// Components
import Header from "./Header";
import Grid from "./Grid/Grid";
import Thumb from "./Thumb/Thumb";
import Filter from "./Filter/Filter";

const Home = () => {
  // INSERT YOUR CREATED MOVIE ENDPOINT
  const BASE_URL = "http://localhost:5050/movies";
  // const MOVIES_VECTOR_SEARCH_ENDPOINT = "http://localhost:5050/movies/semantic";

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("find"); // find, search, semantic
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [dateStart, setDateStart] = useState(new Date(1970, 12, 1));
  const [dateEnd, setDateEnd] = useState(new Date(2022, 1, 4));
  const [genre, setGenre] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [showNeedEndpointMessage, setShowNeedEndpointMessage] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleted, setAutocompleted] = useState(false);

  const [simpleView, setSimpleView] = useState(true);

  const toggleSimpleView = () => setSimpleView(!simpleView);

  const getMovies = async (searchTerm) => {
    console.log("HITTING FETCH MOVIES API");
    console.log("SEARCHTERM: ", searchTerm);

    const GET_MOVIES_ENDPOINT = `${BASE_URL}/${searchMode}?searchTerms=${searchTerm}`;
    console.log("ENDPOINT: ", GET_MOVIES_ENDPOINT);

    try {
      const returnedMovies = await (await fetch(GET_MOVIES_ENDPOINT)).json();
      setMovies(returnedMovies);
      console.log("MOVIES FROM THE FRONT END: ", returnedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!submitted) return;
    getMovies(searchTerm);
    // getMoviesAdvanced(searchTerm);

    setSubmitted(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  return (
    <>
      {" "}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showCodeBlock={showCodeBlock}
        setShowCodeBlock={setShowCodeBlock}
        setMovies={setMovies}
        setSubmitted={setSubmitted}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        autocompleted={autocompleted}
        setAutocompleted={setAutocompleted}
        simpleView={simpleView}
        toggleSimpleView={toggleSimpleView}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />
      <div className="container">

        {!simpleView && <Filter
          dateStart={dateStart}
          dateEnd={dateEnd}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
          genre={genre}
          setGenre={setGenre}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          setSubmitted={setSubmitted}
          searchTerm={searchTerm}
          showCodeBlock={showCodeBlock}
          setShowCodeBlock={setShowCodeBlock}
          toggleSimpleView={toggleSimpleView}
        />
        }

        {showNeedEndpointMessage ? (
          <div className="needEndpoint">Build Movie 📽️ Endpoint Please</div>
        ) : (
          <Grid header={searchTerm ? null : "Movie Search Results"}>
            {movies.map((movie) => (
              <Thumb
                key={movie._id}
                movie={movie}
                clickable
                movieID={movie._id}
                image={
                  movie.poster ? movie.poster : "http://bit.ly/AtlasMoviePoster"
                }
              ></Thumb>
            ))}
          </Grid>
        )}
      </div>{" "}
    </>
  );
};

export default Home;
