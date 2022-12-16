
function compareNames(a: any, b: any, sort: boolean){
	if (!sort) {
		return (a > b) ? -1 : (a < b) ? 1 : 0;
	}
	return (a < b) ? -1 : (a > b) ? 1 : 0;
}

export default {
	increasing: function (list: any[], keyValue: string) {

		try {
			return list.sort((a: any, b: any,) => {
				return compareNames(a[keyValue], b[keyValue], true);
			});
			
		} catch (err) {
			console.log(err);
		}

		return [];
	},
	decreasing: function (list: any[], keyValue: string) {
		try {
			return list.sort((a: any, b: any,) => {
				return compareNames(a[keyValue], b[keyValue], false);
			});
		} catch (err) {
			console.log(err);
		}

		return [];
	}

};