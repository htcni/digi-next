'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ReactPlayer from 'react-player';
import useSession from '@/app/core/hooks/useSession';

const Product = ({ product }) => {
  const supabaseClient = createClientComponentClient();
  const session = useSession();

  const [productContent, setProductContent] = useState(null);

  useEffect(() => {
    async function getProductContent(product) {
      let { data: product_content, error } = await supabaseClient
        .from('product_content')
        .select('*')
        .eq('id', product.product_content_id)
        .single();
      setProductContent(product_content);
    }

    getProductContent(product);
  }, [supabaseClient, productContent, product]);

  return (
    <section>
      <div className='max-w-[1140px] mx-auto p-4 lg:p-8'>
        <div className='border-black border-2'>
          <div className='h-[600px]'>
            {productContent?.video_url ? (
              <ReactPlayer
                controls
                url={productContent?.video_url}
                width={'100%'}
                height={'100%'}
              />
            ) : (
              <Image
                src={`/assets/${product.slug}.png`}
                width={1200}
                height={400}
                alt={product.name}
              />
            )}
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
                {productContent?.download_url && (
                  <a
                    href={`/assets/${productContent.download_url}`}
                    download
                    className='inline-flex justify-center border-2 border-black px-6 py-3 rounded hover:bg-fuchsia-400 transition-colors'>
                    <span>Download</span>
                  </a>
                )}
                {session ? (
                  <div className='space-y-4'>
                    <h2 className='text-2xl font-bold'>See all products </h2>
                    <p>Go back to see entire catalouge </p>
                    <Link
                      href='/products'
                      className='inline-flex justify-center border-2 border-black px-6 py-3 rounded hover:bg-fuchsia-400 transition-colors'>
                      Back to products
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p> Subscribe to get access. </p>
                    <Link
                      href='/pricing'
                      className='inline-flex justify-center border-2 border-black px-6 py-3 rounded hover:bg-fuchsia-400 transition-colors'>
                      Get Access
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
