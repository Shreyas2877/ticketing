import express from 'express';
import bodyParser from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { userSignupRoute } from './routes/signup';
import { userSigninRouter } from './routes/signin';
import { userSignoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(userSignupRoute);
app.use(userSigninRouter);
app.use(userSignoutRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});
