import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DashBoard from "./pages/DashBoard";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-provider";
import DashBoard from "./pages/DashBoard";
import City from "./pages/City";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/city/:city-name" element={<City />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
