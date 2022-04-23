import React from 'react';
// import NetworkLists from '../../components/NetworkList/Index.js';
import InfiniteScroll from '../../components/NetworkList/InfiniteScroll.js';
import Carousel from '../../components/NetworkListCarousel/Index.js';
const Index = () => {
	return (
		<>
			<Carousel />
			<InfiniteScroll />
			{/* <NetworkLists /> */}
		</>
	);
};

export default Index;
