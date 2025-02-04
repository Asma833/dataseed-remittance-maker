import Footer from '../Footer/Footer';
//import React, { ReactNode } from 'react';
import { Outlet } from 'react-router';
import Header from '../Header/Header';

// interface MainLayoutProps {
//   children: ReactNode;
// }

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 h-full bg-gray-50">
       
       <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
