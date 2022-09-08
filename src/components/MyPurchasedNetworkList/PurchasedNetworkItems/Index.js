/* eslint-disable*/
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './network-items.scss';

import person from '../../../assets/person.png';

import RunModel from '../../RunNetwork/runNetwork';

import { useNavigate } from 'react-router-dom';
import { postNetworkSubscribe } from '../../../axios/Network';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Index = ({ network }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id, thumbnail, title, writer, summary, tagList } = network;
	const [isPopup, setIspopup] = useState(false);
	var postIdURL = '/NetworkDetail/';

	const onNavigate = (e) => {
		if (e.target.id === 'detail') {
			postIdURL += id;
			navigate(postIdURL);
		} else if (e.target.id === 'library') {
			navigate('/Library/' + id);
		}
	};

	const produceConfirm = () => {
		setIspopup(true);
	};

	return (
		<>
			{isPopup ? (
				<RunModel isPopup={isPopup} postId={id} setIspopup={setIspopup} />
			) : null}
			<div className="inrow">
				<div className="button" id="library" onClick={produceConfirm}>
					{t('imgLib')}
				</div>
				<div className="button" id="produce" onClick={onNavigate}>
					{t('run')}
				</div>
			</div>

			<div className="items-block" id="detail" onClick={onNavigate}>
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
				</div>
			</div>
		</>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
