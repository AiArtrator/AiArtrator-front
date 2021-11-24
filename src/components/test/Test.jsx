import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import styled from 'styled-components';

const TestComponent = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	background-color: blue;
	canvas {
		width: 200px;
		height: 200px;
	}
`;

const SIZE = 200;

const Test = () => {
	const [imgSrc, setImgSrc] = useState('');
	const canvasRef = useRef(null);
	const getInfer = async () => {
		const res = await Axios.get(`http://localhost:8080/sample-image.jpg`, {
			responseType: 'arraybuffer',
		});
		console.log(res);
		const b64 = Buffer.from(res.data, 'binary').toString('base64');
		const imageUrl = `data:image/jpg;base64,${b64}`;
		setImgSrc(imageUrl);
		return b64;
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		const img = new Image();
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			console.log(canvas, canvas.width, canvas.height);
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			const dyH =
				img.height > img.width ? SIZE : (img.height / img.width) * SIZE;
			const dyW =
				img.height > img.width ? (img.width / img.height) * SIZE : SIZE;
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, dyW, dyH);
		};
		img.src = imgSrc;
	}, [imgSrc]);

	return (
		<TestComponent>
			<button type="button" onClick={() => getInfer()}>
				Infer
			</button>
			<canvas ref={canvasRef} width={SIZE} height={SIZE} />
		</TestComponent>
	);
};

export default Test;
