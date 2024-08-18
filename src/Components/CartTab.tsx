import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import CartItem from './CartItem';
import { toggleStatusTab } from '../store/cart';

const CartTab = () => {

    const carts = useSelector((store: RootState) => store.cart.items);
    const statusTab = useSelector((store: RootState) => store.cart.statusTab);
    const dispatch = useDispatch();

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }
    return (
        <div className={`fixed top-0 right-0 bg-pinko shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
            transform transition-transform duration-500
            ${statusTab === false ? "translate-x-full" : ""}
            `}>
            <h2 className='p-5 text-violet-800 text-2xl font-bold'>Shopping Cart</h2>
            <div className='p-5'>
                {carts.map((item, key) =>
                    <CartItem key={key} data={item} />
                )}
            </div>
            <div className='grid grid-cols-2'>
                <button className='bg-amber-600 text-white' onClick={handleCloseTabCart}>CLOSE</button>
                <button className=' bg-indigo-700 text-white'>CHECKOUT</button>
            </div>
        </div>
    );
}

export default CartTab;
