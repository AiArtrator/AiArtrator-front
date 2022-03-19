import React, { useState, useEffect } from 'react';
import './my-info-revise-page.scss';
import {
	getMypage,
	phoneDupl,
	nicknameDupl,
	putReviseInfo,
} from '../../axios/User';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Index = () => {
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
		nickname: '',
		phone: '',
		organization: '',
	});

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
		} else {
			phoneDuplCheck();
		}
	};

	const reviseSubmit = async () => {
		await putReviseInfo(accesstoken, reviseInfo)
			.then((res) => {
				console.log(
					`[+] revise myinfo - res data: ${JSON.stringify(res.data)}`
				);
				alert('개인 정보 수정 완료');
				Navigate('/MyInfo');
			})
			.catch((err) => {
				console.error(err);
				alert('에러');
			});
	};

	const isRevised = () => {
		if (
			reviseInfo.nickname === '' &&
			reviseInfo.phone === '' &&
			reviseInfo.organization === ''
		) {
			alert('수정된 정보가 없습니다.');
		} else {
			// if (reviseInfo.nickname === '') {
			// 	setReviseInfo({ nickname: info.nickname });
			// } else if (reviseInfo.phone === '') {
			// 	setReviseInfo({ phone: info.phone });
			// }
			reviseSubmit();
		}
	};

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
			// if (reviseInfo.nickname === '') {
			// 	setReviseInfo(info.nickname);
			// }
		} else if (className === 'organization') {
			setReviseInfo({ ...reviseInfo, organization: value });
			// if (reviseInfo.nickname === '') {
			// 	setReviseInfo({ nickname: info.nickname });
			// }
			// if (reviseInfo.phone === '') {
			// 	setReviseInfo({ phone: info.phone });
			// }
		} else {
			console.error('[-] error from Revise');
		}
	};
	return (
		<div className="myrevise-form">
			<div className="reviseform">
				<h3>P O G</h3>
				<label>{info.nickname} 님의 정보수정</label>
				<label>닉네임</label>
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
				<label>전화번호</label>
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

				<label>소속기관 (선택)</label>
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
