

import React from 'react';
import { Outlet } from 'react-router';
import CheckInternet from '../components/CheckInternet';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import DataContext from '../context/DataContext';
import '../styles/main.scss';

function Root() {
  return (
    <>
        <DataContext>
            <Header/>
            <CheckInternet>
              <HeroSection/>
              <Outlet/>
            </CheckInternet>
        </DataContext>
    </>
  )
}

export default Root
