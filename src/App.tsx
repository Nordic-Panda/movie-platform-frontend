import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./shared/layout/Header";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
