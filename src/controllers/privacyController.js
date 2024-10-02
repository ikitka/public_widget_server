
exports.getPrivacy = async (req, res) => {
  try {
    res.render('privacy');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error showing privacy policy');
  }
};
