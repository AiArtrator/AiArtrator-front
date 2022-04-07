import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setNetworkDetail } from '../../reducers/network';
import { postNetworkDetail } from '../../axios/Network';
import { loadImg, imgSrcToFile } from '../Utils';
// import { DEFAULT_THUMBNAIL } from '../../constants';
import startImg from '../../assets/weightUpload/start.svg';

const Index = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const networkDetail = useSelector((state) => state.network.detail);

	const [imgSrc, setImgSrc] = React.useState(startImg); // React.useState(DEFAULT_THUMBNAIL);
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

	const createFormData = async () => {
		const formData = new FormData();
		if (imgSrc) {
			const date = new Date();
			const file = await imgSrcToFile(
				imgSrc,
				`thumbnail-${date.toDateString().replaceAll(' ', '-')}.png`
			);
			formData.append('image_urls', file);
		}
		formData.append('title', detailInfo.title.trim());
		formData.append('summary', detailInfo.summary.trim());
		formData.append('ver', detailInfo.ver.trim());
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
			console.error(err.response);
			console.error(err.response.data);
			alert(err.response.data);
		}
	};

	// eslint-disable-next-line react/prop-types
	const Button = ({ title, onClick, justify }) => (
		<StlyedButton onClick={onClick} justify={justify}>
			{title}
		</StlyedButton>
	);

	// eslint-disable-next-line react/prop-types
	const Form = ({ img, text, buttonText, isInput }) => (
		<UploadContainer>
			<img src={img} alt="thumbnail" />
			<pre>{text}</pre>
			<div className="uploadButton">
				<label htmlFor="uploadButton">
					{isInput ?? (
						<input
							type="file"
							id="uploadButton"
							// accept=".jpeg, .jpg, .png"
							onChange={(e) => loadImg((e?.target?.files)[0], setImgSrc)}
						></input>
					)}
					{buttonText}
				</label>
			</div>
		</UploadContainer>
	);

	return (
		<WeightUploadForm>
			<Form
				img={imgSrc}
				text={`모델 weight를 올려야\n완료할 수 있습니다.`}
				buttonText="모델 업로드 하기"
			/>
			<Form
				img={imgSrc}
				text={`모델 weight를 올려야\n완료할 수 있습니다.`}
				buttonText="모델 업로드 하기"
				isInput
			/>
			<div className="detailUploadButton" onClick={saveNetworkDetail}>
				이전 &gt;
			</div>
			<Button title="이전" justify="start" />
			<Button title="다음" justify="end" />
		</WeightUploadForm>
	);
};

export default Index;

const WeightUploadForm = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: auto 500px auto;
	grid-template-rows: 300px auto;
	grid-gap: 10px 50px;
	gap: 10px 50px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 3%;
	text-align: center;
`;

const StlyedButton = styled.div`
	grid-column: 1 / 4;
	grid-row: 2 / 3;
	justify-self: ${(props) => (props.justify ? props.justify : 'end')};
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
	:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		margin-bottom: 0;
	}
`;

const UploadContainer = styled.div`
	grid-column: 2 / 3;
	justify-self: center;
	width: 317px;
	height: 275px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	border-radius: 5px;
	display: grid;
	justify-items: center;
	align-items: end;
	grid-template-rows: 140px 75px 60px;
	img {
		grid-row: 1 / 2;
		width: 64px;
		height: 58px;
		object-fit: contain;
	}
	pre {
		width: 80%;
		font-weight: 500;
		font-size: 16px;
		text-align: center;
		align-self: center;
		font-family: inherit;
	}
	.uploadButton {
		width: 100%;
		height: 100%;
		background: rgba(166, 185, 241, 0.3);
		border-radius: 0px 0px 5px 5px;
		font-weight: 400;
		font-size: 16px;
		line-height: 60px;
		color: #343434;
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
	}
	.uploadButton:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		margin-bottom: 0;
	}
`;
