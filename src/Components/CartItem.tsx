import { useDispatch } from "react-redux";
import { changeQuantity, deleteItem } from "../store/cart";
import { List_Of_Image } from "../product";
import { fetchProduct } from "../api/ProductsDetailsApi";
import { useQuery } from "react-query";

interface CartItemProps {
  data: {
    productId: string;
    quantity: number;
  };
}

const CartItem = ({ data }: CartItemProps) => {
  const { productId, quantity } = data;
  const dispatch = useDispatch();

  const { data: product, isLoading, isError } = useQuery(['product', productId], () => fetchProduct(productId.toString()), {
    enabled: !!productId, 
  });

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({
        productId,
        quantity: quantity - 1
      }));
    }
  };

  const handleDeleteItem = () => {
    dispatch(deleteItem({
      productId
    }));
  }
  const handlePlusQuantity = () => {
    dispatch(changeQuantity({
      productId,
      quantity: quantity + 1
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !product) {
    return <div>Error loading product.</div>;
  }

  return (
    <div className='flex justify-between items-center  bg-slate-600 text-white p-2 m-1 border-b-2 border-slate-700 gap-5 rounded-md'>
      <img src={List_Of_Image[product.image as keyof typeof List_Of_Image]} className="w-12" alt={product.name} />
      <span className="font-medium text-sm line-clamp-1">{product.name}</span>
      <div className='w-20 flex justify-between gap-2'>
        <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
        <span>{quantity}</span>
        <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
      </div>
      <div className="flex items-center">
        <p>${product.price * quantity}</p>
        <button
          type="button"
          onClick={handleDeleteItem}
          className="bg-white rounded-md p-2 m-1 inline-flex items-center justify-center text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default CartItem;
