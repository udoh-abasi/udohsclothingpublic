const GetStateBandCity = async (req, res) => {
  const { countryCode, stateCode } = req.query;

  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
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
      res.status(404).json({ message: "An error occurred" });
    }
  } catch (e) {
    console.log(e);
  }
};

export default GetStateBandCity;
