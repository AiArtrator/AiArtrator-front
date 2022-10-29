import React from 'react';

import './free-trial.scss';
import Logo from '../../assets/main.jpeg';

const Index = () => {
	return (
		<div>
			<div className="introduce">
				<h3>인공지능이 생성한 이미지를 무료로 확인해보세요 ! </h3>
				<div className="inrow">
					<button className="try-button">얼굴 이미지 생성</button>
					<button className="try-button">추상화 이미지 생성</button>
				</div>
				<img src={Logo} alt="logo" />
			</div>
		</div>
	);
};

export default Index;
