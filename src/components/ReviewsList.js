import { useState } from "react";
import ReviewListItem from "./ReviewListItem";
import Spinner from "./Spinner";

const ReviewsList = (props) => {
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    const res = await fetch(
      `https://api.jikan.moe/v3/anime/${props.animeID}/reviews`
    );
    const data = await res.json();

    setReviews(data.reviews);
    setShowReviews(true);
    setLoadingReviews(false);
  };

  const handleClick = () => {
    fetchReviews();
  };

  return (
    <div id="anime-reviews-container">
      {!showReviews ? (
        !loadingReviews ? (
          <div id="load-reviews-btn" onClick={handleClick}>
            Read Reviews
          </div>
        ) : (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Spinner color="slateblue" size="3x" />
          </div>
        )
      ) : (
        <div id="reviews-list">
          {!reviews.length ? (
            <p>There aren't any reviews for this anime.</p>
          ) : (
            reviews.map((review) => {
              const { id, reviewer, content } = review;
              const { image_url, username, scores } = reviewer;

              return (
                <ReviewListItem
                  key={id}
                  pic={image_url}
                  nickname={username}
                  text={content}
                  score={scores.overall}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
