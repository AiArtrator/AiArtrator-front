/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import './network-items.scss';

import person from '../../../assets/person.png';
import defaultimg from '../../../assets/main.jpeg';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { deleteMyNetwork } from '../../../axios/Network';
import Loading from 'react-loading';

const Index = ({ network, onRemove }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

	const postIdUrl = '/NetworkDetail/';
	const accesstoken = useSelector((state) => state.user.accesstoken);
	const [networkData, setNetworkData] = useState({
		id: 0,
		thumbnail: defaultimg,
		title: 'loading',
		writer: 'loading',
		summary: 'loading',
		tagList: [],
	});

	useEffect(() => {
		setNetworkData({
			id: network.id,
			thumbnail: network.thumbnail,
			title: network.title,
			writer: network.writer,
			summary: network.summary,
			tagList: network.tagList,
		});
	}, []);

	const onNavigate = (e) => {
		if (e.target.id === 'detail') {
			navigate(postIdUrl + networkData.id);
		} else if (e.target.id === 'revise') {
			navigate('/NetworkUpload/' + network.id);
		}
	};

	const deleteModel = async () => {
		setLoading(true);
		const tmp = networkData.id;
		try {
			const res = await deleteMyNetwork(networkData.id, accesstoken);
			onRemove(tmp);
		} catch (err) {
			console.error(err);
			setLoading(true);
		}
		setLoading(false);
	};

	const removeConfirm = () => {
		if (window.confirm(t('del_alert'))) {
			deleteModel();
		}
	};

	if (loading) return <Loading />;

	return (
		<div style={{ width: '100%' }}>
			<div className="inrow">
				<div className="button" onClick={removeConfirm}>
					{t('delete')}
				</div>
				<div className="button" id="revise" onClick={onNavigate}>
					{t('revise')}
				</div>
			</div>

			<div className="items-block" id="detail" onClick={onNavigate}>
				<img src={networkData.thumbnail} alt="thumbnail" />

				<div className="contents">
					<h3>
						<a>{networkData.title}</a>
					</h3>

					<div className="writer">
						<img src={person} alt="profile" />
						<div className="writer-nickname">{networkData.writer.nickname}</div>
					</div>

					<p>{networkData.summary}</p>
					<div className="taglist">
						{networkData.tagList.map((tag) => (
							<div className="tag" tag={tag} key={tag.id}>
								{tag.name}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
	onRemove: PropTypes.func,
};

export default Index;
