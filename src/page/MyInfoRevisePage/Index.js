import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './my-info-revise-page.scss';
import {
	getMypage,
	phoneDupl,
	nicknameDupl,
	putReviseInfo,
} from '../../axios/User';

import Loading from '../../components/Loading/Loading';
import Logo from '../../assets/logo/LogoBox1.png';

const Index = () => {
	const navigate = useNavigate();
	const userId = useSelector((state) => state.user.user.id);
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [reviseInfo, setReviseInfo] = useState({
		nickname: '',
		phone: '',
		organization: '',
	});
	const [errorInfo, setErrorInfo] = useState({
		nickname: '\u00a0',
		phone: '\u00a0',
		organization: '\u00a0',
	});
	var tosubmit = { nickname: '', phone: '', organization: '' };

	const nicknameDuplCheck = async () => {
		await nicknameDupl(reviseInfo)
			.then((res) => {
				setErrorInfo({ ...errorInfo, nickname: res.data.message });
			})
			.catch((err) => {
				console.error(err);
				console.log(JSON.stringify(err)); // 수정 필요
				setErrorInfo({ nickname: '이미 사용하고 있는 닉네임입니다.' });
			});
	};
	const nicknameDuplbutton = () => {
		if (reviseInfo.nickname === '') {
			setErrorInfo({ ...errorInfo, nickname: '닉네임을 입력해주세요.' });
		} else if (reviseInfo.nickname === info.nickname) {
			setErrorInfo({ ...errorInfo, nickname: '\u00a0' });
		} else {
			nicknameDuplCheck();
		}
		console.log(reviseInfo.nickname);
	};

	const phoneDuplCheck = async () => {
		await phoneDupl(reviseInfo)
			.then((res) => {
				setErrorInfo({ ...errorInfo, phone: res.data.message });
			})
			.catch((err) => {
				console.error(err);
				setErrorInfo({ phone: '이미 사용하고 있는 전화번호입니다' });
			});
	};

	const phoneDuplbutton = () => {
		if (reviseInfo.phone === '') {
			setErrorInfo({ ...errorInfo, phone: '전화번호를 입력해주세요' });
		} else if (reviseInfo.phone === info.phone) {
			setErrorInfo({ ...errorInfo, phone: '\u00a0' });
		} else {
			phoneDuplCheck();
		}
	};

	const reviseSubmit = async () => {
		console.log('async중');
		console.log(reviseInfo);
		await putReviseInfo(accesstoken, tosubmit)
			.then((res) => {
				console.log(
					`[+] revise myinfo - res data: ${JSON.stringify(res.data)}`
				);
				alert('개인정보 수정 완료');
				navigate('/MyInfo');
			})
			.catch((err) => {
				console.error(err);
				alert(err.response.data.message);
			});
	};

	const isRevised = () => {
		tosubmit = reviseInfo;
		if (tosubmit.nickname === '') {
			tosubmit.nickname = info.nickname;
		} else if (tosubmit.phone === '') {
			tosubmit.phone = info.phone;
		}
		if (
			tosubmit.nickname === info.nickname &&
			tosubmit.phone === info.phone &&
			tosubmit.organization === info.organization
		) {
			alert('수정된 정보가 없습니다.');
		} else if (
			reviseInfo.nickname === '' &&
			reviseInfo.phone === '' &&
			reviseInfo.organization === ''
		) {
			alert('수정된 정보가 없습니다.');
		} else {
			reviseSubmit();
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setLoading(true);
			setInfo(null);
			setReviseInfo(null);
			try {
				const response = await getMypage(userId);
				setInfo(response.data.data);
				setReviseInfo(response.data.data);
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
		return <Loading />;
	}

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'nickname') {
			setReviseInfo({ ...reviseInfo, nickname: value });
		} else if (className === 'phone') {
			setReviseInfo({ ...reviseInfo, phone: value });
		} else if (className === 'organization') {
			setReviseInfo({ ...reviseInfo, organization: value });
		} else {
			console.error('[-] error from Revise');
		}
	};
	return (
		<div className="myrevise-form">
			<div className="reviseform">
				<div className="inrow">
					<img src={Logo} alt="logo" />
				</div>
				<label>{info.nickname} 님의 개인정보 수정</label>
				<span>닉네임</span>
				<span style={{ color: 'red' }}> *</span>
				<div className="info">{info.nickname}</div>
				<div className="revise-part">
					<input
						className="nickname"
						type="nickname"
						placeholder="수정을 원하시면 정보를 입력해주세요."
						value={reviseInfo.nickname}
						onChange={handleChange}
					/>
					<button className="dupl-button" onClick={nicknameDuplbutton}>
						중복확인
					</button>
				</div>
				<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
					{errorInfo.nickname}
				</div>
				<span>전화번호</span>
				<span style={{ color: 'red' }}> *</span>
				<div className="info">{info.phone}</div>
				<div className="revise-part">
					<input
						className="phone"
						type="phone"
						placeholder="수정을 원하시면 정보를 입력해주세요."
						value={reviseInfo.phone}
						onChange={handleChange}
					/>
					<button className="dupl-button" onClick={phoneDuplbutton}>
						중복확인
					</button>
				</div>
				<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
					{errorInfo.phone}
				</div>

				<span>소속기관 (선택)</span>
				<div className="info">
					{info.organization ? (
						<div>{info.organization}</div>
					) : (
						<div>입력된 정보가 없습니다.</div>
					)}
				</div>
				<div className="revise-part">
					<input
						className="organization"
						type="organization"
						placeholder="수정을 원하시면 정보를 입력해주세요."
						value={reviseInfo.organization}
						onChange={handleChange}
					/>
				</div>
				<button className="submit-button" onClick={isRevised}>
					정보수정
				</button>
			</div>
		</div>
	);
};

export default Index;
