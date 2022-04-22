import React from 'react';
import { Carousel } from 'react-carousel-minimal';
// import CarouselCustomize from './carousel.js';
import JPG1 from '../../assets/carousel1.jpg';
import JPG2 from '../../assets/carousel2.jpeg';
import JPG3 from '../../assets/carousel3.jpeg';

const Index = () => {
	const data = [
		{
			image: JPG2,
			caption: `<div>
					  <br/>
					  <h1>Ai Artrator</h1>
					  <br/>
					  인공지능이 창조한 이미지를 
					  <br /><br />30초만에 받아보세요 !

					</div>`,
		},
		{
			image: JPG1,
			caption: `<div>
			<br/>
			<h1>Ai Artrator</h1>
			<br/>
			고성능 컴퓨터 없이, <br /><br />오직 스마트 폰만으로  
			<br /><br />인공지능 서비스를 경험해보세요 !
		

		  </div>`,
		},
		{
			image: JPG3,
			caption: `<div>
			<br/>
			<br/>
			<br/>
			<h2>Ai Artrator</h2>모델의 weight를 업로드하고 
			<br /><br />수익을 창출하세요 !
			

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
		<div className="App" style={{ height: '35rem' }}>
			<div style={{ textAlign: 'center' }}>
				<div
					style={{
						padding: '0',
					}}
				>
					<Carousel
						data={data}
						time={3000}
						width="100%"
						height="37rem"
						captionStyle={captionStyle}
						radius="0px"
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
							maxWidth: '100%',
							maxHeight: '35rem',
							margin: '0rem',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Index;
