"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      alt="logo"
      src="/images/logo.png"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
