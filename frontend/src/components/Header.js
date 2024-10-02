// Header.js
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { GrSearch } from 'react-icons/gr';
import { setUserDetails } from '../store/userSlice';
import summaryApi from '../common';
import { toast } from 'react-toastify';

import Logo from '../components/Logo';
import { Context } from '../context';

const Header = () => {
  const { removeCart, cartProductCount, user } = useContext(Context);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(summaryApi.logout_user.url, {
        method: summaryApi.logout_user.method,
        credentials: 'include',
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails({ user: null, token: null }));
        removeCart();
        localStorage.removeItem('token');
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : '/search');
  };

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='container mx-auto h-full flex items-center px-4 justify-between'>
        <div className='mt-1 pr-8 relative border-r-4'>
          <Link to='/cart'>
            <FaCartShopping className='w-6 h-6 text-blue-800 cursor-pointer' />
            <div>
              <div className='bg-blue-800 text-white rounded-full w-5 h-4 flex justify-center items-center absolute top-4 left-4'>
                <p className='text-sm'>{cartProductCount}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className='flex gap-8 items-center'>
          <div className='relative'>
            {user && (
              <div className='flex flex-col'>
                <p className='cursor-pointer hover:text-blue-600' onClick={() => setMenuDisplay(prev => !prev)}>
                  {user.name}
                </p>
                <p>عزیز خوش آمدید</p>
              </div>
            )}
            {user && menuDisplay && (
              <div className='absolute bg-white bottom-0 top-12 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user.role === 'ADMIN' && (
                    <Link to='/admin-panel/all-products' className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                      منو ادمین
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div>
            {user ? (
              <button onClick={handleLogout} className='px-10 py-1 rounded-md text-white bg-blue-800 hover:bg-blue-600'>
                خروج
              </button>
            ) : (
              <Link to='/login'>
                <button className='px-10 py-1 rounded-md text-white bg-blue-800 hover:bg-blue-600'>ورود</button>
              </Link>
            )}
          </div>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border-b focus-within:shadow-md'>
          <input dir='rtl' className='w-full outline-none pr-4 text-blue-800' onChange={handleSearch} type='search' placeholder='جست و جو کالا ...' />
          <div className='text-lg min-w-[50px] h-8 bg-blue-800 flex justify-center items-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>
        <div className='w-[50px] h-[30px] mb-3'>
          <Link to='/'>
            <Logo w={30} h={10} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
