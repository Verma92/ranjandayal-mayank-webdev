(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService)

    function UserService($http){

        var api = {
            findUsersByCredentials: findUserByCredentials,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            loggedin: loggedin,
            logout: logout,
            register: register
        };

        return api;

        function loggedin() {
            return $http.post("/api/loggedin");
        }

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

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            console.log(userId);
            var url = '/api/user/' + userId;
            console.log(url);
            return $http.get(url);
        }

        function findUserByUsername(username){

        }


        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user);
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