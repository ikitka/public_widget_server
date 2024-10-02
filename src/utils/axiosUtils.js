const axios = require('axios');
const ProjectModel = require('../models/projectModel');

const refreshAccessToken = async (domain, clientId, clientSecret, refreshToken) => {
  const response = await axios.post(`https://${domain}/oauth2/access_token`, {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    redirect_uri: process.env.REDIRECT_URI + '/auth',
  });

  const { access_token, refresh_token } = response.data;
  await ProjectModel.update({ domain }, { $set: { access_token, refresh_token } });
  
  return access_token;
};


const requestWithTokenRefresh = async (domain, requestFn) => {
  const project = await ProjectModel.findOne({ domain });
  if (!project) {
    throw new Error('Project not found');
  }

  try {
    return await requestFn(project.access_token);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Токен истек, обновляем
      const newAccessToken = await refreshAccessToken(domain, project.client_id, project.client_secret, project.refresh_token);
      return await requestFn(newAccessToken);
    } else {
      throw error;
    }
  }
};

module.exports = {
  requestWithTokenRefresh,
};
