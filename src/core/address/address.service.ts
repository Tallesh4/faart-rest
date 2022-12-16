import BaseService from "../../base/base.service";
import axios from "axios";
import { AddressInterface } from "./address.interface";
import AddressRepository from "./address.repository";
import StateRepository from "../state/state.repository";
import CityRepository from "../city/city.repository";
import { ErrorResponse } from "../../base/utils/error.response.handler";
import { StateInterface } from "../state/state.interface";
import { CityInterface } from "../city/city.interface";
import { id } from "../../base/base.repository";
import CreateAddressValidator from "./validators/create.address.validator";
import UpdateAddressValidator from "./validators/update.address.validator";

export default class AddressService extends BaseService<AddressInterface> {
	stateRepository: StateRepository;
	cityRepository: CityRepository;
	constructor() {
		super(AddressRepository, CreateAddressValidator, UpdateAddressValidator);

		this.stateRepository = new StateRepository();
		this.cityRepository = new CityRepository();
	}

	async create(props: any) {
		const state = <StateInterface>await this.stateRepository.first({ code: props.state }).exec();

		if (state) {
			const city = <CityInterface>await this.cityRepository.first({ name: props.city, stateId: state.id }).exec();

			if (city) {
				const response = await axios.get(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.street},+${props.number},+${city.name},+${state.code}&key=${process.env.GOOGLE_MAPS_KEY}`));

				if (response.status == 200) {
					if (response.data && response.data.results && response.data.results.length) {
						const location = response.data.results[0].geometry.location;
						props = Object.assign(props, location);
					}
				}
				return super.create({
					number: props.number,
					complement: props.complement,
					street: props.street,
					zipCode: props.zipCode,
					cityId: city.id,
					lat: props.lat,
					lng: props.lng,
				});
			}
		}
		const cityOrStateNotFound = new ErrorResponse("city or state not found", 400);
		throw cityOrStateNotFound;
	}

	async updateById(id: string | id | undefined, props: any): Promise<AddressInterface | undefined> {
		const state = <StateInterface>await this.stateRepository.first({ code: new RegExp(props.state, "i") }).exec();
		if (state) {
			const city = <CityInterface>await this.cityRepository.first({ name: new RegExp(props.city, "i"), stateId: state.id }).exec();

			if (city) {
			
				const response = await axios.get(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.street},+${props.number},+${props.zipCode},+${city.name},+${state.code}&key=${process.env.GOOGLE_MAPS_KEY}`));

				if (response.status == 200) {
					if (response.data && response.data.results && response.data.results.length) {
						const location = response.data.results[0].geometry.location;
						/* console.table({
							street: props.street,
							number: props.number,
							city: city.name,
							state: state.code,
							zipCode: props.zipCode,
							locationLat: location.lat,
							locationLng: location.lng
						}) */
						props = Object.assign(props, location);
					}

				}

				return super.updateById(id, {
					number: props.number,
					complement: props.complement,
					street: props.street,
					zipCode: props.zipCode,
					cityId: city.id,
					lat: props.lat,
					lng: props.lng,
				});
			}
		}
		const cityOrStateNotFound = new ErrorResponse("city or state not found", 400);
		throw cityOrStateNotFound;
	}

	async searchAddressByZipCode(zipCode: string) {
		let state, city, street = "";

		// const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.GOOGLE_MAPS_KEY}`);
		const callback = await axios.get(`https://cdn.apicep.com/file/apicep/${zipCode}.json`);
		
		const response = callback.data

		if (response.status == 200) {
			if (response) {
				state = response.state

				city = response.city

				const streetComponent = response.address

				if (streetComponent) {
					street = response.address
				} else {
					street = "";
				}
			}
		}

		return {
			state, city, street
		};
	}
	getAddressComponentByType(components: any[], type: string) {
		for (const component of components) {
			if (component.types.includes(type)) {
				return component;
			}
		}

		return undefined;
	}
}