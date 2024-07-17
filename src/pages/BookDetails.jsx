import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetBookById from "../hooks/useGetBookById";
import useReadingList from "../hooks/useReadingList";
import MainLayout from "../layouts/MainLayout";
import PageNotFound from "./PageNotFound";

const BookDetails = () => {
  let { bookId } = useParams();

  const { book, isLoading, isError } = useGetBookById(bookId);
  const { readingList, toggleReadingList } = useReadingList();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(readingList.includes(bookId));
  }, [readingList, bookId]);

  // handle book not found
  if (isLoading) {
    return <div>Is loading</div>;
  }
  if (isError) return <PageNotFound title="Book Not Found" />;

  const description = book.volumeInfo.description
    ? book.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, "")
    : "No description available";

  let imageUrl = book.volumeInfo.imageLinks.smallThumbnail;

  const url = new URL(imageUrl);
  url.searchParams.delete("zoom");
  const updatedImageUrl = url.toString();

  const handleToggleReadingList = () => {
    if (readingList.includes(bookId)) {
      toggleReadingList(bookId);
      setIsAdded(false);
    } else {
      toggleReadingList(bookId);
      setIsAdded(true);
    }
  };

  return (
    <MainLayout>
      <div className="book-details">
        <div className="book-cover">
          <img src={updatedImageUrl} alt="book-image" />
        </div>
        <div className="book-info">
          <h1 className="book-title">{book.volumeInfo.title}</h1>
          <p className="book-author">
            <strong>Authors: </strong>
            {book.volumeInfo.authors.join(", ")}
          </p>
          <p>
            <strong>Publish Date: </strong>
            {book.volumeInfo.publishedDate}
          </p>
          <p className="book-pages">
            <strong>Pages: </strong>
            {book.volumeInfo.pageCount}
          </p>
          <p className="book-description">
            <strong>Description: </strong>
            {description}
          </p>
          <button
            className={`btn ${readingList.includes(bookId) ? "added" : ""}`}
            onClick={handleToggleReadingList}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`icon ${readingList.includes(bookId) ? "added" : ""}`}
            />
            {readingList.includes(bookId)
              ? "Added to My Reading List"
              : "Add to My Reading List"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetails;
