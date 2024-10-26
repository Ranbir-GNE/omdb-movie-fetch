import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Searchbar from "./components/searchBar";
import MovieList from "./components/movieList";

const App = () => {
  return (
    <Provider store={store}>
      
      <div className="App bg-gray-900 min-h-screen text-white p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Movie Search App
        </h1>
        <Searchbar />
        <MovieList />
      </div>
    </Provider>
  );
};

export default App;
