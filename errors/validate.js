const validatePhone = (phone) => /^(\+|\-)[0-9]{1,3}\s[0-9]{6,12}$/.test(phone);
const validateEmail = (email) =>
  /^[a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+$/.test(email.toLowerCase());
const validateUserName = (username) => /^[a-zA-Z0-9_-]{6,16}$/.test(username);

module.export = { validatePhone, validateEmail, validateUserName };
