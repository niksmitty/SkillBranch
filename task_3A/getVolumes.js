export default function getVolumes(hdds) {
	let res = {};

	hdds.forEach((elem) => {
		if (res[elem.volume]) {
			res[elem.volume] += elem.size;
		}
		else {
			res[elem.volume] = elem.size;
		}
	});
	
	Object.keys(res).forEach((elem) => {
		res[elem] += 'B';
	});

	return JSON.stringify(res);
}