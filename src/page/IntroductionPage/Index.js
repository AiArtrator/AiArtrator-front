import React from 'react';
import './intro.scss';
import Logo from '../../assets/logo/MainLogoV1.png';
import SqLogo from '../../assets/logo/LogoBox1.png';
const Index = () => {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div className="intro-form">
				<img src={Logo} alt="logo" />
				<h3>About Ai Artrator</h3>
				<p>
					Ai Artrator는 인공지능(Machine Learning) 웹서비스 입니다. <br />
					서버를 통해 인공지능 모델을 이용하기 때문에, 유저는 저성능 기기를
					사용하더라도 한번의 클릭으로 머신러닝 모델이 창조한 이미지를 1초만에
					받아보실 수 있습니다. 또한 모델 이용 시 필요한 weight를 업로드하고
					판매하여 수익을 창출할 수 있습니다.
				</p>
				<br />
				<h3>About fastGan</h3>
				<p>Ai Artrator 소개페이지</p>
				<h3>About Developers</h3>
				<p>Ai Artrator 소개페이지</p>
				<img src={SqLogo} alt="logo" />
			</div>
		</div>
	);
};

export default Index;
