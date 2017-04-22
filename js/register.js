/**
 * Created by Ahmed- on 3/23/2017.
 */
app.factory('Authentication',['$rootScope','$firebaseObject','$firebaseAuth','$location',function($rootScope,$firebaseObject,$firebaseAuth,$location) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser) {
        if(authUser) {
            var userRef = ref.child('users').child(authUser.uid),
                userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        }
    });
    return {
        login: function(user) {
            auth.$signInWithEmailAndPassword(
                user.email,user.password
            ).then(function(user) {
                $location.path('/success');
            }).catch(function(error){
                $rootScope.result = error.message;
            });
        },
        logout: function() {
            auth.$signOut().then(function () {
                $location.path('/');
                $rootScope.currentUser = null;
            });
        },
        requireAuth: function() {
            return auth.$requireSignIn();
        },
        register: function(user) {
            auth.$createUserWithEmailAndPassword(
                user.email,user.password
            ).then(function(regUser){
                var regRef = ref.child('users').child(regUser.uid).set({
                    date: firebase.database.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    username:user.username,
                    fullname:user.fullname,
                    email:user.email
                });
                $rootScope.result = 'Success';
                auth.$signInWithEmailAndPassword(user.email,user.password);
                $location.path('/success');
            }).catch(function(error){
                $rootScope.result = error.message;
            });
        }
    }
}]);