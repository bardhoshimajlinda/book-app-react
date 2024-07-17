import { PropTypes } from "prop-types";
import catSvg from "../assets/404error.svg";
import MainLayout from "../layouts/MainLayout";

const PageNotFound = ({ title }) => {
  return (
    <MainLayout>
      <div className="not-found">
        <img className="page-not-found" src={catSvg} alt="Page not found" />
        <h1 className="no-book">{title}</h1>
      </div>
    </MainLayout>
  );
};

PageNotFound.propTypes = {
  title: PropTypes.string,
};

export default PageNotFound;
