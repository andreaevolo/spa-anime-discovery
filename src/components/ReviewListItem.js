import { useState } from "react";
import ReviewRate from "./ReviewRate";

const ReviewListItem = (props) => {
  const [readFullReview, setReadFullReview] = useState(false);

  return (
    <div className="review-list-item">
      <div className="review-info">
        <img src={props.pic} alt="reviewer pic" />
        <p className="review-nickname">{props.nickname}</p>
        <div className="review-rate">
          <ReviewRate rate={props.score} />
        </div>
      </div>
      <p>
        {readFullReview ? props.text : props.text.slice(0, 300)}
        <div
          className="readmore-review"
          onClick={() => {
            setReadFullReview(!readFullReview);
          }}
        >
          <span>{readFullReview ? "hide" : "...read more"}</span>
        </div>
      </p>
    </div>
  );
};
export default ReviewListItem;
