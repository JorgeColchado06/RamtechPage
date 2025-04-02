"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`text-base font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${
          isActive
            ? 'text-[#E6F0F8] border-b-2 border-[#00ffff] rounded-t-md'
            : 'text-[#fff] hover:text-[#00ffff]'
        }`}
      >
        {children}
      </div>
    </Link>
  );
}