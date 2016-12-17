(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService)

    function UserService($http){

       /* var users =   [
                        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
                    ];*/

        var api = {
            findUsersByCredentials: findUserByCredentials,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register
        };

        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function findUserByCredentials(username, password){

            var url = '/api/user?username='+username+'&password='+password;
            return  $http.get(url);
        }

/*        function createUser(user)
        {
            var url = '/api/user';
            console.log(user);
            console.log("response from server service to cleint service");
            var response = $http.post(url, user);
            response.success(function (newuser) {
                console.log(newuser);
            });
            console.log(response);
            return response;
        }*/

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function findUserById(userId)
        {
            console.log(userId);
            var url = '/api/user/' + userId;
            console.log(url);
            return $http.get(url);
        }

           /* for (var u in users) {
                user = users[u];
                if(parseInt(user._id) === userId) {
                    return user;
                }
            }
            return null;
        */

        function findUserByUsername(username){

        }


        function updateUser(userId, user)
        {

            var url = '/api/user/' + userId;
            return $http.put(url, user);

            /*var userIndex = findUserIndexById(userId);
            if( userIndex === -1)
            {
                return null;
            }
            else
            {
                users[userIndex] = user;
                return users[userIndex];
            }*/
        }

        function deleteUser(userId){

        }

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

    }

})();