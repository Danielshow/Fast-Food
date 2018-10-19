import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders';
import menuRoutes from './routes/menu';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

dotenv.config();
const app = express();
// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('Front End Template'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});
// use routes folder
app.use('/api/v1', orderRoutes);
app.use('/api/v1', menuRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

app.get('/api/v1', (req, res) => {
  res.status(200).send({
    product: 'Welcome to Food Fast API',
    message: '/api/v1 before every route',
  });
});
// custom 404 handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error.message,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server Listen on port ${process.env.PORT}`);
});

export default app;
