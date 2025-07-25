import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/movieContext";
import Sidebar from "./components/Sidebar";
import Router from "./router";
import "./App.css";

function App() {
  return (
    <>
      <div className="bg-black h-screen relative">
        <BrowserRouter>
          <div className="absolute top-0 left-0 z-10">
            <Sidebar />
          </div>
          <main className="ml-[160px]">
            <MovieProvider>
              <Router />
            </MovieProvider>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
