import React from 'react';
import { Dashboard, useUppy } from '@uppy/react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import GoogleDrive from '@uppy/google-drive';
import OneDrive from '@uppy/onedrive';
import Dropbox from '@uppy/dropbox';
import Url from '@uppy/url';
import GoldenRetriever from '@uppy/golden-retriever';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import styled from 'styled-components';
import { DEFAULT_WEIGHT_ENDPOINT } from '../../constants';

const Index = () => {
	const uppy = useUppy(() => {
		return new Uppy({
			debug: true,
			autoProceed: false,
			restrictions: {
				maxFileSize: 1024 * 1024 * 1024,
				maxNumberOfFiles: 1,
				minNumberOfFiles: 1,
			},
		})
			.use(GoogleDrive, {
				companionUrl: 'https://companion.uppy.io',
			})
			.use(Dropbox, {
				companionUrl: 'https://companion.uppy.io',
			})
			.use(OneDrive, {
				companionUrl: 'https://companion.uppy.io',
			})
			.use(Url, {
				companionUrl: 'https://companion.uppy.io',
			})
			.use(Tus, { endpoint: DEFAULT_WEIGHT_ENDPOINT })
			.use(GoldenRetriever);
	});

	const dashboardProps = {
		// trigger: '.UppyModalOpenerBtn',
		// inline: true,
		// target: '.DashboardContainer',
		showProgressDetails: true,
		note: 'Only one file, up to 1 GB',
		height: 330,
		metaFields: [{ id: 'name', name: 'Name', placeholder: 'file name' }],
		// browserBackButtonClose: false,
	};

	return (
		<>
			<WeightForm>
				<Dashboard
					uppy={uppy}
					plugins={['OneDrive', 'Dropbox', 'GoogleDrive', 'Url']}
					{...dashboardProps}
				/>
				{/* <button className="uploadButton"></button> */}
			</WeightForm>
		</>
	);
};

export default Index;

// const WeightUploadForm = styled.div`
// 	position: relative;
// 	width: fit-content;
// 	left: 50%;
// 	transform: translate(-50%, 0);
// `;
const WeightForm = styled.div`
	// position: relative;
	// display: grid;
	// grid-template-columns: 1fr 2fr;
	// grid-template-rows: 300px auto auto;
	// grid-gap: 10px 50px;
	// gap: 10px 50px;
	// width: -webkit-fill-available;
	// height: -webkit-fill-available;
	position: relative;
	width: fit-content;
	left: 50%;
	transform: translate(-50%, 0);
	padding: 3%;

	.weight-upload-form {
		position: relative;
		width: fit-content;
		left: 50%;
		transform: translate(-50%, 0);
	}

	.uploadButton {
		/* padding: 10px;
		border: 3px solid;
		align-self: center;
		cursor: pointer;
		height: max-content;
		width: 100%; */
		grid-column: 2 / 3;
		justify-self: end;
		width: 100px;
		right: 0;
		padding: 10px 0px;
		text-align: center;
		border-radius: 5px;
		background-color: rgba(166, 185, 241, 0.3);
		color: #24146c;
		cursor: pointer;
		user-select: none;
		font-size: 0.8rem;
		input[type='file'] {
			display: none;
		}
	}
	.uploadButton:hover {
		background-color: rgba(0, 0, 128, 1);
		color: #eaf0fb;
		margin-bottom: 0;
	}
`;
