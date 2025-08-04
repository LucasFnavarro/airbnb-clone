'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <div>
      <Image
        onClick={() => router.push('/')}
        alt="logo airbnb"
        className="hidden md:block cursor-pointer"
        height={100}
        width={100}
        src="/logo.png"
      />
    </div>
  );
};

export default Logo;
