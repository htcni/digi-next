import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  let { data: products, error } = await supabase.from('product').select('slug');

  return products?.map((product) => ({
    slug: product.slug,
  }));
}

const ProductPage = async ({ params: { slug } }) => {
  const { data: product, error } = await supabase
    .from('product')
    .select('*')
    .eq('slug', slug)
    .single();

  return (
    <section>
      <div className='max-w-[1140px] mx-auto p-4 lg:p-8'>
        <div className='border-black border-2'>
          <div>
            <Image
              src={`/assets/${product.slug}.png`}
              width={1200}
              height={400}
              alt={product.name}
            />
          </div>

          <div className='grid lg:grid-cols-[2fr_1fr] border-t-2 border-black'>
            <section className='border-r-2 border-black'>
              <header className='p-4 border-b-2 border-black'>
                <h1 className='text-5xl'>{product.name}</h1>
              </header>
              <div className='p-4'>
                <p>{product.description}</p>
              </div>
            </section>
            <section>
              <div className='p-6 flex flex-col gap-2'>
                <p> Subscribe to get access. </p>
                <Link
                  href='/pricing'
                  className='inline-flex justify-center border-2 border-black px-6 py-3 rounded hover:bg-fuchsia-400 transition-colors'>
                  Get Access
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
