import React from 'react';
import './footer.scss';
import { useNavigate } from 'react-router-dom';
const Index = () => {
	const navigate = useNavigate();
	const toIntroduction = () => {
		navigate('/Introduction');
	};
	if (
		window.location.pathname === '/Signup' ||
		window.location.pathname === '/NetworkLists' ||
		window.location.pathname === '/MyNetworks' ||
		window.location.pathname === '/MySubscribe'
	)
		return null;
	return (
		<div className="foot">
			<div className="intro-button" onClick={toIntroduction}>
				About Artrator·서비스 소개
			</div>
			<br />
			<p>Ai Artrator Developers 류시모 · 손도희 · 설지원 · 윤준혁</p>
			<p>
				Ai Artrator Developers Simo Ryu, Dohui Son, Jiwon Seol, Junhyeog Yun
			</p>

			<h3>
				ⓒ Copyright 2022 Ai Artrator, Republic of Korea. All rights reserved.
			</h3>
		</div>
	);
};

export default Index;
