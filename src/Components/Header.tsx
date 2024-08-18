import { Link } from 'react-router-dom'
import iconCart from '../assets/images/iconCart.png'
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleStatusTab } from '../store/cart';


const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store: RootState) => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    carts.forEach(item => total += item.quantity);
    setTotalQuantity(total);
  }, [carts])


  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  }
  return (
    <header className='flex justify-between items-center mb-5'>
      <Link to="/" className='text-xl font-semibold'>Home.</Link>
      <div className='w-10 h-10 bg-cardsBg rounded-full
        flex justify-center items-center relative cursor-pointer' onClick={handleOpenTabCart}>
        <img src={iconCart} alt="" className='w-6' />
        <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
            w-5 h-5 rounded-full flex justify-center items-center'>{totalQuantity}</span>
      </div>
    </header>
  )
}

export default Header