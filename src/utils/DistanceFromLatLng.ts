function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

export default function GetDistanceFromLatLngInKm (userlat: number, userlong: number, clientLat: number, clientLong: number) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(clientLat - userlat);  // deg2rad below
	const dLon = deg2rad(clientLong - userlong);
	const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userlat)) * Math.cos(deg2rad(clientLat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;

    
}
