import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SearchPage from './pages/Search';

class App extends Component {

  render() {
    return (
      <>
        <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
          <SearchPage params={{}}/>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
