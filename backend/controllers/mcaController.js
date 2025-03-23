import axios from "axios";

export const getCompanyDetails = async (req, res) => {
  const { cin } = req.params;

  try {
    const response = await axios.get(`https://api.mca.gov.in/company/${cin}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching company details" });
  }
};
