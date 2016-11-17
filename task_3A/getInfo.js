import Type from 'type-of-is';

export default function getInfo(pc, additUrl) {
	let res = pc;

	const elements = additUrl.split('/');

	elements.forEach((elem) => {
		if (elem !== '') {
			if (pc.hasOwnProperty(elem)) {
				if (elem == 'length' && (!Type.is(pc, Object))) {
					res = 'Not Found';
				}
				else {
					res = pc[elem];
					pc = pc[elem];	
				}
			}
			else {
				res = 'Not Found';
			}
		}
	});

	if (res == 'Not Found') {
		return res;
	}

	return JSON.stringify(res);
}