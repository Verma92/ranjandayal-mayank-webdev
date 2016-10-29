(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService)

    function UserService(){

        var users =   [
                        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
                    ];

        var api = {
            findUsersByCredentials: findUserByCredentials,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user){
            var userId;
            do {
                userId = getRandomInt(0, 1000).toString();
                if (findUserById(userId) === null)
                {
                    user._id = userId;
                    users.push(user);
                    for(i = 0; i < users.length; i++)
                        console.log(users[i]);
                    return user;
                }
            } while(1);
        }

        function findUserById(userId){
            for (var u in users) {
                user = users[u];
                if(parseInt(user._id) === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username){

        }

        function findUserByCredentials(username, password){
            for (var u in users) {
                user = users[u];
                if(user.username === username && user.password === password){
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user){
            var userIndex = findUserIndexById(userId);
            if( userIndex === -1)
            {
                return null;
            }
            else
            {
                users[userIndex] = user;
                return users[userIndex];
            }
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