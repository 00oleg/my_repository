import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchTop from '../../components/Top';
import SearchResults from '../../components/Result';
import PaginationResults from '../../components/Pagination';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';

const SearchPage = () => {
  const { searchInput, results, updateResults } = useAppContext();
  const [firstLoader, setFirstLoader] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('page') || 1));
  const [totalPages, setTotalPages] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  
  const handleSearchParams = (param: URLSearchParams) => {
    setSearchParams(param);
  }

  const handleLoading = (param: boolean) => {
    setLoading(param);
  }

  const handlePageNumber = (param: number) => {
    setPageNumber(param);
  }

  const handleTotalPages = (param: number) => {
    setTotalPages(param);
  }

  const handlePerPage = (param: number) => {
    setPerPage(param);
  }
  
  const handleSearch = () => {
    localStorage.setItem('searchText', searchInput);
    
    handleLoading(true);

    fetch(
      `https://stapi.co/api/v1/rest/animal/search?name=${searchInput}&pageNumber=${pageNumber-1}&pageSize=${perPage}`,
      {
        method: 'POST',
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response was not ok');
        }

        return response.json();
      })
      .then(({ animals, page }) => {
        handleTotalPages(page.totalPages);
        updateResults(animals);
        handleLoading(false);
      })
      .catch((error) => {
        handleLoading(false);
        throw new Error(error);
      });
  };
  
  const handleSearchText = () => {
    if (pageNumber !== 1) {
      handlePageNumber(1);
    } else {
      handleSearch();
    }
  }

  useEffect(() => {

    if (pageNumber !== 1) {
      const updatedSearchParams = new URLSearchParams();
      updatedSearchParams.set('page', '1');
      handleSearchParams(updatedSearchParams);
      handlePageNumber(1);
    } else {

      if (firstLoader) {
        setFirstLoader(false);
      }

      handleSearch();
    }
  }, [perPage]);

  useEffect(() => {

    if (!firstLoader) {
      handleSearch();
    }
    
  }, [pageNumber]);

  useEffect(() => {

    if (!firstLoader) {
      handlePageNumber(Number(searchParams.get('page') || 1));
    }
  }, [searchParams]);

  return (
    <div className='search-page'>
      <div className='search-page__left'>
        <SearchTop onSearch={handleSearchText} />
        <SearchResults loading={loading} results={results} />
        {loading || !results.length ? (
          null
        ) : (
          <PaginationResults 
            pageNumber={pageNumber} 
            totalPages={totalPages} 
            perPage={perPage} 
            handlePerPage={handlePerPage} 
          />
        )}
      </div>

      <div className='search-page__right'>
        <Outlet />
      </div>
    </div>
  )
}

export default SearchPage;
