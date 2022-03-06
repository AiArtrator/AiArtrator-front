import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchNetworkDetail } from '../../reducers/network';
import { DEFAULT_THUMBNAIL } from '../../constants';
import { useParams } from 'react-router-dom';

const Index = () => {
	const dispatch = useDispatch();
	const networkDetail = useSelector((state) => state.network.detail);
	const { postId } = useParams();

	const [imgSrc] = React.useState(DEFAULT_THUMBNAIL);
	const [detailInfo, setDetailInfo] = useState({
		title: '',
		summary: '',
		ver: '',
		tagList: ['t1', 'sdfsdf1', 'sadfasd'],
		desc: '',
	});

	useEffect(() => {
		dispatch(fetchNetworkDetail(postId));
	}, []);

	// ! TEST
	useEffect(() => {
		console.log(detailInfo.tagList);
	}, [detailInfo]);

	useEffect(() => {
		if (networkDetail) {
			setDetailInfo({
				title: networkDetail.title,
				summary: networkDetail.summary,
				ver: networkDetail.ver,
				tagList: networkDetail.tagList,
				desc: networkDetail.description,
			});
		}
	}, [networkDetail]);

	return (
		<NetworkDetailForm>
			<ImgContainer>
				<img src={imgSrc} alt="thumbnail" />
			</ImgContainer>
			<TextContainer>
				<DetailInput>
					<div className="inputTitle">Title</div>
					<input
						className="title"
						type="text"
						value={detailInfo.title}
						placeholder="max 50 chars"
						maxLength="50" // TODO: fix maxLength
					/>
				</DetailInput>
				<DetailInput>
					<div className="inputTitle">Summary</div>
					<input
						className="summary"
						type="text"
						value={detailInfo.summary}
						placeholder="max 100 chars"
						maxLength="100"
					/>
				</DetailInput>
				<DetailInput>
					<div className="inputTitle">Version</div>
					<input
						className="ver"
						type="text"
						value={detailInfo.ver}
						placeholder="max 20 chars"
						maxLength="20" // TODO: fix maxLength
					/>
				</DetailInput>
			</TextContainer>
			<DetailInput>
				<div className="inputTitle">Description</div>
				<textarea
					className="desc"
					type="text"
					value={detailInfo.desc}
					placeholder="max 3000 chars"
					maxLength="3000" // TODO: fix maxLength
					rows="5"
				/>
			</DetailInput>
			<TagListContainer>
				<div className="tagListTitle">Add Tag</div>
				<div className="tagList">
					<input
						className="tag tagInput"
						placeholder="#Input_tag"
						maxLength="15"
					/>
					{detailInfo.tagList.map((tagName) => (
						<div className="tag" key={tagName}>
							{tagName}{' '}
						</div>
					))}
				</div>
			</TagListContainer>
		</NetworkDetailForm>
	);
};

Index.propTypes = {
	newNetwork: PropTypes.bool,
};

export default Index;

const NetworkDetailForm = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 300px auto auto;
	grid-gap: 10px 50px;
	gap: 10px 50px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 5%;
	.detailUploadButton {
		/* padding: 10px;
		border: 3px solid;
		align-self: center;
		cursor: pointer;
		height: max-content;
		width: 100%; */
		grid-column: 2 / 3;
		justify-self: end;
		width: 100px;
		right: 0;
		padding: 10px 0px;
		text-align: center;
		border-radius: 5px;
		background-color: rgba(166, 185, 241, 0.3);
		color: #24146c;
		cursor: pointer;
		user-select: none;
		input[type='file'] {
			display: none;
		}
	}
`;

const ImgContainer = styled.div`
	position: relative;
	text-align: center;
	img {
		height: calc(100% - 44px);
		object-fit: contain;
		align-self: center;
	}
	.uploadButton {
		height: max-content;
		width: 100%;
		padding: 10px 0px;
		text-align: center;
		border-radius: 5px;
		background-color: rgba(166, 185, 241, 0.3);
		color: #24146c;
		cursor: pointer;
		user-select: none;
		input[type='file'] {
			display: none;
		}
	}
`;

const TextContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
`;

const DetailInput = styled.div`
	flex-direction: column;
	position: relative;
	display: flex;
	margin: 15px 0px;
	grid-column: 1 / 3;
	.inputTitle {
		font-size: 16px;
		width: 200px;
		margin: 7px;
		color: #0d005c;
	}
	input {
		font-size: 16px;
		width: calc(100% - 14px); // padding
		padding: 7px;
		border: 0px;
		border-bottom: 1px solid rgba(236, 236, 236, 1);
		outline: none;
	}
	textarea {
		font-size: 16px;
		resize: none;
		width: calc(100% - 18px); // padding + border
		padding: 7px;
		margin: 7px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-radius: 3px;
		font-family: inherit;
		font-size: inherit;
		font-weight: 400;
		outline: none;
		height: max-content;
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
	.tagListTitle {
		width: 200px;
		margin: 7px;
		font-weight: 600;
		color: #0d005c;
	}
	.tagList {
		display: flex;
		flex-flow: row wrap;
		padding: 7px;
		color: #666666;
		.tag,
		.tagInput {
			/* height: 37px; */
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
		.tagInput {
			width: 100px;
			color: #000000;
			border: 1px solid rgba(0, 0, 0, 1);
			outline: none;
		}
	}
`;
