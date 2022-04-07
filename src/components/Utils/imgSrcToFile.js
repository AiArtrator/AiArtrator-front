const imgSrcToFile = async (_imgSrc, fileName) => {
	const res: Response = await fetch(_imgSrc);
	const blob: Blob = await res.blob();
	return new File([blob], fileName, { type: 'image/png' });
};

export default imgSrcToFile;
