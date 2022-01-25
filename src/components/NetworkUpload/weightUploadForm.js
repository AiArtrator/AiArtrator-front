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
		<WeightUploadForm>
			<Dashboard
				uppy={uppy}
				plugins={['OneDrive', 'Dropbox', 'GoogleDrive', 'Url']}
				{...dashboardProps}
			/>
		</WeightUploadForm>
	);
};

export default Index;

const WeightUploadForm = styled.div`
	position: relative;
	width: fit-content;
	left: 50%;
	transform: translate(-50%, 0);
`;
