import React, { useContext, useState, useEffect } from 'react';
import Banner1 from '../assets/banner1.jpg';
import Banner2 from '../assets/banner2.jpg';
import Banner3 from '../assets/banner3.jpg';
import Banner4 from '../assets/banner4.jpg';
import Banner5 from '../assets/banner5.jpg';
import Banner7 from '../assets/Banner7.webp';
import Banner8 from '../assets/Banner8.webp';
import ad1 from '../assets/ad1.webp';
import ad2 from '../assets/ad2.webp';
import ad3 from '../assets/ad3.webp';
import ad4 from '../assets/ad4.jpg';
import ad5 from '../assets/ad5.jpg';
import ad6 from '../assets/ad6.webp';
import ad7 from '../assets/ad7.webp';
import ad8 from '../assets/ad8.webp';
import ecomContext from '../context/context';
import { Link } from 'react-router-dom';

// Loader component
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="loader border-t-transparent border-solid rounded-full border-blue-500 border-8 h-16 w-16 animate-spin"></div>
  </div>
);

const Home = () => {
  const { products } = useContext(ecomContext);

  let slides = [Banner2, Banner7, Banner1, Banner3, Banner8, Banner4, Banner5];
  let [current, setCurrent] = useState(0);

  // Loading states
  const [loadingMen, setLoadingMen] = useState(true);
  const [loadingWomen, setLoadingWomen] = useState(true);
  const [loadingKids, setLoadingKids] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoadingMen(false); // Set loading to false once data is loaded
      setLoadingWomen(false);
      setLoadingKids(false);
    }
  }, [products]);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  const SinglePage = (item) => {
    localStorage.setItem('items', item.name);
    localStorage.setItem('items price', item.new_price);
    localStorage.setItem('items oldprice', item.old_price);
    localStorage.setItem('items image', item.image);
    localStorage.setItem('items id', item.id);
    console.log(item);
  };

  return (
    <>
      <div>
        <div className="bg-black text-white p-2 w-full text-xs text-center">
          Shop Our Sale: Big Savings Await!
        </div>

        {/* Banner Section */}
        <div className="sm:mx-0 lg:mx-36">
          <div className="overflow-hidden relative w-full h-52 md:h-80 lg:h-[500px]">
            <div
              className={`flex transition ease-out duration-500 `}
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {slides.map((s, index) => (
                <img key={index} src={s} alt="banner" className="w-full object-cover" />
              ))}
            </div>

            <div className="absolute top-0 h-full w-full flex justify-between items-center px-3 lg:px-10 text-white">
              <button onClick={previousSlide}>
                <span className="material-symbols-outlined text-black font-bold">
                  arrow_back_ios
                </span>
              </button>
              <button onClick={nextSlide}>
                <span className="material-symbols-outlined text-black font-bold">
                  arrow_forward_ios
                </span>
              </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full w-2 h-2 cursor-pointer ${i === current ? 'bg-white' : 'bg-gray-500'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Men's Section */}
        <div className="text-center mt-8">
          <h1 className="text-2xl md:text-4xl m-5">Just Launched!!! 🚀</h1>
          <p className="text-sm md:text-lg mb-6">Summer Collections for Men</p>

          {loadingMen ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 lg:mx-0">
              {products.filter((item) => item.category === 'men').slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <Link to={`${product.name}`} key={product.id}>
                    <div className="overflow-hidden h-48">
                      <img
                        src={product.image}
                        onClick={() => SinglePage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-lg truncate">{product.name}</div>
                      <div className="text-green-600 text-md font-semibold">₹ {product.new_price}</div>
                      <div className="text-gray-400 text-sm line-through">₹ {product.old_price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 md:mt-10">
            <Link to="/mens">
              <button className="bg-black text-white py-2 px-6 rounded-md">See More</button>
            </Link>
          </div>
        </div>

        {/* Kids Section */}
        <div className="text-center mt-10">
          <h1 className="text-2xl md:text-4xl">Champ Collection</h1>
          {loadingKids ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 lg:mx-0">
              {products.filter((item) => item.category === 'kid' || item.category === 'kids').slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <Link to={`/${product.name}`} key={product.id}>
                    <div className="overflow-hidden h-48">
                      <img
                        src={product.image}
                        onClick={() => SinglePage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-lg truncate">{product.name}</div>
                      <div className="text-green-600 text-md font-semibold">₹ {product.new_price}</div>
                      <div className="text-gray-400 text-sm line-through">₹ {product.old_price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 md:mt-10">
            <Link to="/kids">
              <button className="bg-black text-white py-2 px-6 rounded-md">See More</button>
            </Link>
          </div>
        </div>

        {/* Women's Section */}
        <div className="text-center mt-10">
          <h1 className="text-2xl md:text-4xl">Queens Collection</h1>
          {loadingWomen ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 lg:mx-0">
              {products.filter((item) => item.category === 'women' || item.category === 'womens').slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <Link to={`/${product.name}`} key={product.id}>
                    <div className="overflow-hidden h-48">
                      <img
                        src={product.image}
                        onClick={() => SinglePage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-lg truncate">{product.name}</div>
                      <div className="text-green-600 text-md font-semibold">₹ {product.new_price}</div>
                      <div className="text-gray-400 text-sm line-through">₹ {product.old_price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 md:mt-10">
            <Link to="/womens">
              <button className="bg-black text-white py-2 px-6 rounded-md">See More</button>
            </Link>
          </div>
        </div>

        {/* Ads Section */}
        <div className="my-10">
          <img src={ad6} alt="ad" className="w-full mb-2" />
          <div className="grid grid-cols-2 gap-4">
            <img src={ad7} alt="ad" className="w-full" />
            <img src={ad8} alt="ad" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
