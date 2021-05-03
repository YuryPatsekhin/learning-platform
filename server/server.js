const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const randomToken = require('random-token');
const dotenv = require('dotenv');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const { isSameSiteNoneCompatible } = require('should-send-same-site-none');
const { required } = require('@hapi/joi');

dotenv.config();

const connectUrl = process.env.NODE_ENV === 'development' ? "mongodb://localhost:27017" : process.env.CONNECTION_URL;

MongoClient.connect(connectUrl, { useUnifiedTopology: true }, (err, client) => {
  let db;

  db = client.db('learning-platform');
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

  const resumeSessionHandler = (request, h) => {
    const sessionToken = request.params.token;

    return new Promise((resolve, reject) => {
      try {
        if (sessionToken) {
          db.collection('users').find({ token: sessionToken }).toArray((err, result) => {
            if (result.length !== 0) {
              resolve(h.response(JSON.stringify({ user: result[0] })).code(200));
            }
          })
        } else {
          const error = 'user not found';
          resolve(h.response(JSON.stringify({ error })
          ).code(200));
        }
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

    return new Promise((resolve, reject) => {
      try {
        db.collection('users').find(user).toArray((err, result) => {
          if (result.length !== 0) {
            if (obj.rememberMe) {
              const token = randomToken(16);

              db.collection('users').updateOne(user, { $set: { token: token } }).then(obj => {
                if (obj.matchedCount > 0) {
                  resolve(h.response(JSON.stringify({ user: { ...result[0], token } })));
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
        resolve(h.response().code(200))
      }).catch(e => {
        const error = Boom.badRequest(e);
        reject(error);
      });
    });
  }

  const addLessonHandler = (request, h) => {
    const data = JSON.parse(request.payload);
    const user = data.pupil;
    const lesson = data.event;
    lesson.id = data.id;

    return new Promise((resolve, reject) => {
      try {
        db.collection('users').updateOne({ _id: ObjectId(user) }, { $push: { lessons: lesson } }).then(obj => {
          if (obj.modifiedCount === 1) {
            db.collection('users').find({ _id: ObjectId(user) }).toArray((err, result) => {
              if (result.length !== 0) {
                const lessons = result[0].lessons;
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

  const deleteLessonHandler = (request, h) => {
    const pupil = request.params.pupil;
    const lessonId = request.params.lessonId;

    return new Promise((resolve, reject) => {
      try {
        db.collection('users').update(
          { _id: ObjectId(pupil) },
          { $pull: { 'lessons': { id: lessonId } } }
        ).then(() => {
          resolve(h.response().code(200));
        });
      } catch (e) {
        const error = Boom.badRequest(e);
        reject(error);
      }
    })
  };

  const moveLessonHandler = (request, h) => {
    const { pupil, newDate, lessonId } = JSON.parse(request.payload);

    return new Promise((resolve, reject) => {
      try {
        db.collection('users').updateOne(
          {
            _id: ObjectId(pupil),
            "lessons.id": lessonId
          },
          { $set: { 'lessons.$.start': newDate } }
        ).then((e) => {
          resolve(h.response().code(200));
        })
      } catch (e) {
        const error = Boom.badRequest(e);
        resolve(error);
      }
    })
  };

  const addTopicHandler = (request, h) => {
    const { pupil, theme } = JSON.parse(request.payload);

    return new Promise((resolve, reject) => {
      try {
        db.collection('topics').find({ pupil }).toArray((err, result) => {
          if (result.length !== 0) {
            db.collection('topics').updateOne({ pupil }, { $push: { themes: theme } }).then(obj => {
              if (obj.matchedCount > 0) {
                resolve(h.response(JSON.stringify({ theme })).code(201));
              }
            });
          } else {
            const newUserTopics = {
              pupil,
              themes: [theme],
            };

            db.collection('topics').insertOne(newUserTopics, (err, response) => {
              if (response.ops.length !== 0) {
                resolve(h.response(JSON.stringify({ theme })).code(201));
              } else {
                const error = Boom.badRequest(e);
                reject(error);
              }
            })
          }
        })
      } catch (e) {
        const error = Boom.badRequest(e);
        resolve(error);
      }
    })
  };

  const getTopicsHandler = (request, h) => {
    const pupil = request.params.pupil;

    return new Promise((resolve, reject) => {
      try {
        db.collection('topics').find({ pupil }).toArray((err, result) => {
          if (result.length !== 0) {
            resolve(h.response(JSON.stringify({ themes: result[0].themes })).code(200));
          } else {
            resolve(h.response(JSON.stringify({
              message: 'topics not found'
            })
            ).code(200));
          }
        });
      } catch (e) {
        const error = Boom.badRequest(e);
        reject(error);
      }
    });
  }

  const addWordHandler = (request, h) => {
    const { pupil, theme, word, translate } = JSON.parse(request.payload);

    return new Promise((resolve, reject) => {
      try {
        db.collection('words').find({ pupil, theme }).toArray((err, result) => {
          if (result.length !== 0) {
            db.collection('words').updateOne({ pupil, theme }, { $push: { words: { word, translate } } }).then(obj => {
              if (obj.matchedCount > 0) {
                resolve(h.response(JSON.stringify({ words: [{ word, translate } ]})).code(201));
              }
            });
          } else {
            const newUserWords = {
              pupil,
              theme,
              words: [{ word, translate }],
            };
            db.collection('words').insertOne(newUserWords, (err, response) => {
              if (response.ops.length !== 0) {
                resolve(h.response(JSON.stringify({ words: [{ word, translate }] })).code(201));
              } else {
                const error = Boom.badRequest(e);
                reject(error);
              }
            })
          }
        })
      } catch (e) {
        const error = Boom.badRequest(e);
        reject(error);
      }
    })
  }

  const getWordsHandler = (request, h) => {
    const { pupil, theme } = request.params;

    return new Promise((resolve, reject) => {
      try {
        db.collection('words').find({ pupil, theme }).toArray((err, result) => {
          if (result.length !== 0) {
            resolve(h.response(JSON.stringify({ words: result[0].words })).code(200));
          } else {
            resolve(h.response(JSON.stringify({
              message: 'words not found'
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

  const deleteWordHandler =(request, h) => {
    const { pupil, theme, word } =  JSON.parse(request.payload);

    console.log(pupil, theme, word);

    return new Promise((resolve, reject) => {
      try {
        db.collection('words').update(
          { pupil, theme },
          { $pull: { 'words': { word: word.word, translate: word.translate } } }
        ).then(() => {
          resolve(h.response(JSON.stringify({ word: {word: word.word, translate: word.translate} })).code(200));
        });
      } catch (e) {
        const error = Boom.badRequest(e);
        reject(error);
      }
    });
  };

  const init = async () => {
    const server = Hapi.server({
      port: process.env.PORT || 3000,
      host: '0.0.0.0',
      routes: {
        cors: {
          origin: ['http://localhost', 'http://localhost:8080', 'https://learning-platform13.netlify.app'],
          credentials: true
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/test',
      handler: (request, h) => h.response(JSON.stringify({ test: 'test' }))
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

    server.route({
      method: 'GET',
      path: '/resumeSession/{token}',
      handler: (request, h) => resumeSessionHandler(request, h),
    })

    server.route({
      method: 'DELETE',
      path: '/deleteLesson/{pupil}/{lessonId}',
      handler: (request, h) => deleteLessonHandler(request, h),
    })

    server.route({
      method: 'POST',
      path: '/moveLesson',
      handler: (request, h) => moveLessonHandler(request, h),
    });

    server.route({
      method: 'POST',
      path: '/addTopic',
      handler: (request, h) => addTopicHandler(request, h),
    });

    server.route({
      method: 'POST',
      path: '/addWord',
      handler: (request, h) => addWordHandler(request, h),
    });

    server.route({
      method: 'GET',
      path: '/getTopics/{pupil}',
      handler: (request, h) => getTopicsHandler(request, h),
    });

    server.route({
      method: 'GET',
      path: '/getWords/{pupil}/{theme}',
      handler: (request, h) => getWordsHandler(request, h),
    });

    server.route({
      method: 'POST',
      path: '/deleteWord',
      handler: (request, h) => deleteWordHandler(request, h),
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
  };

  process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });

  init();
});
