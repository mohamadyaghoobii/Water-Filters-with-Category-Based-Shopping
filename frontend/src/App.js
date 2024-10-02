// App.js
import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ContextProvider } from './context';

function App() {
  return (
    <Provider store={store}>
      <ContextProvider>
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </ContextProvider>
    </Provider>
  );
}

export default App;
