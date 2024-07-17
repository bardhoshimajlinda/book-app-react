import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
        <ul className="navigation">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/reading-list">MY READING LIST</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
