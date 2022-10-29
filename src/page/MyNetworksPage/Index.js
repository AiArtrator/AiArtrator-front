import React, { useEffect } from 'react';

import MyNetwork from '../../components/MyNetworkList/Index';
import SideNav from '../../components/SideBar/Index';
import TopBtn from '../../components/TopBtn/index';
const Index = () => {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	const pageCol = ['#000080', 'white', 'white'];

	// 업로드 페이지 최초 진입시 스크롤 최상위로 자동 이동
	useEffect(() => {
		scrollTop();
	}, []);

	return (
		<>
			<SideNav pageCol={pageCol} />
			<MyNetwork />
			<TopBtn />
		</>
	);
};

export default Index;
