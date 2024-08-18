import { useQuery } from 'react-query';
import Loading from '../Components/Loading';
import Eror from '../Components/Eror';
import { List_Of_Image } from '../product';
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../api/ProductsDetailsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart';
import { useState } from 'react';



const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { data: product, status } = useQuery(['product', id], () => fetchProduct(id as string), {
        enabled: !!id
    });
    if (status === 'loading') return <Loading />
    if (status === 'error') return <Eror />
    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    }
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId:id ,
            quantity: quantity
        }));
    }
    return (
        <div className=' h-screen'>
            <h2 className='text-3xl text-center'>PRODUCT DETAIL</h2>
            <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                    <img src={List_Of_Image[product.image as keyof typeof List_Of_Image]} alt={product.name} className='w-full' />
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl uppercase font-bold'>{product.name}</h1>
                    <p className='font-bold text-3xl'>
                        ${product.price}
                    </p>
                    <div className='flex gap-5'>
                        <div className='flex gap-2 justify-center items-center'>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
                            <span className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl'>
                            Add To Cart
                        </button>
                    </div>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;

