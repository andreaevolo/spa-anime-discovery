import React, { useState, useRef, useEffect } from "react";
import Banner from "./Banner";
import SearchBar from "./SearchBar";
import AnimeCardBoard from "./AnimeCardBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

const Home = (props) => {
  const [searchBarInputValue, setSearchBarInputValue] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [loadingDataStatus, setLodingDataStatus] = useState(false);
  const researchDone = useRef(true);

  const handleChange = (val) => {
    researchDone.current = false;
    setSearchBarInputValue(val);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLodingDataStatus(true);
      if (props.cachedResearch.length) {
        console.log(props.cachedResearch.length);
        setAnimeList(props.cachedResearch);
      }
      if (searchBarInputValue !== "") {
        try {
          const res = await fetch(
            `https://api.jikan.moe/v3/search/anime?q=${searchBarInputValue}`
          );
          const animeList = await res.json();
          if (!res.ok) {
            throw new Error("Error, unable to fetch data.");
          }
          setAnimeList(animeList.results);
          props.onCacheUpdate(animeList.results);

          setTimeout(() => {
            setLodingDataStatus(false);
          }, 1000);
        } catch (err) {
          setAnimeList([]);
          setLodingDataStatus(false);
        }
      }
      setLodingDataStatus(false);
    };
    fetchResults();
  }, [searchBarInputValue]);

  return (
    <div>
      <Banner title="Search info about your favourite anime or discover new one" />
      <SearchBar onInputChange={handleChange} />
      {!animeList.length ? (
        <div id="board-container">
          <p style={{ textAlign: "center" }}>
            You haven't searched any anime yet!
          </p>
        </div>
      ) : (
        <div id="board-container">
          {loadingDataStatus ? (
            <Spinner color="slateblue" size="3x" />
          ) : (
            <AnimeCardBoard
              //animeList={props.userAnimeList}
              cardsList={animeList}
              onAddElementToUserList={props.addElementToAnimeList}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
