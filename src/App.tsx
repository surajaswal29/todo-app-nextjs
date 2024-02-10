import React from 'react';

import './App.css';
import Connect from './components/Wallet/Connect';
import Slider from './components/Slider';
import ReviewSlider from './components/ReviewSlider';


const App = () => {
	
	

	return (
		<>
		{/* <Home/> */}
		<Slider/>
		<ReviewSlider/>
		<div className='p-6 m-8  text-center' >

		<Connect/>
		</div>
		</>
		
	);
};

export default App;
