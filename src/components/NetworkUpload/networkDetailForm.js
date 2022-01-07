import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../Login';

// TODO: check user is network owner, else block/redirect
// TODO: connet with backend

const Index = () => {
	const [detailInfo, setDetailInfo] = useState({
		title: '',
		desc: '',
		tags: '',
	});

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

	return (
		<NetworkDetailForm>
			<ImgContainer>
				<img src="/logo512.png" alt="thumbnail" />
				<div className="uploadButton">upload</div>
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
			</TextContainer>
		</NetworkDetailForm>
	);
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
	}
`;

const TextContainer = styled.div`
	display: flex;
	height: 100%;
	width: 50%;
	flex-direction: column;
`;

const DetailInput = styled(Input)`
	flex-direction: column;
`;
