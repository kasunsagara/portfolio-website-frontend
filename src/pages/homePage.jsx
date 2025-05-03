import { Route, Routes } from 'react-router-dom';
import Header from '../components/header';

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className='w-full h-[calc(100vh-100px)] '>
        <Routes path="/*">



        </Routes>  
      </div>

    </div>
  ); 
}