import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewRate = (props) => {
  const rate = props.rate;
  const getRatingElements = (rate) => {
    const stars = [];

    for (let i = 0; i < 10; i++) {
      if (i < rate) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="#ffd000" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="gray" />);
      }
    }
    return stars;
  };

  return <div className="rate-container">{getRatingElements(rate)}</div>;
};

export default ReviewRate;
