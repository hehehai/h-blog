import Footer from '@/components/shared/layout/footer';
import Header from '@/components/shared/layout/header';
import NavBar from '@/components/shared/layout/nav-bar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <Header />
      <NavBar />
      <div className="my-4">{children}</div>
      <Footer />
    </div>
  );
}
