import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders';
import menuRoutes from './routes/menu';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();
// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  })
})
// use routes folder
app.use('/api/v1', orderRoutes);
app.use('/api/v1', menuRoutes);
app.use('/api/v1', authRoutes);

app.get('/', (req, res) => {
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
