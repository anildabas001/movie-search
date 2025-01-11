import { useState, useEffect } from 'react';
import useFetch from './custom-hooks/useFetch';
import MovieSearch from './components/MovieSearch';
import useDebounce from './custom-hooks/useDebounce';

import styles from './App.module.css';

function App() {
  
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(1);
  
  let searchBy = useDebounce(filterValue, 400);

  const [data, error, loading] = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=86c0d81357e56a00855d8e50350ecf00&query=${searchBy}&language=en-US&page=${page}&include_adult=false`);    

  useEffect (() => {
    setPage(1);
  }, [searchBy]);

  function handleUpdateFilterValue (value) {
    setFilterValue(value)
  }

  function handlePageChange (pageNumber) {
    setPage(pageNumber);
  }  

    
  
  return (    
    <div className={styles.appContainer}>
      <MovieSearch 
        error={error}
        loading={loading}
        currentPage={page}
        movieData={data?.results || []} 
        totalPages={data?.total_pages || 0}
        totalResult={data?.total_results || 0}
        inputValue={filterValue} 
        handleUpdateFilterValue={handleUpdateFilterValue}
        handlePageChange={handlePageChange}  
      /> 
    </div>       
  );
}

export default App;
