import React from 'react';
import MainNav from './src/navigation/mainNav';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <>
      <MainNav />
      <Toast/>
    </> 
  );
}