import Navbar from "./components/Navbar";
import Home from "./components/Home";
import InfoPage from "./components/InfoPage";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import * as LocalStorage from "./components/util/LocalStorage";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [userAnimeList, setUserAnimeList] = useState([]);
  const [localStorageElementCount, setLocalStorageElementCount] = useState(0);
  const [searchCache, setSearchCache] = useState([]);

  const handleElementToUserList = (el) => {
    setUserAnimeList([...userAnimeList, el]);
  };

  const handleRemoveFromUserList = (id) => {
    
    let newList = userAnimeList.filter((el) => {
      return el.mal_id !== id;
    });
    
    setUserAnimeList(newList);
  };

  const handleCacheUpdate = (lastAnimeSearchedList) => {
    console.log(lastAnimeSearchedList);
    setSearchCache(lastAnimeSearchedList);
  };

  const resetUserList = () => {
    setUserAnimeList([]);
  };

  useEffect(() => {
    let localStorageIDs = LocalStorage.getItem("animeIDs");
    // console.log(localStorageIDs);
    // if local storage is not empty
    if (localStorageIDs) {
      // fetch every information of the anime saved and store it in the app state
      if (localStorageElementCount < localStorageIDs.length) {
        let timerId = setInterval(async () => {
          console.log("entro in interval");
          // make a call for each id every 600ms **THE API HAS A LIMIT OF 2 REQUESTS PER SECOND**

          // console.log(localStorageElementCount);
          try {
            const res = await fetch(
              `https://api.jikan.moe/v3/anime/${localStorageIDs[localStorageElementCount]}`
            );
            const data = await res.json();
            setUserAnimeList([...userAnimeList, data]);
            setLocalStorageElementCount(localStorageElementCount + 1);
          } catch (err) {
            console.log(err);
          }
        }, 1000);
        return () => {
          clearInterval(timerId);
        };
      }
    }
  }, [localStorageElementCount, userAnimeList]);

  return (
    <div className="App">
      <Navbar numberOfItems={userAnimeList.length} />
      <Switch>
        <Route path="/info/:id">
          <InfoPage
            updateUserList={handleElementToUserList}
            removeFromUserList={handleRemoveFromUserList}
          />
        </Route>
        <Route path="/my-list">
          <UserList
            animeList={userAnimeList}
            onUpdateList={handleRemoveFromUserList}
            onResetList={resetUserList}
            title="Your anime list"
          />
        </Route>
        <Route path="/">
          <Home
            cachedResearch={searchCache}
            onCacheUpdate={handleCacheUpdate}
            addElementToAnimeList={handleElementToUserList}
          />
        </Route>
      </Switch>
      <Footer fullName={"Andrea Ev"} year={"2021"} />
    </div>
  );
}

export default App;
