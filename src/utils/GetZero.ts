export default function GetZero (value: any) {
	return value ? value < 10 ? `0${value}` : value : "00";
}