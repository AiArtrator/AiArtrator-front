import React from 'react';
import './footer.scss';
import { useNavigate } from 'react-router-dom';

const Index = () => {
	const navigate = useNavigate();
	const toIntroduction = () => {
		navigate('/Introduction');
	};

	return (
		<div className="foot">
			<div className="intro-button" onClick={toIntroduction}>
				<br />
				About Ai Artrator
			</div>
			<br />
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
