import bcrypt from 'bcryptjs';
import db from './index';

const password = bcrypt.hashSync('admin', 10);
const params = ['admin', 'admin@foodfast.com', password, 'Default address', 'admin'];
db.query('INSERT INTO users(name, email, password, address, roles) VALUES($1,$2,$3,$4,$5)', params, (err) => {
  if (err) {
    console.log(err);
  }
});
