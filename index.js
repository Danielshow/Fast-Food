import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api';
import userRoutes from './routes/user';

const app = express();

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// use routes folder
app.use('/api/v1', apiRoutes);
app.use('/api/v1', userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Listen on port');
});

export default app;
