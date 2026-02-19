const express = require('express');

const app = express();

const userRouter = require('./routes/userRouter');

const adminRouter = require('./routes/adminRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');

const swaggerUi = require('swagger-ui-express');

const YAML = require('yamljs');

const userSwagger = YAML.load('./docs/swagger.user.yml');

const adminSwagger = YAML.load('./docs/swagger.admin.yml');

app.use(express.json());

app.use('/docs', swaggerUi.serveFiles(userSwagger), swaggerUi.setup(userSwagger, { explorer: true }));

app.use('/admin-docs', swaggerUi.serveFiles(adminSwagger), swaggerUi.setup(adminSwagger, { explorer: true }));

app.use(userRouter);

app.use(adminRouter);

app.use(errorMiddleware);

app.listen(3002, () => {
  console.log('Server is running on port http://localhost:3002');
});

module.exports = app;