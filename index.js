import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/orders';
import userRoutes from './routes/foodlist';

const app = express();
// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));
// use routes folder
app.use('/api/v1', apiRoutes);
app.use('/api/v1', userRoutes);

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
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Listen on port ${process.env.PORT || 3000}`);
});

export default app;
