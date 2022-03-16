import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNetworkDetail } from '../../reducers/network';
import { dateToText } from '../Utils';
import { DEFAULT_THUMBNAIL } from '../../constants';

const Index = () => {
	const dispatch = useDispatch();
	const networkDetail = useSelector((state) => state.network.detail);
	const { postId } = useParams();

	const [detailInfo, setDetailInfo] = useState({
		title: '',
		thumbnail: DEFAULT_THUMBNAIL,
		writer: '',
		updatedAt: '',
		ver: '',
		summary: '',
		tagList: [],
		desc: '',
	});

	useEffect(() => {
		dispatch(fetchNetworkDetail(postId));
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
			});
		}
	}, [networkDetail]);

	return (
		<NetworkDetail>
			<img src={detailInfo.thumbnail} alt="thumbnail" />
			<TextContainer>
				<div className="networkTitle">{detailInfo.title}</div>
				<div className="updatedAt">{dateToText(detailInfo.updatedAt)}</div>
				<div className="detailTitle">writer</div>
				<div className="writer">{detailInfo.writer}</div>
				<div className="detailTitle">version</div>
				<div className="detail">{detailInfo.ver}</div>
				<div className="summary">{detailInfo.summary}</div>

				<TagListContainer>
					<div className="tagList">
						{detailInfo.tagList.map(({ id, name }) => (
							<div className="tag" key={id}>
								{name}
							</div>
						))}
					</div>
				</TagListContainer>
			</TextContainer>
			<div className="desc">{detailInfo.desc}</div>
		</NetworkDetail>
	);
};

export default Index;

const NetworkDetail = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: 300px minmax(100px, auto);
	grid-gap: 10px 50px;
	gap: 10px 50px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 5%;
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
	grid-template-columns: auto 1fr;
	min-width: 230px;
	.networkTitle {
		grid-column: 1 / 3;
		font-size: 24px;
		font-weight: 600;
		overflow-wrap: break-word;
	}
	.updatedAt {
		grid-column: 1 / 3;
		justify-self: end;
		overflow: auto;
	}
	.detailTitle {
		color: #0d005c;
		margin-right: 20px;
	}
	.summary {
		grid-column: 1 / 3;
		width: 100%;
		overflow-wrap: break-word;
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
