import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNetworkDetail, setNetworkDetail } from '../../reducers/network';
import { dateToText } from '../Utils';
import DEFAULT_THUMBNAIL from '../../assets/thumb.jpeg';
import { postNetworkSubscribe } from '../../axios/Network';

const Index = () => {
	const dispatch = useDispatch();
	const networkDetail = useSelector((state) => state.network.detail);
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const { postId } = useParams();
	const navigate = useNavigate();
	const [detailInfo, setDetailInfo] = useState({
		title: '로딩 중',
		thumbnail: DEFAULT_THUMBNAIL,
		writer: '로딩 중',
		updatedAt: '로딩 중',
		ver: '로딩 중',
		summary: '로딩 중입니다.',
		tagList: [],
		desc: '로딩 중',
		isSubscribed: false,
	});
	const forrequest = { postId: postId };

	useEffect(() => {
		const checkNetworkDetail = async () => {
			const res = await dispatch(fetchNetworkDetail(postId, accesstoken));
			if (!res.success) {
				alert(res.message);
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
				writer: networkDetail.writer.nickname,
				updatedAt: networkDetail.updatedAt,
				ver: networkDetail.ver,
				summary: networkDetail.summary,
				tagList: networkDetail.tagList,
				desc: networkDetail.description,
				isSubscribed: networkDetail.isSubscribed,
			});
		}
	}, [networkDetail]);

	const subscribe = async () => {
		try {
			const res = await postNetworkSubscribe(forrequest, accesstoken);
			console.log(res.data.message);
			if (detailInfo.isSubscribed) {
				alert('구독 취소 완료');
			} else {
				alert('구독 완료');
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
	};

	const subscribeBtn = () => {
		if (networkDetail) {
			subscribe();
		} else {
			alert('에러 발생');
		}
	};

	return (
		<NetworkDetail>
			<div className="networkTitle">{detailInfo.title}</div>
			<div className="updatedAt">{dateToText(detailInfo.updatedAt)}</div>
			<img src={detailInfo.thumbnail} alt="thumbnail" />
			<TextContainer>
				<div className="detailTitle">판매자</div>
				<div className="detail">{detailInfo.writer}</div>
				<div className="detailTitle">모델 버전</div>
				<div className="detail">{detailInfo.ver}</div>
				<div className="summary">{detailInfo.summary}</div>
				<div className="detailTitle">모델 구독</div>
				<div
					className="to-subscribe"
					onClick={() => {
						navigate('/Mysubscribe');
					}}
				>
					나의 구독리스트
				</div>
				<div
					className="summary"
					style={{ color: 'lightgray', fontWeight: '350' }}
				>
					* 모델 구독시, 구독한 모델보기 페이지에서 확인 및 이용이 가능합니다.
				</div>
				<div
					className={
						detailInfo.isSubscribed ? 'already-subscribed' : 'subscribe-button'
					}
					onClick={subscribeBtn}
				>
					{detailInfo.isSubscribed ? '구독 중인 모델' : '구독하기'}
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
				<div className="networkUseTitle">모델 이용하기</div>
				<div className="networkUseDesc">
					* 모델을 이용하여 이미지를 디운로드 할 수 있고, 얻은 이미지들은 생성한
					이미지 Library에 자동으로 아카이빙 되며 언제든지 다시 다운로드 할 수
					있습니다.
				</div>
				<div className="networkUseDesc">
					* 이용할 때마다 서비스 정책에 따라 금액이 부과됩니다.
				</div>
				<div className="networkUseButton">이 모델로 이미지 얻기</div>
			</NetworkUseContainer>
		</NetworkDetail>
	);
};

export default Index;

const NetworkDetail = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: min-content 300px min-content min-content;
	grid-gap: 30px;
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
		content: ' - 구독 취소';
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
