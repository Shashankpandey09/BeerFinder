import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const SingleProductPage = () => {

    const { productId } = useParams() 
  
    
    const { product } = useSelector((store) => store.beer);

    const beerProduct = product.find((item) => item.id == productId)

  return (
    <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold text-center mb-8">Item Detail</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="h-[80vh] ">
  <img
    src={beerProduct?.image_url}
    alt={beerProduct.name}
    className="object-contain w-full h-full rounded-lg animate-rotateX"
  />
</div>

        <div className=''>
          <h1 className="text-3xl font-bold mb-4 ">{beerProduct.name}</h1>
          <p className="text-gray-600 mb-2">{beerProduct.tagline}</p>
          <p className="text-gray-700 mb-4">{beerProduct.description}</p>
          <div className="mb-4">
            <p><span className="font-bold">ABV:</span> {beerProduct.abv}%</p>
            <p><span className="font-bold">IBU:</span> {beerProduct.ibu}</p>
            <p><span className="font-bold">First Brewed:</span> {beerProduct.first_brewed}</p>
          </div>
          <div className="mb-4">
            <p><span className="font-bold">Target FG:</span> {beerProduct.target_fg}</p>
            <p><span className="font-bold">Target OG:</span> {beerProduct.target_og}</p>
            <p><span className="font-bold">EBC:</span> {beerProduct.ebc}</p>
            <p><span className="font-bold">SRM:</span> {beerProduct.srm}</p>
            <p><span className="font-bold">PH:</span> {beerProduct.ph}</p>
          </div>
          <div className="mb-4">
            <p><span className="font-bold">Attenuation Level:</span> {beerProduct.attenuation_level}</p>
          </div>
          <div className="mb-4">
            <p><span className="font-bold">Brewers Tips:</span> {beerProduct.brewers_tips}</p>
          </div>
          <div className="mb-4">
            <p><span className="font-bold">Contributed By:</span> {beerProduct.contributed_by}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
