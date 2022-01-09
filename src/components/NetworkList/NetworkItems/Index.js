import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';

const Index = ({ network }) => {
	const { title, description, imageUrls } = network;
	return (
		<div className="network-items-block">
			{imageUrls && (
				<div className="thumbnail">
					{/* <a>
						<a href={'api/post/list'} target="_blank" rel="noopener noreferrer"> */}
					<img src={imageUrls} alt="thumbnail" />
					{/* </a> */}
				</div>
			)}
			<div className="contents">
				<h2>
					{/* <a>
						<a href={'/api/post/list'} target="_blank" rel="noopener noreferrer"> */}
					{title}
					{/* </a> */}
				</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
