import React, { useState, useEffect } from 'react';
import './my-info-revise-page.scss';
import { getMypage } from '../../axios/User';
import { useSelector } from 'react-redux';

const Index = () => {
	const userId = useSelector((state) => state.user.user.id);
	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [reviseInfo, setReviseInfo] = useState({
		email: '',
		phone: '',
		organization: '',
	});
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
		return <div>로딩중</div>;
	}
	if (error) {
		return <div>에러가 발생했습니다.</div>;
	}
	if (!info) {
		console.log('아직 내 정보data가 설정되지 않았습니다. ');
		return null;
	}

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'nickname') {
			setReviseInfo({ ...reviseInfo, nickname: value });
		} else if (className === 'phone') {
			setReviseInfo({ ...reviseInfo, phone: value });
			if (reviseInfo.nickname === '') {
				setReviseInfo(info.nickname);
			}
		} else if (className === 'organization') {
			setReviseInfo({ ...reviseInfo, organization: value });
			if (reviseInfo.nickname === '') {
				setReviseInfo({ nickname: info.nickname });
			}
			if (reviseInfo.phone === '') {
				setReviseInfo({ phone: info.phone });
			}
		} else {
			console.err('[-] error from Revise');
		}
	};
	return (
		<div className="myrevise-form">
			<div className="reviseform">
				<h3>P O G</h3>
				<label>{info.nickname} 님의 정보수정</label>
				<label>닉네임</label>
				<div className="info">{info.nickname}</div>
				<button className="dupl-button">중복확인</button>
				<input
					className="nickname"
					type="nickname"
					placeholder="수정을 원하시면 정보를 입력해주세요."
					value={reviseInfo.nickname}
					onChange={handleChange}
				/>
				<label>전화번호</label>
				<div className="info">{info.phone}</div>
				<input
					className="email"
					type="email"
					placeholder="수정을 원하시면 정보를 입력해주세요."
					value={reviseInfo.phone}
					onChange={handleChange}
				/>

				<label>소속기관 (선택)</label>
				<div className="info">
					{info.organization ? (
						<div>{info.organization}</div>
					) : (
						<div>입력된 정보가 없습니다.</div>
					)}
				</div>
				<input
					className="organization"
					type="organization"
					placeholder="수정을 원하시면 정보를 입력해주세요."
					value={reviseInfo.organization}
					onChange={handleChange}
				/>
				<button className="submit-button">정보수정</button>
			</div>
		</div>
	);
};

export default Index;
