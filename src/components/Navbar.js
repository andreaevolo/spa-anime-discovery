import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-list">My List</Link>
          <span>{props.numberOfItems}</span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
