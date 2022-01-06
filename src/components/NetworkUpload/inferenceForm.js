import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { inference } from '../../axios/inference';

const Index = () => {
	const [imgSrc, setImgSrc] = useState('');
	const canvasRef = useRef(null);

	const getInfer = async (url) => {
		try {
			const res = await inference(url);
			const b64 = Buffer.from(res.data, 'binary').toString('base64');
			const imageUrl = `data:image/jpg;base64,${b64}`;
			setImgSrc(imageUrl);
		} catch (err) {
			console.error(err);
			alert('Not available');
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		console.log(canvas);
		const ctx = canvas?.getContext('2d');
		const img = new Image();
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			console.log(canvas, canvas.width, canvas.height);
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			const scale = Math.min(
				canvas.width / img.width,
				canvas.height / img.height
			);
			const x = canvas.width / 2 - (img.width / 2) * scale;
			const y = canvas.height / 2 - (img.height / 2) * scale;
			ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
		};
		img.src = imgSrc;
	}, [imgSrc]);

	return (
		<InferenceForm>
			<canvas ref={canvasRef} />
			<div className="inferenceButton" onClick={() => getInfer('/logo512.png')}>
				Inference
			</div>
		</InferenceForm>
	);
};

export default Index;

const InferenceForm = styled.div`
	position: relative;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	width: -webkit-fill-available;
	height: -webkit-fill-available;
	padding: 5%;
	canvas {
		height: 100%;
		border: 2px solid;
	}
	.inferenceButton {
		height: max-content;
		padding: 10px;
		border: 3px solid;
		align-self: center;
	}
`;
