
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || ''; // Получаем заголовок авторизации
  const base64Credentials = authHeader.split(' ')[1] || '';
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [login, password] = credentials.split(':');

  // Проверяем логин и пароль с переменными окружения
  if (login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
    return next();
  }

  // Если не авторизован, запрашиваем логин и пароль
  res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
  return res.status(401).send('Authentication required.');
};