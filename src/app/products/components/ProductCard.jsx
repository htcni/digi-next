import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className=' flex flex-col border-black border-[0.0625rem] rounded font-medium'>
      <Link href={`/products/${product.slug}`} className='relative pb-[50%]'>
        <Image
          src={`/assets/${product.slug}.png`}
          alt={product.name}
          fill
          className='object-cover'
        />
      </Link>
      <div className='p-4 border-black border-b-[0.0625rem]'>
        <p>{product.name}</p>
      </div>
      <div className='flex center items-center p-4 justify-between'>
        <div>
          <Link href={`/product/${product.slug}`}>See More → </Link>
        </div>

        <span className='py-2 px-3 uppercase text-sm bg-black text-white rounded-full'>
          {product.category}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
