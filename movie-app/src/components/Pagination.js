import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: Math.min(totalPages, 8) }, (_, index) => index + 1).map((pageNumber) => (
        <div key={pageNumber} className="pagination-item">
          <button onClick={() => handlePageChange(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
            {pageNumber}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
