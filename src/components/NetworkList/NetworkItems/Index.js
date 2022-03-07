import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';
import person from '../../../assets/person.png';
const Index = ({ network }) => {
	const { thumbnail, title, writer, summary, tagList } = network;

	return (
		<div className="items-block">
			<img src={thumbnail} alt="thumbnail" />

			<div className="contents">
				<h3>
					<a>{title}</a>
				</h3>
				<div className="writer">
					<img src={person} alt="profile" />
					<div className="writer-nickname">{writer.nickname}</div>
				</div>

				<p>{summary}</p>
				<div className="taglist">
					{tagList.map((tag) => (
						<div className="tag" tag={tag} key={tag.id}>
							{tag.name}
						</div>
					))}
				</div>
				{/* <div className="tag">{tagList.name}</div> */}
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
