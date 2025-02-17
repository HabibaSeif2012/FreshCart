import React, { useContext } from 'react'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import logo from './../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'


export default function Navbar() {
  let{setitemsNum,itemsNum}=useContext(CartContext)
  let {userLogin,setuserLogin}=useContext(UserContext);
  let{setwishItems,wishItems}=useContext(WishlistContext);
  let navigate=useNavigate()


  function signOut(){
   localStorage.removeItem('userToken');
   localStorage.removeItem('userEmail');
   localStorage.removeItem('wishList');
   setuserLogin(null);
   navigate("/login")
  }
  return( <>
  

<nav className="bg-blue-300 relative w-full">
    <div className="flex flex-wrap justify-center gap-2 lg:justify-between lg:gap-y-0 items-center mx-auto p-4 w-full ">
        <div className='flex gap-2.5' >
        <Link to="" className="flex items-center">
            <img src={logo} className="h-6" alt="Freshcart Logo" />
            
        </Link>

        <ul className='flex gap-3.5 text-blue-900'>
         {userLogin!=null?<> <li>
            <NavLink to="" className=''>Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className='relative'>Cart 
            <div className='absolute top-[-10px] righ-[-10px] size-5 bg-blue-950 rounded-full text-white flex items-center justify-center'>{itemsNum}</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Catergories</NavLink>
          </li>
          <li>
            <NavLink to="/brands">Brands</NavLink>
          </li></>:null}
        </ul>

        </div>





        <div className="flex items-center space-x-6 rtl:space-x-reverse ">
        {userLogin!=null?<NavLink to='/wishlist' className='relative'> <i class="fa-solid fa-heart text-2xl text-blue-900"></i> <div className='absolute top-[-10px] left-[-15px] size-5 bg-blue-950 rounded-full text-white flex items-center justify-center'>{wishItems}</div></NavLink>:null}
           <div className='flex gap-2.5'>
            <Link to='https://www.facebook.com/habiba.seif.5' target='_blank'>
            <i class="fa-brands fa-facebook"></i>
            </Link>
            <Link to='https://www.instagram.com/habibah.3x/'  target='_blank'>
            <i class="fa-brands fa-instagram"></i>
            </Link>
            <Link to='https://www.linkedin.com/in/habiba-seif-752437240/'  target='_blank'>
            <i class="fa-brands fa-linkedin"></i>
            </Link>
            
           </div>
           {userLogin!=null?<button onClick={signOut} className="text-sm cursor-pointer text-blue-900 hover:underline ">Signout</button>:<>
            <Link to="/login" className="text-sm cursor-pointer text-blue-900 hover:underline">Login</Link>
            <Link to="/register" className="text-sm cursor-pointer text-blue-900 hover:underline">Register</Link></>}
           
            
        </div>
    </div>
</nav>


  </>
) 
  
}
