
import Home from './Component/pages/HomePage/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import SingleProductPage from './Component/pages/SinglePage/SingleProductPage';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' exact element={<Home/>} />
    <Route path="/product/:productId" element={<SingleProductPage />} />
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App;
