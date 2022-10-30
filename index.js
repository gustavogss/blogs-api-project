const express = require('express');
const bodyParser = require('body-parser');

const userRouters = require('./routes/userRouter');
const loginRouters = require('./routes/loginRouter');
const categorieRouters = require('./routes/categorieRouter');
const postRouters = require('./routes/postRouter');

const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/user', userRouters);
app.use('/login', loginRouters);
app.use('/categories', categorieRouters);
app.use('/post', postRouters);
app.use(errorMiddleware);
