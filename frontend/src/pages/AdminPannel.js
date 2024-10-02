import React, { useEffect ,useContext} from 'react'

import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import Logo from '../components/Logo';
  import { Context } from '../context';


const AdminPanel = () => {
 

  const {  user } = useContext(Context);
    const navigate = useNavigate()
    
 const condition=(user?.role=== ROLE.ADMIN)

 


  return (
    <>
    
    {
        condition &&

        <div dir='rtl' className='min-h-[calc(100vh-120px)] md:flex hidden  border-t-blue-800 border-t-8'>

        <aside className='bg-blue-300 min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        <div className=' w-[50px] h-[50px]'> <Logo w={30} h={10}/></div>
                   
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-blue-500'>کاربرها</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-blue-500'>محصولات</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
    }

       
    
 
    </>
  )
}

export default AdminPanel