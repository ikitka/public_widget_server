const ProjectModel = require('../models/projectModel');

exports.showAdminPage = async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    
    res.render('admin', { projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving projects');
  }
};

exports.disconnectProject = async (req, res) => {
  const { client_uuid } = req.query;
  
  if (!client_uuid) {
    return res.status(400).send('client_uuid is required');
  }

  try {
    const numRemoved = await ProjectModel.remove({ client_id: client_uuid });
    
    if (numRemoved > 0) {
      res.status(200).send('Project disconnected successfully');
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error disconnecting project');
  }
};
