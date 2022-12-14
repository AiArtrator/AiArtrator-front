/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNetworkDetail, setNetworkDetail } from '../../reducers/network';
import { dateToText } from '../Utils';
import DEFAULT_THUMBNAIL from '../../assets/thumb.jpeg';
import { postNetworkSubscribe, postInference } from '../../axios/Network';
import Loading from '../Loading/Loading';
import { useTranslation } from 'react-i18next';

const Index = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const networkDetail = useSelector((state) => state.network.detail);
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const { postId } = useParams();
	const navigate = useNavigate();
	const [detailInfo, setDetailInfo] = useState({
		title: 'loading',
		thumbnail: DEFAULT_THUMBNAIL,
		writer: 'loading',
		updatedAt: 'loading',
		ver: 'loading',
		summary: 'loading',
		tagList: [],
		desc: 'loading',
		isSubscribed: false,
		fee: 0,
		weightUuid: '',
	});
	const forrequest = { postId: postId };
	const [numImg, setNumImg] = useState('');
	const [isPopup, setIsPopup] = useState(false);
	const [loading, setLoading] = useState(false);

	const fill = () => {
		setLoading(true);
		if (networkDetail) {
			setDetailInfo({
				title: networkDetail?.title,
				thumbnail: networkDetail?.thumbnail,
				writer: networkDetail?.writer?.nickname,
				updatedAt: networkDetail?.updatedAt,
				ver: networkDetail?.ver,
				summary: networkDetail?.summary,
				tagList: networkDetail?.tagList,
				desc: networkDetail?.description,
				isSubscribed: networkDetail?.isSubscribed,
				fee: networkDetail?.fee,
				weightUuid: networkDetail?.weightUuid,
			});
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		const checkNetworkDetail = async () => {
			const res = await dispatch(fetchNetworkDetail(postId, accesstoken));
			if (res.success) {
				fill();
			} else if (!res.success) {
				alert(t('detail_alert1'));
				navigate('/NetworkLists');
			}
		};
		checkNetworkDetail();
		setLoading(false);
	}, []);

	useEffect(() => {
		setLoading(true);
		if (networkDetail) {
			setDetailInfo({
				title: networkDetail?.title,
				thumbnail: networkDetail?.thumbnail,
				writer: networkDetail?.writer?.nickname,
				updatedAt: networkDetail?.updatedAt,
				ver: networkDetail?.ver,
				summary: networkDetail?.summary,
				tagList: networkDetail?.tagList,
				desc: networkDetail?.description,
				isSubscribed: networkDetail?.isSubscribed,
				fee: networkDetail?.fee,
				weightUuid: networkDetail?.weightUuid,
			});
			setLoading(false);
		}
	}, [networkDetail]);

	const subscribe = async () => {
		setLoading(true);
		try {
			const res = await postNetworkSubscribe(forrequest, accesstoken);
			console.log(res.data.message);
			if (detailInfo.isSubscribed) {
				alert(t('anti_subscribe'));
			} else {
				alert(t('comp_subscribe'));
			}
			dispatch(
				setNetworkDetail({
					...networkDetail,
					isSubscribed: !detailInfo.isSubscribed,
				})
			);
			setDetailInfo({ ...detailInfo, isSubscribed: !detailInfo.isSubscribed });
		} catch (err) {
			console.error(err);
			console.log(err.response.data.message);
		}
		setLoading(false);
	};

	const subscribeBtn = () => {
		if (networkDetail) {
			subscribe();
		} else {
			alert('Error');
		}
	};

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
		setLoading(true);
		try {
			const res = await postInference(
				accesstoken,
				detailInfo.weightUuid,
				1, // ! only one // numImg || 0,
				-detailInfo.fee
			);
			console.log(res);
			alert('SUCCESS');
			navigate(`/Library/${postId}`);
			setLoading(false);
		} catch (err) {
			alert('ERROR');
		}
	};

	if (loading) return <Loading />;

	return (
		<NetworkDetail>
			<div className="networkTitle">{detailInfo.title}</div>
			<div className="updatedAt">{dateToText(detailInfo.updatedAt)}</div>
			<img src={detailInfo.thumbnail} alt="thumbnail" />
			<TextContainer>
				<div className="detailTitle">{t('uploader')}</div>
				<div className="detail">{detailInfo.writer}</div>
				<div className="detailTitle">{t('version')}</div>
				<div className="detail">{detailInfo.ver}</div>
				<div className="summary">{detailInfo.summary}</div>
				<div className="detailTitle">{t('subscribe')}</div>
				<div
					className="to-subscribe"
					onClick={() => {
						navigate('/Mysubscribe');
					}}
				>
					{t('subs_list')}
				</div>
				<div
					className="summary"
					style={{ color: 'lightgray', fontWeight: '350' }}
				>
					{t('detail_notice1')}
				</div>
				<div
					className={
						detailInfo.isSubscribed ? 'already-subscribed' : 'subscribe-button'
					}
					onClick={subscribeBtn}
				>
					{detailInfo.isSubscribed ? t('subscribed') : t('subs_try')}
				</div>
			</TextContainer>
			<TagListContainer>
				<div className="tagList">
					{detailInfo.tagList.map(({ id, name }) => (
						<div className="tag" key={id}>
							{name}
						</div>
					))}
				</div>
			</TagListContainer>
			<div className="desc">{detailInfo.desc}</div>
			<NetworkUseContainer>
				<div className="networkUseTitle">{t('run_model')}</div>
				<div className="networkUseDesc">{t('detail_notice2')}</div>
				<div className="networkUseDesc">{t('detail_notice3')}</div>
				<div className="networkUseButton" onClick={() => setIsPopup(!isPopup)}>
					{t('run_btn')}
				</div>
			</NetworkUseContainer>
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
						// value={numImg} // ! only one
						value="1" // ! only one
						disabled // ! only one
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
					<div className="closeButton" onClick={() => setIsPopup(false)}>
						{t('close')}
					</div>
				</PopupContainer>
			)}
		</NetworkDetail>
	);
};

export default Index;

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

const TextContainer = styled.div`
	display: grid;
	grid-template-columns: 100px minmax(200px, auto);
	.detailTitle {
		color: rgba(0, 0, 128, 1);
		font-weight: 500;
		margin-right: 20px;
	}
	.summary {
		grid-column: 1 / 3;
		width: 100%;
		overflow-wrap: break-word;
		margin: 5px 0px 10px 0px;
	}
	.to-subscribe {
		color: rgba(0, 0, 128, 1);
		font-weight: 200;
		/* width: 15rem; */
		outline: 0;
		border: 0;
		background-color: white;
		cursor: pointer;
	}
	.to-subscribe:hover {
		font-weight: 500;
	}
	.already-subscribed {
		grid-column: 1 / 3;
		align-self: center;
		text-align: center;
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		padding: 0.8rem;
		font-size: 15px;
		font-weight: 600;
		border-radius: 5px;
		cursor: pointer;
	}
	.already-subscribed:hover {
		color: rgba(0, 0, 128, 1);
		font-weight: 100;
		background-color: rgba(166, 185, 241, 0.3);
	}
	.already-subscribed:hover::after {
		color: rgba(0, 0, 128, 1);
		content: ' - Cancel';
		font-weight: 500;
	}

	.subscribe-button {
		grid-column: 1 / 3;
		align-self: center;
		text-align: center;
		background-color: rgba(166, 185, 241, 0.3);
		color: rgba(13, 0, 92, 1);
		padding: 0.8rem;
		font-size: 15px;
		font-weight: 600;
		border-radius: 5px;
		cursor: pointer;
	}
	.subscribe-button:hover {
		font-weight: 500;
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
	}
`;

const TagListContainer = styled.div`
	position: relative;
	display: flex;
	grid-column: 1 / 3;
	flex-direction: column;
	font-size: 16px;
	font-weight: 400;
	user-select: none;
	overflow: auto;
	.tagList {
		display: flex;
		flex-flow: row wrap;
		color: #666666;
		.tag {
			width: max-content;
			padding: 7px;
			border: 1px solid rgba(102, 102, 102, 1);
			border-radius: 3px;
			margin-right: 10px;
			margin-bottom: 3px;
			span {
				cursor: pointer;
			}
		}
	}
`;

const NetworkUseContainer = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 1/3;
	.networkUseTitle {
		font-size: 18px;
		color: #0d005c;
		padding-bottom: 10px;
		border-bottom: 2px solid #e2e2e2;
		margin-bottom: 10px;
	}
	.networkUseDesc {
		color: #2e2e2e;
	}
	.networkUseButton {
		background: rgba(166, 185, 241, 0.3);
		border-radius: 5px;
		color: #000080;
		padding: 10px;
		text-align: center;
		text-justify: center;
		margin-top: 20px;
	}
	.networkUseButton:hover {
		font-weight: 500;
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		margin-bottom: 0;
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
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
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
