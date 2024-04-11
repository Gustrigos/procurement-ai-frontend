import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className='topbar bg-primary-500'>

        <Link href='/' className='flex items-center gap-4'>
          <Image src='/assets/logo.png' alt='logo' width={28} height={28} />
          <p className='text-heading3-bold text-light-2 max-xs:hidden'>Mentum AI</p>
        </Link>

    </nav>
  );
}

export default Topbar;