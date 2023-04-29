import allClothes from "../../../../public/udohsClothingApi.json";

const GetDataRoute = (req, res) => {
  const { query } = req;

  const theData = allClothes[query.cloth];
  if (theData) {
    res.status(200).json({ theData });
  } else {
    res.status(401).json({ Message: "Not Found" });
  }
};

export default GetDataRoute;
