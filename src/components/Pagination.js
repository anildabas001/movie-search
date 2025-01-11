import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination(props) {
  const { totalPage, currentPage, updateCurrentPage, paginationLength = 8 } = props;

  const firstPage = 1;
  const lastPage = totalPage;

  const [startPage, setStartPage] = useState(firstPage);
  const [endPage, setEndPage] = useState(paginationLength);

  useEffect(() => {

    if (totalPage <= 1) {
      setStartPage(firstPage);
      setEndPage(lastPage);
      return;
    }

    const half = Math.floor(paginationLength / 2);

    let newStart = currentPage - half;
    let newEnd = currentPage + half;

    if (paginationLength % 2 === 0) {
      newEnd = currentPage + half - 1;
    }

    if (newStart < firstPage) {
      newStart = firstPage;
      newEnd = Math.min(paginationLength, lastPage);
    }
    if (newEnd > lastPage) {
      newEnd = lastPage;

      newStart = Math.max(newEnd - paginationLength + 1, firstPage);
    }

    setStartPage(newStart);
    setEndPage(newEnd);
  }, [currentPage, totalPage, paginationLength, lastPage]);


  const onClickHandler = (pageNumber) => {
    updateCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > firstPage) {
      updateCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < lastPage) {
      updateCurrentPage(currentPage + 1);
    }
  };


  const paginationElements = () => {
    if (lastPage <= 0) return [];

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          className={`${styles.pageItem} ${
            currentPage === i ? styles.selected : ""
          }`}
          onClick={() => onClickHandler(i)}
        >
          {i}
        </span>
      );
    }
    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.pageNavButton}
        onClick={goToPrevPage}
        disabled={currentPage === firstPage}
      >
        Prev
      </button>

      {paginationElements()}

      <button
        className={styles.pageNavButton}
        onClick={goToNextPage}
        disabled={currentPage === lastPage}
      >
        Next
      </button>
    </div>
  );
}
