<<<<<<< HEAD
import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
//import SearchList from "./pages/SearchList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
=======
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import { Auth } from "./AuthContext";
import Profile from "./pages/Profile";
import NameDetails from "./pages/NameDetails";
import RootLayout from "./RootLayout";
// import ErrorPage from "./pages/Error";
import CreateInternals from "./pages/CreateInternals";
import CreateMovieAndNamesPage from "./pages/CreateMovieAndNamesPage";
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30

const queryClient = new QueryClient();

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            {/*<Route path="/search" element={<SearchList  />} />*/}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
=======
    <QueryClientProvider client={queryClient}>
      <Auth>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/names/:id" element={<NameDetails />} />
              <Route path="/create-users" element={<CreateInternals />} />
              <Route path="/create" element={<CreateMovieAndNamesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Auth>
    </QueryClientProvider>
>>>>>>> 4ed3955e39c36125f186caad2f6772bcaeea0e30
  );
}

export default App;
