import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { setNetworkDetail } from '../../reducers/network';
import { postWeight } from '../../axios/Network';
import startImg from '../../assets/weightUpload/start.svg';
import inprogressImg from '../../assets/weightUpload/inprogress.svg';
import doneImg from '../../assets/weightUpload/done.svg';

// eslint-disable-next-line react/prop-types
const Index = ({ setStage }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const networkDetail = useSelector((state) => state.network.detail);
	const [weightFile, setWeightFile] = useState();
	const [img, setImg] = useState(startImg);
	const [text, setText] = useState(t('upw_notice1'));
	const [buttonText, setButtonText] = useState(t('Upload Model'));
	const [fileName, setFileName] = useState();
	const [isInput] = useState(true);
	const [active, setActive] = useState(false);

	const createFormData = async () => {
		const formData = new FormData();
		formData.append('weight', weightFile);
		formData.append('postId', networkDetail.id);
		return formData;
	};

	const saveWeight = async () => {
		try {
			if (!weightFile) {
				alert(t('upw_alert1'));
				return;
			}
			// setIsInput(false);
			const formData = await createFormData();
			const res = await postWeight(accesstoken, formData, fileName, setText);
			console.log(`res: ${JSON.stringify(res.data)}`);
			dispatch(
				setNetworkDetail({
					...networkDetail,
					weightUuid: res.data.data.uuid,
				})
			);
			setImg(doneImg);
			setText('Upload SUCCESS');
			alert('Saved!');
			// dispatch(clearNetworkDetail());
			navigate(`/NetworkDetail/${networkDetail.id}`);
		} catch (err) {
			console.error(err.response);
			alert('Error : '); // /////////////////  Todo
		}
	};

	// eslint-disable-next-line react/prop-types
	// eslint-disable-next-line
	const Button = ({ title, onClick, active, justify }) => (
		<StlyedButton onClick={onClick} active={active} justify={justify}>
			{title}
		</StlyedButton>
	);

	return (
		<WeightUploadForm>
			<UploadForm>
				<img src={img} alt="icon" />
				<pre>{text}</pre>
				{isInput && (
					<div className="weightUploadButton">
						<label htmlFor="weightUploadButton">
							<input
								type="file"
								id="weightUploadButton"
								onChange={(e) => {
									setText(`${e.target.files[0].name}`);
									setWeightFile(e.target.files[0]);
									setFileName(e.target.files[0].name);
									setButtonText(t('upw_alert2'));
									setImg(inprogressImg);
									setActive(true);
								}}
							></input>
							{buttonText}
						</label>
					</div>
				)}
			</UploadForm>
			<Button title={t('back')} justify="start" onClick={() => setStage(0)} />
			<Button
				title={t('upload')}
				justify="end"
				active={active}
				onClick={saveWeight}
			/>
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
	gap: 20px 50px;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 10%;
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
	color: ${(props) => (props.active ? '#eaf0fb' : '#24146c')};
	background: ${(props) =>
		props.active ? 'rgba(0, 0, 128, 1)' : 'rgba(166, 185, 241, 0.3)'};
	cursor: pointer;
	user-select: none;
	font-size: 0.8rem;
	:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
	}
`;

const UploadForm = styled.div`
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
		white-space: pre-wrap;
		width: 80%;
		font-weight: 500;
		font-size: 16px;
		text-align: center;
		align-self: center;
		font-family: inherit;
	}
	.weightUploadButton {
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
		:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
	}
`;
