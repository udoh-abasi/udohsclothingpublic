const GetStateByCountry = async (req, res) => {
  const { query } = req;
  const { countryCode } = query;

  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSCAPI-KEY": process.env.Country_State_City_API_KEY,
        },
        redirect: "follow",
      }
    );

    if (response.ok) {
      const data = await response.json();

      res.status(200).json({ data });
    } else {
      console.log(response.status);
      res.status(404).json({ message: "An error occured" });
    }
  } catch (e) {
    console.log(e);
  }
};

export default GetStateByCountry;
