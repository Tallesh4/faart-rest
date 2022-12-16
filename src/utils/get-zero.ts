export default function GetZero (value: number) {
	return value ? value < 10 ? `0${value}` : value : "00";
}