import { Link } from "react-router-dom";
import { ProductProps } from "../const/types";
import { List_Of_Image } from "../product";
import { addToCart } from "../store/cart";
import { useDispatch } from 'react-redux';


const ProductCart = (props: { data: ProductProps }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: props.data.id,
            quantity: 1
        }));
    }
    return (
        <div className=" static  shadow-lg hover:shadow-blue-200 max-w-xs bg-cardsBg  rounded-lg  shadow-blue-50   hover:scale-105 hover:duration-300">
            <Link to={`/product/${props.data.id}`}>
                <div className="absolute bottom-100 right-100 ">
                </div>
                <img className="rounded-t-lg w-full  object-center h-44 p-2  hover:scale-110 hover:duration-300"
                    src={List_Of_Image[props.data.image as keyof typeof List_Of_Image]} alt="" />
            </Link>
            <div className="flex flex-col p-3">
                <div className="justify-start">
                    <p className="font-custom text-xl font-semibold md_max:text-xl capitalize line">{props.data.name}</p>
                    <p className="font-custom2 text-justify text-xs pt-1 line-clamp-4 ">
                        {props.data.description}</p>
                    <div className="flex items-strech my-1 font-custom2">
                        <span className="font-bold text-base ml-1">{props.data.price} $</span>
                    </div>
                </div>
                <div className="flex flex-col p-2">
                    <button className="font-custom text-white focus:ring-blue-500 focus:ring-2 bg-buybutton hover:shadow-lg rounded-full text-sm mx-3 my-2 py-2  hover:scale-110 hover:duration-300 ">Buy Now </button>
                    <button onClick={handleAddToCart} className="font-custom text-white focus:ring-blue-500 focus:ring-2  rounded-full  hover:shadow-lg  bg-addbuttom mx-3 text-sm  py-2  hover:scale-110 hover:duration-300 ">Add to Card</button>
                </div>
            </div>

        </div>
    )
}

export default ProductCart

