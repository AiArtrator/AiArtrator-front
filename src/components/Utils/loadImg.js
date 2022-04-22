import imageCompression from 'browser-image-compression';

const loadImg = async (_imgFile, setImgSrc) => {
	try {
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64 = reader.result;
			if (base64) {
				if (setImgSrc) setImgSrc(base64.toString());
			}
		};
		if (_imgFile) {
			const imgFile = await imageCompression(_imgFile, {
				maxSizeMB: 0.5,
				maxWidthOrHeight: 1180,
				useWebWorker: true,
			});
			reader.readAsDataURL(imgFile);
		}
	} catch (err) {
		console.error(err);
	}
};

export default loadImg;
