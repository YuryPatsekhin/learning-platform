const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const randomToken = require('random-token');
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
  const user = JSON.parse(request.payload);
  return new Promise((resolve, reject) => {
    try {
      if (user.role === 'pupil') {
        user.lessons = [];
      }
      db.collection('users').insertOne(user, (err, response) => {
        if (response.ops.length !== 0) {
          if (user.role === 'pupil' && user.theacher) {
            addPupilToTheacher(user);
          }
          resolve(h.response(JSON.stringify(response.ops[0])).code(201));
        } else {
          const error = Boom.badRequest(e);
          reject(error);
        }
      })
    } catch (e) {
      const error = Boom.badRequest(e);
      reject(error);
    }
  })
};

const loginHandler = (request, h) => {
  const obj = JSON.parse(request.payload);
  const user = {
    login: obj.login,
    password: obj.password,
  };
  const sessionToken = request.state.session;

  return new Promise((resolve, reject) => {
    try {
      if (sessionToken) {
        db.collection('users').find({ token: sessionToken }).toArray((err, result) => {
          if (result.length !== 0) {
            resolve(h.response(JSON.stringify({ user: result[0] })).code(200));
          }
        })
      }
      db.collection('users').find(user).toArray((err, result) => {
        if (result.length !== 0) {
          if (obj.rememberMe) {
            const token = randomToken(16);

            db.collection('users').updateOne(user, { $set: { token: token } }).then(obj => {
              if (obj.matchedCount > 0) {
                resolve(h.response(JSON.stringify({ user: result[0] })).state('session', token));
              }
            });
          } else {
            resolve(h.response(JSON.stringify({ user: result[0] })).code(200));
          }
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

const logoutHandler = (request, h) => {
  const user = JSON.parse(request.payload);
  const userId = user._id;

  return new Promise((resolve, reject) => {

    db.collection('users').updateOne({ _id: ObjectId(userId) }, { $unset: { token: '' } }).then(obj => {
      if (obj.matchedCount > 0) {
        resolve(h.response().state('session', '').code(200));
      } else {
        resolve(h.response().code(200))
      }
    }).catch(e => {
      const error = Boom.badRequest(e);
      reject(error);
    });
  });
}

const addLessonHandler = (request, h) => {
  const data = JSON.parse(request.payload);
  const user = data.currentPupil;
  const lesson = data.event;

  return new Promise((resolve, reject) => {
    try {
      db.collection('users').updateOne({ _id: ObjectId(user) }, { $push: { lessons: lesson } }).then(obj => {
        if (obj.modifiedCount === 1) {
          db.collection('users').find({ _id: ObjectId(user) }).toArray((err, result) => {
            if (result.length !== 0) {
              const lessons = result[0].lessons;
              console.log(lessons)
              resolve(h.response(JSON.stringify({ lessons })).code(200));
            }
          })
        } else {
          throw new Error();
        }
      });
    } catch (e) {
      const error = Boom.badRequest(e);
      reject(error);
    }
  });
}


const getLessonsHandler = (request, h) => {
  const user = request.params.user;

  return new Promise((resolve, reject) => {
    try {
      db.collection('users').find({ _id: ObjectId(user) }).toArray((err, result) => {
        if (result.length !== 0) {
          const lessons = result[0].lessons
          if (lessons) {
            resolve(h.response(JSON.stringify({ lessons })).code(200));
          }
          resolve(h.response(JSON.stringify({ lesson: [] })).code(200));
        }
      })
    } catch (e) {
      const error = Boom.badRequest(e);
      reject(error);
    }
  });
}

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:8080'],
        credentials: true
      },
    },
  });

  server.state('session', {
    ttl: 1000 * 60 * 60 * 24 * 30, // month in milliseconds
    isSecure: false,
    isHttpOnly: false,
    encoding: 'base64json'
  })

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

  server.route({
    method: 'POST',
    path: '/logout',
    handler: (request, h) => logoutHandler(request, h),
  });

  server.route({
    method: 'POST',
    path: '/addLesson',
    handler: (request, h) => addLessonHandler(request, h),
  });

  server.route({
    method: 'GET',
    path: '/getLessons/{user}',
    handler: (request, h) => getLessonsHandler(request, h),
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
