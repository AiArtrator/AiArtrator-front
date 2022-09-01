import PropTypes from 'prop-types';
import React from 'react';
import './purchased-network-items.scss';

const Index = ({ network }) => {
	const { thumbnail, title, summary } = network;

	return (
		<div className="own-items-block">
			<div className="thumbnail">
				<a>
					{/* <a href={thumbnail} target="_blank" rel="noopener noreferrer" /> */}
					<img src={thumbnail} alt="thumbnail" />
				</a>
			</div>

			<div className="contents">
				<h3>
					<a>
						{/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
						{title}
					</a>
				</h3>
				<p>{summary}</p>
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
