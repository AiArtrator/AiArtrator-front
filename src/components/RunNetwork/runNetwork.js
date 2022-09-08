import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNetworkDetail } from '../../reducers/network';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import DEFAULT_THUMBNAIL from '../../assets/thumb.jpeg';
import { postInference } from '../../axios/Network';

const runNetwork = ({ isPopup, postId, setIspopup }) => {
	const dispatch = useDispatch();
	const networkDetail = useSelector((state) => state.network.detail);
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const { t } = useTranslation();

	const navigate = useNavigate();
	const [detailInfo, setDetailInfo] = useState({
		title: '로딩 중',
		thumbnail: DEFAULT_THUMBNAIL,

		updatedAt: '로딩 중',
		ver: '로딩 중',
		summary: '로딩 중입니다.',
		tagList: [],
		desc: '로딩 중',
		isSubscribed: false,
		fee: 0,
		weightUuid: '',
	});
	const [numImg, setNumImg] = useState('');
	// const [isPopup, setIsPopup] = useState(isPop);

	useEffect(() => {
		const checkNetworkDetail = async () => {
			const res = await dispatch(fetchNetworkDetail(postId, accesstoken));
			if (!res.success) {
				alert('ERROR');
				navigate(-1);
			}
		};
		checkNetworkDetail();
	}, []);

	useEffect(() => {
		if (networkDetail) {
			setDetailInfo({
				title: networkDetail.title,
				thumbnail: networkDetail.thumbnail,

				updatedAt: networkDetail.updatedAt,
				ver: networkDetail.ver,
				summary: networkDetail.summary,
				tagList: networkDetail.tagList,
				desc: networkDetail.description,
				isSubscribed: networkDetail.isSubscribed,
				fee: networkDetail.fee,
				weightUuid: networkDetail.weightUuid,
			});
		}
	}, [networkDetail]);

	const handleNumImg = (e) => {
		if (e.target.value === '') {
			setNumImg('');
			return;
		}
		let val = parseInt(e.target.value, 10);
		const minVal = parseInt(e.target.min, 10);
		const maxVal = parseInt(e.target.max, 10);
		if (val < minVal) {
			val = '';
		}
		if (val > maxVal) {
			val = numImg;
		}
		setNumImg(val);
	};

	const inference = async () => {
		try {
			const res = await postInference(
				accesstoken,
				detailInfo.weightUuid,
				numImg || 0,
				-detailInfo.fee
			);
			alert(res.data.message);
			navigate(`/Library/${postId}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<NetworkDetail>
			{isPopup && (
				<PopupContainer>
					<div className="popupTitle"> {t('run_title')} </div>
					<div className="popupNetworkTitle">{detailInfo.title}</div>
					<div className="subtitle">{t('run_fee')}</div>
					<div className="fee">{detailInfo.fee} Token</div>
					<div className="subtitle">{t('run_cnt')}</div>
					<input
						className="numImg"
						type="number"
						value={numImg}
						onChange={handleNumImg}
						min="0"
						max="99999" // TODO: fix max value
					/>
					<div className="numImgAfter">{t('images')}</div>
					<div className="notice">{t('run_notice1')}</div>
					<div className="totalFee">
						{t('total_fee')} {detailInfo.fee * (numImg || 0)} Token
					</div>
					<div className="popupDesc">
						{t('detail_notice2')}
						<br />
						{t('run_notice2')}
						<br />
						{t('model_notice1')}
					</div>
					<div className="payButton" onClick={inference}>
						{t('pay')}
					</div>
					<div className="closeButton" onClick={() => setIspopup(false)}>
						{t('close')}
					</div>
				</PopupContainer>
			)}
		</NetworkDetail>
	);
};
runNetwork.propTypes = {
	postId: PropTypes.number,
	isPopup: PropTypes.bool,
	setIspopup: PropTypes.func,
};

export default runNetwork;

const NetworkDetail = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: min-content 300px min-content min-content;
	gap: 30px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 5%;
	.networkTitle {
		grid-column: 1 / 3;
		grid-row: 1/1;
		justify-self: left;
		font-size: 24px;
		font-weight: 600;
		overflow-wrap: break-word;
		margin-top: 30px;
	}
	.updatedAt {
		grid-column: 1 / 3;
		grid-row: 1/1;
		justify-self: right;
		align-self: center;
		margin-top: 30px;
		overflow: auto;
	}
	img {
		width: 100%;
		height: 100%;
		text-align: center;
		object-fit: contain;
		align-self: center;
		min-width: 300px;
	}
	.desc {
		grid-column: 1 / 3;
		resize: none;
		padding: 7px;
		margin: 7px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-radius: 3px;
		font-weight: 400;
		outline: none;
		height: max-content;
		min-height: 100px;
		overflow-wrap: break-word;
	}
`;

const PopupContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	width: 400px;
	padding: 30px;
	transform: translate(-50%, -50%);
	display: grid;
	grid-template-columns: 150px 50px 100px 10px auto;
	gap: 15px 0px;
	align-items: center;
	background: #ffffff;
	box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	.popupTitle {
		grid-column: 1 / 6;
		font-size: 18px;
		color: #0d005c;
		border-bottom: 2px solid #e2e2e2;
		text-align: center;
		padding-bottom: 15px;
	}
	.popupNetworkTitle {
		grid-column: 1 / 6;
		font-size: 22px;
	}
	.subtitle {
		grid-column: 1 / 2;
		font-size: 16px;
		color: #0d005c;
	}
	.fee {
		grid-column: 3 / 4;
		color: #2e2e2e;
	}
	.numImg {
		grid-column: 3 / 4;
		outline: none;
		border: 1px solid #000080;
		border-radius: 3px;
		text-align: center;
		height: 25px;
		font-size: 16px;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	.numImgAfter {
		grid-column: 5 / 6;
		font-size: 16px;
		color: #0d005c;
	}
	.notice {
		grid-column: 1 / 6;
		font-size: 14px;
		color: #ff0000;
		margin-bottom: 20px;
	}
	.totalFee {
		grid-column: 1 / 6;
		font-size: 18px;
		font-weight: 600;
		text-align: center;
		color: #000080;
		padding-bottom: 15px;
		border-bottom: 2px solid #e2e2e2;
	}
	.popupDesc {
		grid-column: 1 / 6;
		font-size: 14px;
		color: rgba(46, 46, 46, 0.6);
		line-height: 140%;
		margin-bottom: 20px;
	}
	.payButton {
		grid-column: 1 / 3;
		font-size: 16px;
		text-align: center;
		color: #000080;
		background: #e4eafb;
		border-radius: 5px;
		padding: 7px;
		width: 120px;
		justify-self: center;
	}
	.payButton:hover {
		font-weight: 500;
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
	}
	.closeButton {
		grid-column: 3 / 6;
		font-size: 16px;
		text-align: center;
		color: #000080;
		background: #e4eafb;
		border-radius: 5px;
		padding: 7px;
		width: 120px;
		justify-self: center;
	}
	.closeButton:hover {
		font-weight: 500;
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
	}
`;
