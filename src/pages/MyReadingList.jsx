import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import MainLayout from "../layouts/MainLayout";
import useReadingList from "../hooks/useReadingList";

const fetchBookById = async (id) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch book with id: ${id} - ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

const MyReadingList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { readingList, toggleReadingList } = useReadingList();

  useEffect(() => {
    if (readingList.length > 0) {
      const fetchBooks = async () => {
        try {
          const bookPromises = readingList.map((id) => fetchBookById(id));
          const fetchedBooks = await Promise.all(bookPromises);
          setBooks(fetchedBooks);
        } catch (error) {
          console.error("Error fetching books:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    } else {
      setLoading(false);
    }
  }, [readingList]);

  return (
    <MainLayout>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : books.length > 0 ? (
          <div className="books">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isAdded={readingList.includes(book.id)}
                toggleReadingList={toggleReadingList}
              />
            ))}
          </div>
        ) : (
          <p>No books in your reading list.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MyReadingList;
