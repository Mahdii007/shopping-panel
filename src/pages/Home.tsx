import { Key } from 'react';
import ProductCart from '../Components/ProductCart';
import { ProductProps } from '../const/types';
import { useQuery } from 'react-query';
import Eror from '../Components/Eror';
import Loading from '../Components/Loading';
import { fetchProducts } from '../api/products';



const Home = () => {
  const { data: all_product, status } = useQuery("Products", fetchProducts);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <Eror />;

  return (
    <div>
      <h1 className='text-3xl my-5'>List Products</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
        {all_product?.map((product: ProductProps, key: Key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
