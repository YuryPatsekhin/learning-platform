const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";

let db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  db = client.db('learning-platform');
});

const user = Joi.object({
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  role: Joi.string().required(),
  theacher: Joi.string().allow(''),
});

const validateHandler = (request, h) => {
  const obj = JSON.parse(request.payload);
  const { error } = user.validate(obj);

  return new Promise((resolve, reject) => {
    try {
      if (error) {
        resolve(h.response(JSON.stringify({
          isValidForm: false,
          error: error.message
        })
        ).code(200));
      };
      db.collection('users').find({ login: obj.login }).toArray((err, result) => {
        if (result.length !== 0) {
          const error = 'user alredy exists';
          resolve(h.response(JSON.stringify({
            isValidForm: false,
            error
          })
          ).code(200));
        } else {
          resolve(h.response(JSON.stringify({
            isValidForm: true,
            error: ''
          })
          ).code(200));
        }
      });
    } catch (e) {
      const error = Boom.badRequest(e);
      reject(error);
    }
  });
};

const addPupilToTheacher = (pupil) => {
  console.log('pupil', pupil._id);
  try {
    const pupilInfo = {
      id: pupil._id,
      name: pupil.login,
    }
    db.collection('users').updateOne({ _id: ObjectId(pupil.theacher) }, { $push: { pupils: pupilInfo } });
  } catch (e) {
    throw new Error(e);
  }
}

const signupHandler = (request, h) => {
  const obj = JSON.parse(request.payload);

  return new Promise((resolve, reject) => {
    try {
      db.collection('users').insertOne(obj, (err, response) => {
        const user = response.ops[0];
        if (user.theacher) {
          const teacher = response.ops[0];
          teacher.pupils = [];
          addPupilToTheacher(teacher);
        }
        resolve(h.response(user).code(201));
      })
    } catch (e) {
      const error = Boom.badRequest(e);
      reject(error);
    }
  })
};

const loginHandler = (request, h) => {

  const obj = JSON.parse(request.payload);
  return new Promise((resolve, reject) => {
    try {
      db.collection('users').find(obj).toArray((err, result) => {
        if (result.length !== 0) {
          resolve(h.response(JSON.stringify({ user: result[0] })).code(200));
        } else {
          const error = 'user not found';
          resolve(h.response(JSON.stringify({ error })
          ).code(200));
        }
      })
    } catch (e) {
      const error = Boom.badRequest(e);
      reject(error);
    }
  })
}

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:8080']
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/validate',
    handler: (request, h) => validateHandler(request, h),
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: (request, h) => loginHandler(request, h),
  });

  server.route({
    method: 'POST',
    path: '/signup',
    handler: (request, h) => signupHandler(request, h),
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
