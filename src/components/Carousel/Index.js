import React from 'react';
import { Carousel } from 'react-carousel-minimal';
import JPG1 from '../../assets/carousel1.jpg';
import JPG2 from '../../assets/carousel2.jpeg';
import JPG3 from '../../assets/carousel3.jpeg';

const Index = () => {
	const data = [
		{
			image: JPG2,
			caption: `<div>
					  <br/>
					  <h2>The Platfom of Generative model</h2>
					  <br/>
					  업로드된 머신러닝 모델을 통해 
					  <br />새로운 이미지를 생성해보세요 !

					</div>`,
		},
		{
			image: JPG1,
			caption: `<div>
			<br/>
			<h2>The Platfom of Generative model</h2>
			<br/>
			업로드된 머신러닝 모델을 통해 
			<br />새로운 이미지를 생성해보세요 !

		  </div>`,
		},
		{
			image: JPG3,
			caption: `<div>
			<br/>
			<br/>
			<br/>
			<h2>P - O - G</h2>
			

		  </div>`,
		},
	];

	const captionStyle = {
		fontSize: '2em',
		fontWeight: 'bold',
	};
	const slideNumberStyle = {
		fontSize: '20px',
		fontWeight: 'bold',
	};
	return (
		<div className="App">
			<div style={{ textAlign: 'center' }}>
				<div
					style={{
						padding: '0 20px',
					}}
				>
					<Carousel
						data={data}
						time={3000}
						width="850px"
						height="500px"
						captionStyle={captionStyle}
						radius="10px"
						slideNumber={false}
						slideNumberStyle={slideNumberStyle}
						captionPosition="top"
						automatic={true}
						dots={true}
						pauseIconColor="white"
						pauseIconSize="40px"
						slideBackgroundColor="darkgrey"
						slideImageFit="cover"
						thumbnails={false}
						thumbnailWidth="100px"
						showNavBtn={false}
						style={{
							textAlign: 'center',
							maxWidth: '850px',
							maxHeight: '500px',
							margin: '40px auto',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Index;