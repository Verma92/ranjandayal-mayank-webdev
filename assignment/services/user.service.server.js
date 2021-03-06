/**
 * Created by mayank on 11/5/16.
 */
module.exports = function(app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var auth = authorized;
    var bcrypt = require("bcrypt-nodejs");
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : process.env.FB_CLIENT_ID_WAM,
        clientSecret : process.env.FB_CLIENT_SECRET_WAM,
        callbackURL  : process.env.FB_CALL_BACK_URL_WAM
    };

    app.post('/api/user', createUser);
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    // app.delete('/api/user/:uid', unregisterUser);
    app.get('/api/user', findUser);

    //authentication api
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post ('/api/loggedin', loggedin);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/profile',
            failureRedirect: '/assignment/#/login'
        }));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    /*
    * authentication api implementation
    * */

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    // function to check if the user is already logged in
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    // function executed after successful local strategy execution
    // return the user
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
        );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        console.log("username pass at localstrategy");
        console.log(username);
        console.log(password);
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        if (!user) {
                            return done(null, false);
                        }
                        return done(null, user);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    /*
    * end of authentication code
    * */

    function deleteUser(req, res)
    {
        /*var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.send(200);*/

        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateUser(req, res)
    {
        var user = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(user, uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        /*var user = req.body;
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users[u] = user;
            }
        }
        console.log(users);
        res.send(200);*/
    }

    function createUser(req, res) {
        var user = req.body;
       // user.password = bcrypt.hashSync(user.password);
        // user._id = (new Date()).getTime();
        // users.push(user);
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    /*function createUser(req, res)
    {
        console.log("createuser at server called");
        var user = req.body;
        console.log(user);
        //var userId;
/!*
        do {
            userId = getRandomInt(0, 1000).toString();
            if (findUserByIdLocal(userId) === null)
            {
                user._id = userId;
                users.push(user);
            }
        } while(1);*!/

        //user._id = 220;
        users.push(user);
        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    console.log("new user at user service from db");
                    console.log(newUser);
                    res.send(newUser);
                    return;
                },
                function (error) {
                    res.sendStatus(400).send(error);
                    return;
                }
            );

        res.send(user);
        return;
/!*
        if (user) {
            res.send(user);
            return;
        }
        else {
            res.send('0');
        }*!/
    }
*/
    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        /*var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');*/
        var username = req.query.username;
        var password = req.query.password;

        console.log(username);
        console.log(password);

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log(user);
                    if (user) {
                        res.json(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res)
    {
      /*  var userId = parseInt(req.params.uid);
        for(var u in users) {
            if(parseInt(users[u]._id) === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');*/
        var userId = req.params.uid;
        console.log("user id at finduser by id");
        console.log(userId);
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    //auxiliary functions

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function findUserIndexById(userId) {
        for(var i = 0; i < users.length; i++)
        {
            if( users[i]._id === userId)
                return i;
        }
        return -1;
    }

    function findUserByIdLocal(userId){
        for (var u in users) {
            user = users[u];
            if(parseInt(user._id) === userId) {
                return user;
            }
        }
        return null;
    }

}