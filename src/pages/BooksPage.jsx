import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import Search from "../components/Search";
import useGetBooks from "../hooks/useGetBooks";
import useReadingList from "../hooks/useReadingList";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BooksPage = () => {
  const query = useQuery();
  const searchQuery = query.get("q");
  const [searchValue, setSearchValue] = useState(searchQuery);
  const { readingList, toggleReadingList } = useReadingList();

  const {
    books,
    isLoading,
    refetch: fetchBooks,
  } = useGetBooks({
    query: searchValue,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === null) {
      navigate("/");
    } else {
      setSearchValue(searchQuery);
    }
  }, [searchQuery, navigate]);

  if (searchQuery === null) {
    return null;
  }

  const handleSearch = () => {
    fetchBooks(searchValue);
    window.history.pushState({}, null, `/books?q=${searchValue}`);
  };

  return (
    <MainLayout>
      <>
        <Search
          value={searchValue}
          onChange={setSearchValue}
          handleSearch={handleSearch}
        />
      </>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="books">
          {books && books.length > 0
            ? books.map((book) => {
                const isAdded = readingList.includes(book.id);
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    isAdded={isAdded}
                    toggleReadingList={toggleReadingList}
                  />
                );
              })
            : "No books found"}
        </div>
      )}
    </MainLayout>
  );
};

export default BooksPage;
