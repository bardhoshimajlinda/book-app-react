import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import BooksPage from "./pages/BooksPage";
import Home from "./pages/Home";
import MyReadingList from "./pages/MyReadingList";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:bookId" element={<BookDetails />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/reading-list" element={<MyReadingList />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound title={"Page not found"} />} />
    </Routes>
  );
}

export default App;
