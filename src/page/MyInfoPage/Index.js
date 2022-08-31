import React, { useState, useEffect } from 'react';
import './my-info-page.scss';
import { getMypage } from '../../axios/User';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import Logo from '../../assets/logo/LogoBox1.png';

const Index = () => {
	const userId = useSelector((state) => state.user.user.id);
	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setLoading(true);
			setInfo(null);
			try {
				const response = await getMypage(userId);
				setInfo(response.data.data);
				console.log(response.data.data);
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);
	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <div>에러가 발생했습니다.</div>;
	}
	if (!info) {
		console.log('아직 내 정보data가 설정되지 않았습니다. ');
		return null;
	}
	return (
		<div className="mypage-form">
			<div className="myform">
				<div className="inrow">
					<img src={Logo} />
				</div>
				<label>{info.nickname} 님의 개인정보</label>
				<label>이메일</label>
				<div className="info"> {info.email}</div>
				<label>닉네임</label>
				<div className="info">{info.nickname}</div>
				<label>전화번호</label>
				<div className="info">{info.phone}</div>
				<label>소속기관</label>
				<div className="info">
					{info.organization ? (
						<>{info.organization}</>
					) : (
						<>입력된 정보가 없습니다.</>
					)}
				</div>
				<Link to="/Revise">
					{' '}
					<button className="revise-button">정보수정</button>
				</Link>
			</div>
		</div>
	);
};

export default Index;
