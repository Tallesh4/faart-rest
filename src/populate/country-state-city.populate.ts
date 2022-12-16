import { City, Country, State } from "country-state-city";
import { ICity, ICountry } from "country-state-city/dist/lib/interface";
import { CityInterface } from "../core/city/city.interface";
import CityRepository from "../core/city/city.repository";
import { CountryInterface } from "../core/country/country.interface";
import CountryRepository from "../core/country/country.repository";
import { StateInterface } from "../core/state/state.interface";
import StateRepository from "../core/state/state.repository";

export default async function() {
	const countryRepository = new CountryRepository();
	const stateRepository = new StateRepository();
	const cityRepository = new CityRepository();

	const countryCode = process.env.COUNTRY_CODE || "US";

	const countries = [<ICountry>Country.getCountryByCode(countryCode)];
	const toStoreCountries: CountryInterface[] = [];

	for(let i = 0; i < countries.length; i++) {
		const country = countries[i];
		toStoreCountries.push({
			name: country.name,
			code: country.isoCode,
			phoneCode: country.phonecode,
			currency: country.currency,
			lat: country.latitude,
			long: country.longitude
		});
	}

	const storedCountries = <CountryInterface[]> await countryRepository.insertMany(toStoreCountries);

	console.log(storedCountries.length + " countries registered");

	const states = State.getStatesOfCountry(countryCode);
	const toStoreStates: StateInterface[] = [];
	
	for(let i = 0; i < states.length; i++) {
		const state = states[i];
		toStoreStates.push({
			name: state.name,
			code: state.isoCode,
			countryId: storedCountries.find(country => country?.code == state.countryCode)?.id,
			lat: <string | undefined> state.latitude,
			long: <string | undefined> state.longitude
		});
	}

	const storedStates = <StateInterface[]> await stateRepository.insertMany(toStoreStates);

	console.log(storedStates.length + " states registered");

	const cities = <ICity[]> City.getCitiesOfCountry(countryCode);
	const toStoreCities: CityInterface[] = [];
	
	for(let i = 0; i < cities.length; i++) {
		const city = cities[i];
		toStoreCities.push({
			name: city.name,
			code: city.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_"),
			stateId: storedStates.find(country => country?.code == city.stateCode)?.id,
			lat: <string | undefined> city.latitude,
			long: <string | undefined> city.longitude
		});
	}

	const storedCities = <CityInterface[]> await cityRepository.insertMany(toStoreCities);

	console.log(storedCities.length + " cities registered");
}