import Image from 'next/image';

export default function Logo() {
  return <Image src='/logo.svg' alt='logo' width={150} height={30} />;
}
