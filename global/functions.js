const { sign } = require('jsonwebtoken');

const listen = (app) => {
  const server = app.listen(3000, '0.0.0.0');
  const io = require('socket.io')(server);
  io.on('connection', (socket) => socket.on('new-msg', (data) => socket.broadcast.emit('sendmsg', data)));
}

const schemaType = (min, max, errors) => { 
  return {
    type: String,
    required: [true, errors[0]],
    minlength: [min, errors[1]],
    maxlength: [max, errors[2]]
  };
}
const handleErrors = (err) => {
  let errors = { 
    auth: {
      username: '', nickname: '', password: ''
    },
    article: {
      title: '', body: '', slug: ''
    }
  };

  if (err.message == 'Incorrect username')
    errors.auth.username = 'That username is not registered';
  if (err.message == 'Incorrect password')
    errors.auth.password = 'Incorrect password entered';

  if (err.code == 11000) {
    errors.auth.username = 'That username is already registered';
    errors.article.slug = 'Please use a different slug, because this has already been used';
    return errors;
  }

  if (err.message.includes('user validation failed')) 
    Object.values(err.errors).forEach(({ properties }) => 
      errors.auth[properties.path] = properties.message);

  if (err.message.includes('article validation failed'))
    Object.values(err.errors).forEach(({ properties }) =>
      errors.article[properties.path] = properties.message);

  return errors;
}

const createToken = (id) => sign(
  { id }, 'mysecretcodethatisawsome', { expiresIn: 3 * 24 * 60 * 60 }
);
const authget = (res, rendering, title) => {
  if (res.locals.user) res.redirect('/');
  res.render(rendering, { title });
}

const toDate = (date) => `${date.toDateString().substr(4)} ${date.toTimeString().substring(0, 8)}`;

module.exports = { 
  listen, 
  schemaType, handleErrors, 
  createToken, authget, 
  toDate
};