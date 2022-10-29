const dateToText = (dateString: String): String => {
	const date = new Date(dateString);
	const mins = parseInt(((new Date() - date) / 1000 + 59) / 60, 10);
	if (mins < 60) return `updated ${mins} minutes ago`;
	const hours = parseInt((mins + 59) / 60, 10);
	if (hours < 24) return `updated ${hours} hours ago`;
	return `updated at ${date.getFullYear()}/${('0' + date.getMonth()).slice(
		-2
	)}/${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(
		-2
	)}:${('0' + date.getMinutes()).slice(-2)}`;
};

export default dateToText;
