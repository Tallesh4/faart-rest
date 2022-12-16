import { Request, Response } from "express";
import AddressService from "./address.service";

export const searchAddressByZipCode = async (req: Request, res: Response) => {
	const addressService = new AddressService();

	const { zipCode } = req.params;
	const address = await addressService.searchAddressByZipCode(zipCode);

	return res.send(address);
};