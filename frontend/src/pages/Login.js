import React, { useContext, useState } from 'react';
import Logo from '../components/Logo';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './../store/userSlice';
import { Context } from '../context';


const Login = () => {
  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(summaryApi.signIn.url,{
            method : summaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

  return (
    <section className='w-[90%] md:w-[500px] mx-auto' id='login'>
      <div className='container mx-auto p-4'>
        <div className='bg-white p-2 w-full max-w-sm md:max-w-md mx-auto'>
          <div className='w-[60px] h-[40px] mb-3 mx-auto'>
            <Logo w={30} h={10} />
          </div>

          <form onSubmit={handleSubmit} className='mt-8' dir='rtl'>
            <div className=''>
              <label className='my-2 w-[80%] mx-auto block h-full'>ایمیل:</label>
              <div>
                <input
                  onChange={handleOnChange}
                  value={data.email}
                  name='email'
                  className='bg-gray-100 my-2 w-[80%] mx-auto block h-[48px] outline-none'
                  type='email'
                  placeholder='ایمیل خود را وارد کنید'
                />
              </div>
            </div>

            <label className='my-2 w-[80%] mx-auto block h-full'>پسورد:</label>
            <div className='bg-gray-100 w-[80%] mx-auto'>
              <div className='flex'>
                <input
                  onChange={handleOnChange}
                  value={data.password}
                  name='password'
                  className='bg-gray-100 my-2 w-[80%] mx-auto block h-[32px] outline-none'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='گذرواژه خود را وارد کنید'
                />
                <div onClick={() => setShowPassword((prev) => !prev)}>
                  <span className='w-[80%] ml-4 block h-full mt-[20px]'>
                    {showPassword ? (
                      <FaEye className='cursor-pointer' />
                    ) : (
                      <FaEyeSlash className='cursor-pointer' />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-blue-800 rounded-full w-[100px] py-2 mb-8 mt-[60px] mx-auto block text-white'>
              ورود
            </button>
          </form>
          <p className='w-[50%] block mx-auto my-4'>
            کاربر جدید هستید؟{' '}
            <Link className='hover:text-blue-800 text-blue-500' to={"/sign-up"}>
              ثبت نام
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
