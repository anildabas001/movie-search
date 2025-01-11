import MovieCard from './MovieCard';
import Pagination from './Pagination';

import styles from './MovieSearch.module.css';

function MovieSearch ({error, loading, inputValue, currentPage, handleUpdateFilterValue, movieData, handlePageChange, totalPages}) {

    return (
        <div className={styles.searchContainer}>
            <input 
                placeholder="Please search your favourite movie here."
                type="text" 
                value={inputValue} 
                onChange={(evnt) => handleUpdateFilterValue(evnt.target.value)} 
                className={styles.searchInput}
            />
            <div className={styles.movieList}>
                {   error ? <h1 className={styles.heading}>Error!!</h1> :                    
                    loading ? <p>Loading...</p> :                 
                    movieData.length === 0 ? 
                    <h1 className={styles.heading}>Nothing to Show here.</h1> :
                    movieData.map((movie) => {
                        return (<MovieCard 
                            key={movie.id}
                            title={movie.original_title}
                            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path ? movie.poster_path : movie.backdrop_path }`}
                            summary={movie.overview}
                        />)
                    })
                }
            </div>
            {totalPages > 1 ? <Pagination  
                totalPage={totalPages}
                currentPage={currentPage} 
                updateCurrentPage={(pageNumber) => handlePageChange(pageNumber)}
                paginationLength={8}
            /> : null}
        </div>
    );
}

export default MovieSearch;