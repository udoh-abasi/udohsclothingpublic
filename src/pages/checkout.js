import { useEffect, useRef, useState } from "react";
import Select from "react-select";

export const CheckOutPage = () => {
  // Set the state, city and country values
  const [countryValue, setCountryValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  // Use this to set up when the options are loading from the server
  const [countryIsLoading, setCountryIsLoading] = useState(false);
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const [cityIsLoading, setCityIsLoading] = useState(false);

  // These are the country codes we will send as query parameters to the backend
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  // These are the states where the results from the fetch() will be stored
  const [cities, setCities] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);

  // Set up the options to be used in the 'Select'
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // Set up the URL where requests will be sent to
  const getCountryURL = "/api/getCountryStateCities/country";
  const getStateURL = `/api/getCountryStateCities/getStateByCountry/${countryCode}`;
  const getCityURL = `/api/getCountryStateCities/getCityByStateandCountry/stateAndCityEndpoint?countryCode=${countryCode}&stateCode=${stateCode}`;

  // This is the fetch() function, we will use to send all three requests (for country, state and city)
  const fetchData = async (theURL, onSetState, onSetIsLoading) => {
    onSetIsLoading(true);
    try {
      const response = await fetch(theURL);
      if (response.ok) {
        const data = await response.json();

        onSetState(data.data);
        onSetIsLoading(false);
      } else {
        onSetIsLoading(false);
        console.log("There was an error");
      }
    } catch (error) {
      onSetIsLoading(false);
      console.log(error);
    }
  };

  // On first load, this will run, and send a request to get all the countries in the world, and populate the select field
  useEffect(() => {
    fetchData(getCountryURL, setCountry, setCountryIsLoading);
  }, []);

  // When we get the country data, these useEffect will run and populate the <options> of the country's <Select />
  useEffect(() => {
    const thecountryOption = country.map((eachCountry) => ({
      value: eachCountry.iso2,
      label: eachCountry.name,
    }));

    setCountryOptions(thecountryOption); // Set the country options to be used in the Country's select
  }, [country]);

  // Send the state Request
  useEffect(() => {
    // Since this useEffect will run on first load, we want to make sure that it is only when we have a country code that it will send the request
    if (countryCode) {
      fetchData(getStateURL, setState, setStateIsLoading);
    }
  }, [getStateURL, countryCode]);

  // When a country is selected in the dropdown, run this function to populate the state's select field
  useEffect(() => {
    const onChangeCountry = () => {
      setStateValue(null);
      setCityValue(null);
      const theStateOption = state.map((eachState) => ({
        value: eachState.iso2,
        label: eachState.name,
      }));

      setStateOptions(theStateOption);
    };

    if (countryCode && state !== []) {
      onChangeCountry();
    }
  }, [countryCode, state]);

  // Send the Cities Request
  useEffect(() => {
    if (stateCode) {
      fetchData(getCityURL, setCities, setCityIsLoading);
    }
  }, [getCityURL, stateCode]);

  // When a State is selected in the dropdown, run this function to populate the cities dropdown
  useEffect(() => {
    const onChangeState = () => {
      setCityValue(null); // This clears the city's select field
      const theCityOption = cities.map((eachCity) => ({
        value: eachCity.id,
        label: eachCity.name,
      }));

      setCityOptions(theCityOption);
    };

    if (stateCode && cities !== []) {
      onChangeState();
    }
  }, [stateCode, cities]);

  return (
    <>
      <form>
        <div className="dark:text-black">
          <Select
            id="selectboxForCountry" // This was added to get rid of the error that says 'Prop `id` did not match'
            instanceId="selectboxForCountry" // This also was added to get rid of the error that says 'Prop `id` did not match'
            options={countryOptions}
            required
            isSearchable
            value={countryValue}
            onChange={(value) => {
              setCountryCode(value.value);
              setCountryValue(value.name);
            }}
            placeholder="Select Country..."
            isLoading={countryIsLoading}
            loadingMessage={() => "Loading..."}
          />
        </div>

        <div className="dark:text-black">
          <Select
            id="selectboxForState"
            instanceId="selectboxForState"
            options={stateOptions}
            required
            isSearchable
            value={stateValue}
            onChange={(value) => {
              setStateCode(value.value);
              setStateValue(value.name);
            }}
            placeholder="Select State..."
            isDisabled={!countryCode}
            isLoading={stateIsLoading}
            loadingMessage={() => "Loading..."}
          />
        </div>

        <div className="dark:text-black">
          <Select
            id="selectboxForCities"
            instanceId="selectboxForCities"
            options={cityOptions}
            required
            isSearchable
            value={cityValue}
            onChange={(value) => {
              console.log(value);
              setCityValue(value.name);
            }}
            placeholder="Select City..."
            isDisabled={!stateCode}
            isLoading={cityIsLoading}
            loadingMessage={() => "Loading..."}
          />
        </div>

        <input type="radio" id="checkoutOption1" name="checkoutOption" />
        <label htmlFor="checkoutOption1">
          Login to Checkout. (This is faster)
        </label>

        <input
          type="radio"
          id="checkoutOption2"
          name="checkoutOption"
          defaultChecked
        />
        <label htmlFor="checkoutOption2">Checkout as guest</label>
      </form>

      <section>
        <h3>CheckOut as Guest</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" id="guestEmail" required placeholder=" " />
          <label htmlFor="guestEmail">Email Address</label>

          <label htmlFor="keepMeUpToDate">
            Keep me up to date on new and exciting offers
          </label>
          <input type="checkbox" id="keepMeUpToDate" required defaultChecked />

          <button type="submit">Verify Email</button>
        </form>

        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" id="verifiCationCode" required placeholder=" " />
          <label htmlFor="verifiCationCode">
            Enter the six (6) digit Verification code sent
          </label>

          <button type="submit">Verify Email</button>
        </form>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            id="guestSignupEmail"
            required
            placeholder=" "
            disabled
          />
          <label htmlFor="guestSignupEmail">Email Address</label>

          <input type="text" id="yourName" required placeholder=" " />
          <label htmlFor="yourName">Your Name</label>

          <input type="text" id="streetAddress" required placeholder=" " />
          <label htmlFor="streetAddress">Street Address</label>

          <input type="text" id="phoneNumber" required placeholder=" " />
          <label htmlFor="phoneNumber">Phone Number</label>
        </form>
      </section>
    </>
  );
};

export default CheckOutPage;
