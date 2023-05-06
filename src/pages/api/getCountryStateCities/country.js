const GetCountry = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          "X-CSCAPI-KEY": process.env.Country_State_City_API_KEY,
        },
        redirect: "follow",
      }
    );

    if (response.ok) {
      const data = await response.json();

      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "An error occured" });
    }
  } catch (e) {
    console.log(e);
  }
};

export default GetCountry;
