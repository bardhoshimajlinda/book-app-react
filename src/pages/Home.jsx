import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import Suggested from "../components/Suggested";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/books?q=${query}`);
  };

  return (
    <MainLayout>
      <div>
        <h2 className="title">Book Space</h2>

        <Search value={query} onChange={setQuery} handleSearch={handleSearch} />

        <div>
          <h3 className="sugested">Suggested Books</h3>
          <hr></hr>
          <div>
            <Suggested query="Don miguel ruiz" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
