import React from 'react';
import { useSelector } from 'react-redux';

const Index = () => {
	const usernickname = useSelector((state) => state.user?.user?.nickname);
	// const [nowBalance, setNowBalance] = useState(null);
	console.log('내 토큰 내역 및 충전 페이지');
	return (
		<div className="my-balance-form">
			<br />
			<h1>나의 토큰 내역 페이지 입니다</h1>
			{usernickname} 님의 현재 보유 토큰
			{/* {nowBalance} Token */}
			<div>충전하기</div>
			<div>*1토큰은 10원입니다.</div>
			<div className="my-history">
				<h4>토큰 내역 조회</h4>
			</div>
		</div>
	);
};

export default Index;
