import React from 'react';
import Carous from '../../components/Carousel/Index';
import Infer from '../../components/test/Test.jsx';

const Index = () => {
	return (
		<>
			<div>
				<Carous />
				<h2>무료 ML모델을 통해 새로운 이미지를 생성해보세요 ! </h2>
				<Infer />
			</div>
		</>
	);
};

export default Index;
