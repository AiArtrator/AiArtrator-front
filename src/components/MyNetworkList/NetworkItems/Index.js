import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';
import person from '../../../assets/person.png';
import { useNavigate } from 'react-router-dom';
import { deleteMyNetwork } from '../../../axios/Network';
import { useSelector } from 'react-redux';

// Todo : 삭제완료시 리렌더링 (useState사용으로 수정)
const Index = ({ network }) => {
	const navigate = useNavigate();
	const { id, thumbnail, title, writer, summary, tagList } = network;
	const accesstoken = useSelector((state) => state.user.accesstoken);

	const toDetailPage = () => {
		let postIdUrl = '/NetworkDetail/';
		postIdUrl += id;
		navigate(postIdUrl);
	};

	const deleteModel = async () => {
		try {
			const res = await deleteMyNetwork(accesstoken, { postId: id });
			console.log(res.data.message);
		} catch (err) {
			console.error(err);
			alert('에러 입니다. ');

			console.log(err.response.data.message);
		}
	};

	return (
		<div style={{ width: '100%' }}>
			<div className="inrow">
				<div className="button" onClick={deleteModel}>
					삭제하기
				</div>
				<div className="button">수정하기</div>
			</div>

			<div className="items-block" onClick={toDetailPage}>
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
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
