const axios = require('axios');
const fs = require('fs');
const ProjectModel = require('../models/projectModel');


const getClientSecret = (domain) => {
  if (process.env.MODE === 'prod') {
    return req.query.client_secret;
  } else {
    const secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf-8'));
    return secrets[domain]?.client_secret || null;
  }
};

exports.authenticate = async (req, res) => {
  
  const { code, referer: domain, client_id } = req.query;
  
  const client_secret = getClientSecret(domain);

  if (!code || !domain || !client_id || !client_secret) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    const response = await axios.post(`https://${domain}/oauth2/access_token`, {
      client_id,
      client_secret,
      code,
      redirect_uri: process.env.REDIRECT_URI + '/auth',
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token } = response.data;

    await ProjectModel.insert({ domain, access_token, refresh_token, client_id, client_secret });

    res.json({ message: 'Authentication successful', access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during token exchange' });
  }
};
