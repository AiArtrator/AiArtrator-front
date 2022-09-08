import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNetworkDetail } from '../../reducers/network';
// import { dateToText } from '../Utils';
import DEFAULT_THUMBNAIL from '../../assets/thumb.jpeg';
import DOWNLOAD_ICON from '../../assets/download.svg';
import { getLibrary } from '../../axios/Network';

const Index = () => {
	const dispatch = useDispatch();
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
	const [selectedIdx, setSelectedIdx] = useState(0);
	const [library, setLibrary] = useState([]);
	useEffect(() => {
		if (!postId) {
			alert('Wrong access!');
			navigate(-1);
		}
		const checkNetworkDetail = async () => {
			const res = await dispatch(fetchNetworkDetail(postId, accesstoken));
			if (!res.success) {
				if (res.message) alert(res.message);
				navigate(-1);
			}
		};
		const asyncSetLibrary = async () => {
			const res = await getLibrary(postId, accesstoken);
			// let res = await getLibrary(postId, accesstoken);
			// res = {
			// 	data: {
			// 		success: true,
			// 		data: [
			// 			{
			// 				id: 3,
			// 				content: '생성 진행 중',
			// 				createdAt: '2022-04-29T11:55:37.596Z',
			// 				imageCount: '총 0/1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 3,
			// 				content: '생성 진행 중',
			// 				createdAt: '2022-04-29T11:55:37.596Z',
			// 				imageCount: '총 0/1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DEFAULT_THUMBNAIL,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 3,
			// 				content: '생성 진행 중',
			// 				createdAt: '2022-04-29T11:55:37.596Z',
			// 				imageCount: '총 0/1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DEFAULT_THUMBNAIL,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 			{
			// 				id: 4,
			// 				content: '과거에 생성한 이미지',
			// 				createdAt: '2022-04-29T19:34:11.657Z',
			// 				imageCount: '총 1장',
			// 				imageUrls: [DEFAULT_THUMBNAIL],
			// 				thumbnail: DOWNLOAD_ICON,
			// 			},
			// 		],
			// 	},
			// };
			if (!res.data.success) {
				if (res.data.message) alert(res.data.message);
				navigate(-1);
			} else if (!res.data.data.length) {
				alert('Model is running on Cloud API');
				navigate('/PurchasedNetwork');
			} else {
				res.data.data.reverse();
				setLibrary(res.data.data);
			}
		};
		checkNetworkDetail();
		asyncSetLibrary();
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

	return (
		<Library>
			<div className="libraryTitle">
				Image library created with {detailInfo.title}
			</div>
			<div
				className="inferenceButton"
				onClick={() => navigate(`/NetworkDetail/${postId}`)}
			>
				Create New
			</div>
			<div className="thumbnail">
				{library[selectedIdx]?.imageUrls[0] && (
					<img src={library[selectedIdx].imageUrls[0]} />
				)}
			</div>
			<div className="itemList">
				{library.map((item, idx) => {
					let date = new Date(item.createdAt);
					let createdAt = date.toLocaleString();
					return (
						<Item
							key={idx}
							selected={idx === selectedIdx}
							onClick={() => setSelectedIdx(idx)}
						>
							<div className="textWrapper">
								<div className="itemTitle">
									{item.imageCount.includes('/') ? 'Creating...' : '  Created'}
								</div>
								<div className="createdAt">{createdAt}</div>
								<div className="imageCount">{item.imageCount}</div>
							</div>
							<a
								className="downloadButton"
								target="_blank"
								rel="noreferrer"
								href={library[idx].imageUrls[0]}
								// download={
								// 	networkDetail?.title
								// 		? `${networkDetail.title}-${createdAt}.png`
								// 		: `${createdAt}.png`
								// }
							>
								<img src={DOWNLOAD_ICON} />
							</a>
						</Item>
					);
				})}
			</div>
		</Library>
	);
};

export default Index;

const Library = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 300px;
	grid-template-rows: min-content min-content;
	gap: 30px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 5%;
	.libraryTitle {
		grid-column: 1 / 2;
		grid-row: 1/2;
		justify-self: left;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		font-style: normal;
		font-weight: 600;
		font-size: 20px;
		color: #0d005c;
		height: min-content;
	}
	.inferenceButton {
		grid-column: 2 / 3;
		grid-row: 1/2;
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
	.inferenceButton:hover {
		background-color: rgba(166, 185, 241, 0.3);
		color: rgba(13, 0, 92, 1);
	}
	.thumbnail {
		grid-column: 1 / 2;
		grid-row: 2/3;
		margin: 0;
		img {
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
			border-radius: 3px;
		}
	}
	.itemList {
		position: absolute;
		grid-column: 2 / 3;
		grid-row: 2/3;
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
`;

const Item = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 50px;
	gap: 10px;
	max-height: 80px;
	width: calc(90% - 10px);
	background: ${(props) =>
		props.selected ? 'rgba(166, 185, 241, 0.3)' : 'transparent'};
	border: 0.5px solid #000080;
	border-radius: 10px;
	align-items: center;
	padding: 5%;
	.textWrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 90%;
		margin-left: 5%;
		padding-top: 2%;
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		.itemTitle {
			font-size: 14px;
			color: #686868;
		}
		.createdAt {
			color: #5b5b5b;
		}
		.imageCount {
			color: #000080;
		}
	}
	.downloadButton {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0px 0px 20px rgba(0, 0, 128, 0.5);
		img {
			position: relative;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -60%);
			width: 50%;
			height: 50%;
			object-fit: contain;
		}
	}
`;
