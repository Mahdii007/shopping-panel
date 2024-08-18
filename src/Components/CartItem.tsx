import { useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart";
import { List_Of_Image } from "../product";
import { fetchProduct } from "../api/ProductsDetailsApi";
import { useQuery } from "react-query";

interface CartItemProps {
  data: {
    productId: number;
    quantity: number;
  };
}

const CartItem = ({ data }: CartItemProps) => {
  const { productId, quantity } = data;
  const dispatch = useDispatch();

  // Fetch product details using productId
  const { data: product, isLoading, isError } = useQuery(['product', productId], () => fetchProduct(productId.toString()), {
    enabled: !!productId, // Only run the query if productId is valid
  });

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({
        productId,
        quantity: quantity - 1
      }));
    }
  };

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
      <h3>{product.name}</h3>
      <div className='w-20 flex justify-between gap-2'>
        <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
        <span>{quantity}</span>
        <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
      </div>
      <p>${product.price * quantity}</p>
    </div>
  );
}

export default CartItem;
