import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchNetworkDetail, setNetworkDetail } from '../../reducers/network';
import { Input } from '../Login';
import imageCompression from 'browser-image-compression';
import { DEFAULT_THUMBNAIL } from '../../constants';
import { postNetworkDetail, putNetworkDetail } from '../../axios/Network';
import { useParams } from 'react-router-dom';

// TODO: check user is network owner, else block/redirect

const Index = ({ newNetwork }) => {
	const dispatch = useDispatch();
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const userId = useSelector((state) => state.user.user.id);
	const networkDetail = useSelector((state) => state.network.detail);
	const { postId } = useParams();

	const [imgSrc, setImgSrc] = React.useState(DEFAULT_THUMBNAIL);
	const [detailInfo, setDetailInfo] = useState({
		title: '',
		desc: '',
		tags: '',
	});

	useEffect(() => {
		console.log(`newNetwork:${newNetwork}, postId:${postId}`);
		if (!newNetwork) dispatch(fetchNetworkDetail(postId));
	}, []);

	useEffect(() => {
		if (networkDetail) {
			setDetailInfo({
				title: networkDetail.title,
				desc: networkDetail.description,
				tags: networkDetail.tags,
			});
		}
	}, [networkDetail]);

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'title') {
			setDetailInfo({ ...detailInfo, title: value });
		} else if (className === 'desc') {
			setDetailInfo({ ...detailInfo, desc: value });
		} else if (className === 'tags') {
			setDetailInfo({ ...detailInfo, tags: value });
		} else {
			console.err('[-] error from NetworkDetailForm');
		}
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
				console.log(imgFile.size, _imgFile.size);
				reader.readAsDataURL(imgFile);
			}
			console.log(imgSrc);
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
		if (imgSrc && imgSrc !== DEFAULT_THUMBNAIL) {
			const date = new Date();
			const file = await imgSrcToFile(
				imgSrc,
				`thumbnail-${date.toDateString().replaceAll(' ', '-')}.png`
			);
			formData.append('image_urls', file);
		}
		formData.append('title', detailInfo.title);
		formData.append('description', detailInfo.desc);
		formData.append('tags', detailInfo.tags);
		formData.append('userId', userId);
		formData.append('ver', 1);

		return formData;
	};

	const saveNetworkDetail = async () => {
		try {
			const formData = await createFormData();
			const res = newNetwork
				? await postNetworkDetail(accesstoken, formData)
				: await putNetworkDetail(accesstoken, postId, formData);
			console.log(res);
			alert('Saved!');
			dispatch(setNetworkDetail(detailInfo));
		} catch (err) {
			console.error(err);
			alert(err.response.data.message);
		}
	};

	return (
		<NetworkDetailForm>
			<ImgContainer>
				<img src={imgSrc} alt="thumbnail" />

				<div className="uploadButton">
					<label htmlFor="uploadButton">Upload</label>
					<input
						type="file"
						id="uploadButton"
						accept=".jpeg, .jpg, .png"
						onChange={(e) => loadProfileImg((e?.target?.files)[0])}
					/>
				</div>
			</ImgContainer>
			<TextContainer>
				<DetailInput>
					<div className="inputTitle">Title</div>
					<input
						className="title"
						type="text"
						value={detailInfo.title}
						onChange={handleChange}
					/>
				</DetailInput>
				<DetailInput>
					<div className="inputTitle">Description</div>
					<textarea
						className="desc"
						type="text"
						value={detailInfo.desc}
						onChange={handleChange}
						rows="4"
					/>
				</DetailInput>
				<DetailInput>
					<div className="inputTitle">Tags</div>
					<textarea
						className="tags"
						type="text"
						value={detailInfo.tags}
						onChange={handleChange}
						rows="2"
					/>
				</DetailInput>
				<div className="saveButton" onClick={saveNetworkDetail}>
					save
				</div>
			</TextContainer>
		</NetworkDetailForm>
	);
};

Index.propTypes = {
	newNetwork: PropTypes.bool,
};

export default Index;

const NetworkDetailForm = styled.div`
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 5%;
`;

const ImgContainer = styled.div`
	position: relative;
	display: flex;
	width: 300px;
	flex-direction: column;
	align-content: space-evenly;
	justify-content: space-around;
	flex-shrink: 0;
	img {
		width: 80%;
		height: 80%;
		object-fit: contain;
		align-self: center;
	}
	.uploadButton {
		height: max-content;
		padding: 10px;
		border: 3px solid;
		align-self: center;
		cursor: pointer;
		input[type='file'] {
			display: none;
		}
	}
`;

const TextContainer = styled.div`
	display: flex;
	height: 100%;
	width: 50%;
	flex-direction: column;
	.saveButton {
		height: max-content;
		padding: 10px;
		border: 3px solid;
		align-self: center;
		cursor: pointer;
	}
`;

const DetailInput = styled(Input)`
	flex-direction: column;
`;
