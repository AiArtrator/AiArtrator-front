import React from 'react';
import Carous from '../../components/Carousel/Index';
// import Infer from '../../components/test/Test.jsx';
import './main-page.scss';
import Logo from '../../assets/main.jpeg';

const Index = () => {
	return (
		<div className="main-format">
			<div>
				<Carous />

				<div className="introduce">
					<h3>인공지능이 생성한 이미지를 무료로 확인해보세요 ! </h3>

					{/* <Infer /> */}

					<div className="inrow">
						<button>얼굴 이미지 생성</button>
						<button>추상화 이미지 생성</button>
					</div>
					<img src={Logo} alt="logo" />
				</div>
			</div>
		</div>
	);
};

export default Index;
