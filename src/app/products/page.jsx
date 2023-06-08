import { supabase } from '@/lib/supabase';
import ProductCard from './components/ProductCard';

export const revalidate = 60;
const Products = async () => {
  const { data: products, error } = await supabase.from('product').select('*');

  return (
    <div className='bg-white grid gap-6'>
      <div className='py-20 border-b-2 border-black bg-blue-400'>
        <div className='container mx-auto'>
          <h1 className='text-center text-4xl sm:text-6xl xl:text-7xl tracking-tight xl:leading-[0.9]'>
            The latest products
          </h1>
        </div>
      </div>
      <div className='py-20'>
        <div className='max-w-[1140px] mx-auto p-4'>
          <ul className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
