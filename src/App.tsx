import { Header } from "./shared/layout/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <HomePage />
    </div>
  );
}

export default App;
