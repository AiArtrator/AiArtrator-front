import React, { useEffect } from 'react';
import NetworkLists from '../../components/NetworkList/Index.js';
// import InfiniteScroll from '../../components/NetworkList/InfiniteScroll.js';
import Carousel from '../../components/NetworkListCarousel/Index.js';
import TopBtn from '../../components/TopBtn/index';
const Index = () => {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		scrollTop();
	}, []);

	return (
		<>
			<Carousel />
			<NetworkLists />
			<TopBtn />
		</>
	);
};

export default Index;
