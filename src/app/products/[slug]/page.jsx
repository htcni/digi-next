import { supabase } from '@/lib/supabase';
import Product from '../components/Product';
export const revalidate = 60;

export async function generateStaticParams() {
  let { data: products, error } = await supabase.from('product').select('slug');

  return products?.map((product) => ({
    slug: product.slug,
  }));
}

async function getProducts(slug) {
  return supabase.from('product').select('*').eq('slug', slug).single();
}

const ProductPage = async ({ params: { slug } }) => {
  const { data: product, error } = await getProducts(slug);

  return (
    <>
      {product ? (
        <Product product={product} />
      ) : (
        <div className='text-center'>Product not found</div>
      )}
    </>
  );
};

export default ProductPage;
