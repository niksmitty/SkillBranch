export default function canonize(url) {
	const re = new RegExp('@?(https?:)?(\/\/)?(([0-9a-zA-Z]*)[^\/]*\/)?@?([0-9a-zA-Z._]*)', 'i');
	const username = url.match(re)[5];
	return '@' + username;
}