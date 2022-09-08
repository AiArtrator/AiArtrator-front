import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	setNetworkDetail,
	fetchNetworkDetail,
	clearNetworkDetail,
} from '../../reducers/network';
import { postNetworkDetail, putNetworkDetail } from '../../axios/Network';
import { imgSrcToFile, loadImg } from '../Utils';
import defaultimg from '../../assets/thumb.jpeg';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
const Index = ({ setStage, postId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const accesstoken = useSelector((state) => state.user.accesstoken);
	const networkDetail = useSelector((state) => state.network.detail);
	const nickname = useSelector((state) => state.user.user.nickname);

	const [imgSrc, setImgSrc] = useState(defaultimg); // useState(DEFAULT_THUMBNAIL);
	const [detailInfo, setDetailInfo] = useState({
		title: '',
		summary: '',
		ver: '',
		tagList: [],
		description: '',
		fee: '',
	});
	const [isFree, setIsFree] = useState(false); // useState(DEFAULT_THUMBNAIL);

	useEffect(() => {
		if (postId) dispatch(fetchNetworkDetail(postId, accesstoken));
		else dispatch(clearNetworkDetail());
	}, []);

	useEffect(() => {
		if (postId && networkDetail) {
			if (nickname !== networkDetail.writer.nickname) {
				alert(t('upload_alert1'));
				navigate(-1);
			}
			setDetailInfo({
				title: networkDetail.title,
				summary: networkDetail.summary,
				ver: networkDetail.ver,
				tagList: networkDetail.tagList.map(({ name }) => name),
				description: networkDetail.description,
				fee: networkDetail.fee,
			});
		}
	}, [networkDetail]);

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'title') {
			setDetailInfo({ ...detailInfo, title: value });
		} else if (className === 'summary') {
			setDetailInfo({ ...detailInfo, summary: value });
		} else if (className === 'fee') {
			setDetailInfo({ ...detailInfo, fee: value });
		} else if (className === 'ver') {
			setDetailInfo({ ...detailInfo, ver: value });
		} else if (className === 'description') {
			setDetailInfo({ ...detailInfo, description: value });
		} else {
			console.error('[-] error from NetworkDetailForm');
		}
	};

	const addTag = (e) => {
		if (e.code === 'Enter') {
			const tmpTagList = detailInfo.tagList;
			const val = e.target.value.trim();
			const index = tmpTagList.indexOf(val);
			if (
				index === -1 &&
				!val.includes(',') &&
				tmpTagList.length < 10 &&
				val.length > 0
			) {
				tmpTagList.push(val);
				setDetailInfo({ ...detailInfo, tagList: tmpTagList });
			}
			e.target.value = '';
		}
	};

	const deleteTag = (e) => {
		const tmpTagList = detailInfo.tagList;
		const index = tmpTagList.indexOf(e.target.getAttribute('tagname'));
		if (index > -1) {
			tmpTagList.splice(index, 1);
		}
		setDetailInfo({ ...detailInfo, tagList: tmpTagList });
	};

	const createFormData = async () => {
		const formData = new FormData();
		if (imgSrc && imgSrc !== defaultimg) {
			const date = new Date();
			const file = await imgSrcToFile(
				imgSrc,
				`thumbnail-${date.toDateString().replaceAll(' ', '-')}.png`
			);
			formData.append('thumbnail', file);
		}
		formData.append('title', detailInfo.title.trim());
		formData.append('fee', detailInfo.fee);
		formData.append('summary', detailInfo.summary.trim());
		formData.append('ver', detailInfo.ver.trim());
		let tagString = '';
		detailInfo.tagList.forEach((tag) => {
			tagString += tag + ',';
		});
		formData.append('tagList', tagString.length ? tagString.slice(0, -1) : '');
		formData.append('description', detailInfo.description);

		return formData;
	};

	const submit = async () => {
		try {
			const formData = await createFormData();
			let res;
			if (postId) res = await putNetworkDetail(accesstoken, postId, formData);
			else res = await postNetworkDetail(accesstoken, formData);
			dispatch(setNetworkDetail(res.data.data));
			setStage(1);
		} catch (err) {
			console.error(err.response);
			if (err.response.data.message) alert('Error');
		}
	};
	const saveNetworkDetail = () => {
		if (
			detailInfo.description === '' ||
			detailInfo.fee === '' ||
			detailInfo.summary === '' ||
			detailInfo.title === '' ||
			detailInfo.ver === ''
		) {
			alert(t('upload_alert2'));
		} else {
			submit();
		}
	};

	return (
		<NetworkDetailForm>
			<ImgContainer>
				<img src={imgSrc} alt="thumbnail" />
				<div className="uploadButton">
					<label htmlFor="uploadButton">
						<input
							type="file"
							id="uploadButton"
							accept=".jpeg, .jpg, .png"
							onChange={(e) => loadImg((e?.target?.files)[0], setImgSrc)}
						/>
						{t('upload_thumbnail')}
					</label>
				</div>
			</ImgContainer>
			<TextContainer>
				<DetailInput>
					<div className="inputTitle"> {t('model_name')} </div>
					<input
						className="title"
						type="text"
						value={detailInfo.title}
						placeholder="max 50 chars"
						onChange={handleChange}
						maxLength="50" // TODO: fix maxLength
					/>
				</DetailInput>
				<DetailInput>
					<div className="inputTitle">{t('model_summary')}</div>
					<input
						className="summary"
						type="text"
						value={detailInfo.summary}
						placeholder="max 100 chars"
						onChange={handleChange}
						maxLength="100"
					/>
				</DetailInput>
				<FeeContainer isFree={isFree}>
					<div className="feeTitle">
						{t('model_fee')}
						<br />
						{t('model_fee2')}
					</div>
					<input
						className="fee"
						type="number"
						value={detailInfo.fee}
						onChange={handleChange}
						onDrop={() => false}
						onPaste={() => false}
						disabled={isFree}
					/>
					<div className="feeUnit">Token</div>
					<div className="freeCheckbox">
						<label htmlFor="freeCheckbox">
							<input
								type="checkbox"
								id="freeCheckbox"
								onChange={() => {
									if (!isFree) setDetailInfo({ ...detailInfo, fee: 0 });
									setIsFree(!isFree);
								}}
							/>
							{t('model_fee3')}
						</label>
					</div>
					<div className="noticeText">
						{t('model_notice1')}
						<br />
						{t('model_notice2')}
						<br />
						{t('model_notice3')}
					</div>
				</FeeContainer>
			</TextContainer>
			<DetailInput>
				<div className="inputTitle">{t('model_ver')}</div>
				<input
					className="ver"
					type="text"
					value={detailInfo.ver}
					placeholder="max 20 chars"
					onChange={handleChange}
					maxLength="20" // TODO: fix maxLength
				/>
			</DetailInput>
			<DetailInput>
				<div className="inputTitle">{t('model_detail')}</div>
				<textarea
					className="description"
					type="text"
					value={detailInfo.description}
					placeholder="max 3000 chars"
					onChange={handleChange}
					maxLength="3000" // TODO: fix maxLength
					rows="5"
				/>
			</DetailInput>
			<TagListContainer>
				<div className="tagListTitle">{t('model_tag')}</div>
				<div className="tagList">
					<input
						className="tag tagInput"
						placeholder="#max_10_tags"
						onKeyPress={addTag}
						maxLength="15"
					/>
					{detailInfo.tagList.map((tagName) => (
						<div className="tag" key={tagName}>
							{tagName}{' '}
							<span onClick={deleteTag} tagname={tagName}>
								✖
							</span>
						</div>
					))}
				</div>
			</TagListContainer>
			<div className="detailUploadButton" onClick={saveNetworkDetail}>
				{t('next')}
			</div>
		</NetworkDetailForm>
	);
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
	padding: 7% 5% 5% 5%;

	.detailUploadButton {
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
		font-size: 0.8rem;
		input[type='file'] {
			display: none;
		}
	}
	.detailUploadButton:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		margin-bottom: 0;
	}
`;

const ImgContainer = styled.div`
	position: relative;
	text-align: center;
	img {
		width: calc(100% - 50px);
		height: calc(100% - 50px);
		object-fit: contain;
		align-self: center;
		margin-bottom: 0.5rem;
	}
	.uploadButton {
		height: max-content;
		width: 100%;
		line-height: 38px;
		text-align: center;
		border-radius: 5px;
		background-color: rgba(166, 185, 241, 0.3);
		font-size: 0.8rem;
		color: #24146c;
		cursor: pointer;
		user-select: none;
		input[type='file'] {
			display: none;
		}
		label {
			display: block;
			width: 100%;
			height: 100%;
		}
		:hover {
			background-color: rgba(0, 0, 128, 1);
			color: #eaf0fb;
			margin-bottom: 0;
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
	margin: 10px 0px;
	grid-column: 1 / 3;
	.inputTitle {
		font-size: 0.8rem;
		width: 200px;
		margin: 7px;
		color: #0d005c;
	}
	input {
		font-size: 1rem;
		width: calc(100% - 14px); // padding
		padding: 7px;
		border: 0px;
		border-bottom: 1px solid rgba(236, 236, 236, 1);
		outline: none;
	}
	textarea {
		font-size: 0.8rem;
		resize: none;
		width: calc(100% - 18px); // padding + border
		padding: 7px;
		margin: 7px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-radius: 3px;
		font-weight: 400;
		outline: none;
		height: max-content;
		font-family: inherit;
	}
`;

const TagListContainer = styled.div`
	position: relative;
	display: flex;
	grid-column: 1 / 3;
	flex-direction: column;
	font-size: 0.8rem;
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

const FeeContainer = styled.div`
	display: grid;
	grid-template-columns: 150px 133px 45px auto;
	grid-template-rows: 50px auto;
	grid-gap: 10px 10px;
	gap: 10px 10px;
	align-items: center;
	.feeTitle {
		font-size: 0.8rem;
		width: 100%;
		color: #0d005c;
	}
	.fee {
		box-shadow: 0px 0px 3px 3px
			${(props) =>
				props.isFree ? 'rgba(157, 157, 157, 0.3)' : 'rgba(166, 185, 241, 0.3)'};
		width: 100%;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-sizing: border-box;
		border-radius: 5px;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #0d005c;
		text-align: center;
		outline: none;
		::-webkit-outer-spin-button,
		::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
		-moz-appearance: textfield;
	}
	.feeUnit {
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #0d005c;
		justify-self: left;
	}
	.freeCheckbox {
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #0d005c;
		input {
			margin-right: 10px;
		}
	}
	.noticeText {
		grid-column: 1 / 5;
		align-self: start;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		color: #ff0000;
	}
`;
