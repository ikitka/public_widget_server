const axios = require('axios');
const { requestWithTokenRefresh } = require('../utils/axiosUtils');

exports.getAccountInfo = async (req, res) => {
  
  const { domain } = req.query;

  try {
    const accountInfo = await requestWithTokenRefresh(domain, async (accessToken) => {
      
      const response = await axios.get(`https://${domain}/api/v4/account`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    });

    res.json(accountInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
