import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setNetworkDetail } from '../../reducers/network';
import imageCompression from 'browser-image-compression';
// import { DEFAULT_THUMBNAIL } from '../../constants';
import { postNetworkDetail } from '../../axios/Network';
import defaultimg from '../../assets/thumb.jpeg';

const Index = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const networkDetail = useSelector((state) => state.network.detail);

	const [imgSrc, setImgSrc] = React.useState(defaultimg); // React.useState(DEFAULT_THUMBNAIL);
	const [detailInfo, setDetailInfo] = useState({
		title: '',
		summary: '',
		ver: '',
		tagList: [],
		desc: '',
	});

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

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'title') {
			setDetailInfo({ ...detailInfo, title: value });
		} else if (className === 'summary') {
			setDetailInfo({ ...detailInfo, summary: value });
		} else if (className === 'ver') {
			setDetailInfo({ ...detailInfo, ver: value });
		} else if (className === 'desc') {
			setDetailInfo({ ...detailInfo, desc: value });
		} else {
			console.err('[-] error from NetworkDetailForm');
		}
	};

	const addTag = (e) => {
		if (e.code === 'Enter') {
			const tmpTagList = detailInfo.tagList;
			const index = tmpTagList.indexOf(e.target.value);
			if (index === -1 && !e.target.value.includes(',')) {
				tmpTagList.push(e.target.value);
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

	const loadProfileImg = async (_imgFile) => {
		try {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64 = reader.result;
				if (base64) {
					setImgSrc(base64.toString());
				}
			};
			if (_imgFile) {
				const imgFile = await imageCompression(_imgFile, {
					maxSizeMB: 0.5,
					maxWidthOrHeight: 1180,
					useWebWorker: true,
				});
				reader.readAsDataURL(imgFile);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const imgSrcToFile = async (_imgSrc, fileName) => {
		const res: Response = await fetch(_imgSrc);
		const blob: Blob = await res.blob();
		return new File([blob], fileName, { type: 'image/png' });
	};

	const createFormData = async () => {
		const formData = new FormData();
		if (imgSrc && imgSrc !== defaultimg) {
			const date = new Date();
			const file = await imgSrcToFile(
				imgSrc,
				`thumbnail-${date.toDateString().replaceAll(' ', '-')}.png`
			);
			formData.append('image_urls', file);
		}
		formData.append('title', detailInfo.title);
		formData.append('summary', detailInfo.summary);
		formData.append('ver', detailInfo.ver);
		let tagString = '';
		detailInfo.tagList.forEach((tag) => {
			tagString += tag + ',';
		});
		formData.append('tagList', tagString.length ? tagString.slice(0, -1) : '');
		formData.append('description', detailInfo.desc);

		return formData;
	};

	const saveNetworkDetail = async () => {
		try {
			const formData = await createFormData();
			const res = await postNetworkDetail(accesstoken, formData);
			console.log(res);
			// alert('Saved!');
			dispatch(setNetworkDetail(detailInfo));
			navigate('/WeightUpload'); // TODO:
		} catch (err) {
			console.error(err);
			alert(err.response.data.message);
		}
	};

	return (
		// <MiddleForm>
		// 	<div className="title">모델 업로드</div>
		<NetworkDetailForm>
			<ImgContainer>
				<img src={imgSrc} alt="thumbnail" />
				<div className="uploadButton">
					<input
						type="file"
						id="uploadButton"
						accept=".jpeg, .jpg, .png"
						onChange={(e) => loadProfileImg((e?.target?.files)[0])}
					/>
					<label htmlFor="uploadButton">썸네일 업로드</label>
				</div>
			</ImgContainer>
			<TextContainer>
				<DetailInput>
					<div className="inputTitle">모델 이름</div>
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
					<div className="inputTitle">요약</div>
					<input
						className="summary"
						type="text"
						value={detailInfo.summary}
						placeholder="max 100 chars"
						onChange={handleChange}
						maxLength="100"
					/>
				</DetailInput>
				<DetailInput>
					<div className="inputTitle">모델 버전</div>
					<input
						className="ver"
						type="text"
						value={detailInfo.ver}
						placeholder="max 20 chars"
						onChange={handleChange}
						maxLength="20" // TODO: fix maxLength
					/>
				</DetailInput>
			</TextContainer>
			<DetailInput>
				<div className="inputTitle">모델 설명</div>
				<textarea
					className="desc"
					type="text"
					value={detailInfo.desc}
					placeholder="max 3000 chars"
					onChange={handleChange}
					maxLength="3000" // TODO: fix maxLength
					rows="5"
				/>
			</DetailInput>
			<TagListContainer>
				<div className="tagListTitle">태그 추가</div>
				<div className="tagList">
					<input
						className="tag tagInput"
						placeholder="#Input_tag"
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
				다음 &gt;
			</div>
		</NetworkDetailForm>
		// {/* </MiddleForm> */}
	);
};

export default Index;

// const MiddleForm = styled.div`
// 	display: table;
// 	margin-left: auto;
// 	margin-right: auto;
// 	.title {
// 		font-size: 20px;
// 	}
// `;

const NetworkDetailForm = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 300px auto auto;
	grid-gap: 10px 50px;
	gap: 10px 50px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 3%;

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
		padding: 10px 0px;
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
	}
	.uploadButton:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		margin-bottom: 0;
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
