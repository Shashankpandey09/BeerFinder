
import Home from './Component/pages/HomePage/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import SingleProductPage from './Component/pages/SinglePage/SingleProductPage';
import FrontPage from './Component/frontPage/FrontPage';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' exact element={<FrontPage/>} />
    <Route path='/Home' exact element={<Home/>} />
    <Route path="/product/:productId" element={<SingleProductPage />} />
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App;
