import { Outlet } from 'react-router-dom' 
import CartTab from './CartTab';
import Header from './Header';

const Layout = () => {
  return (
    <div className='bg-pinko'>
        <main className={`w-[1200px] max-w-full m-auto p-5 transform transition-transform duration-500`}>
            <Header />
            <Outlet />
        </main>
        <CartTab />
    </div>
  )
}

export default Layout