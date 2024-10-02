// SignUp.js
import React, { useState } from 'react';
import Logo from '../components/Logo';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const response = await fetch(summaryApi.SignUp.url, {
        method: summaryApi.SignUp.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate('/login');
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error('گذرواژه با تکرار آن مطابقت ندارد');
    }
  };

  return (
    <section className='w-[90%] md:w-[500px] mx-auto' id='sign-up'>
      <div className='container mx-auto p-4'>
        <div className='bg-white p-2 w-full max-w-md mx-auto'>
          <div className='w-[60px] h-[40px] mb-3 mx-auto'>
            <Logo w={30} h={10} />
          </div>
          <form onSubmit={handleSubmit} className='mt-8' dir='rtl'>
            <label className='my-2 w-[80%] mx-auto block h-full'>نام:</label>
            <div>
              <input
                type='text'
                required
                onChange={handleOnChange}
                value={data.name}
                name='name'
                className='bg-gray-100 my-2 w-[80%] mx-auto block h-[48px] outline-none'
                placeholder='نام خود را وارد کنید'
              />
            </div>
            <label className='my-2 w-[80%] mx-auto block h-full'>ایمیل:</label>
            <div>
              <input
                type='email'
                required
                onChange={handleOnChange}
                value={data.email}
                name='email'
                className='bg-gray-100 my-2 w-[80%] mx-auto block h-[48px] outline-none'
                placeholder='ایمیل خود را وارد کنید'
              />
            </div>
            <label className='my-2 w-[80%] mx-auto block h-full'>پسورد:</label>
            <div className='bg-gray-100 w-[80%] mx-auto'>
              <div className='flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  onChange={handleOnChange}
                  value={data.password}
                  name='password'
                  className='bg-gray-100 my-2 w-[80%] mx-auto block h-[32px] outline-none'
                  placeholder='گذرواژه خود را وارد کنید'
                />
                <div onClick={() => setShowPassword(prev => !prev)}>
                  <span className='w-[80%] ml-4 block h-full mt-[20px]'>
                    {showPassword ? <FaEye className='cursor-pointer' /> : <FaEyeSlash className='cursor-pointer' />}
                  </span>
                </div>
              </div>
            </div>
            <label className='my-2 w-[80%] mx-auto block h-full'>تکرار پسورد:</label>
            <div className='bg-gray-100 w-[80%] mx-auto'>
              <div className='flex'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  onChange={handleOnChange}
                  value={data.confirmPassword}
                  name='confirmPassword'
                  className='bg-gray-100 my-2 w-[80%] mx-auto block h-[32px] outline-none'
                  placeholder='گذرواژه خود را مجددا وارد کنید'
                />
                <div onClick={() => setShowConfirmPassword(prev => !prev)}>
                  <span className='w-[80%] ml-4 block h-full mt-[20px]'>
                    {showConfirmPassword ? <FaEye className='cursor-pointer' /> : <FaEyeSlash className='cursor-pointer' />}
                  </span>
                </div>
              </div>
            </div>
            <button className='bg-blue-800 rounded-full w-[100px] py-2 mb-8 mt-[60px] mx-auto block text-white'>
              ثبت نام
            </button>
          </form>
          <p className='w-[50%] block mx-auto my-4'>
            قبلا ثبت نام کرده اید؟ <Link className='hover:text-blue-800 text-blue-500' to='/login'>ورود</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
