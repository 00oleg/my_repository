import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/Search';
import DetailPage from './pages/Detail';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<SearchPage />}>
        <Route path={':id'} element={<DetailPage />} />
      </Route>
      <Route path={'*'} element={<div>Page not found 404</div>} />
    </Routes>
  );
}

export default App;
