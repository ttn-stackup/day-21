(function () {
    angular.module("FilmApp")
        .controller("ListCtrl", ListCtrl)
        .controller("DetailCtrl", DetailCtrl)
        .controller("LoginCtrl", LoginCtrl);

    function ListCtrl(dbService, $stateParams, $scope) {
        var vm = this;

        $scope.$on("event:auth-loginRequired", function () {
            console.log("Login Required");
        });

        $scope.$on("event:auth-loginConfirmed", function () {
            console.log("Login Confirmed")
        });

        $scope.$on("event:auth-forbidden", function () {
            console.log("Forbidden");
        });

        dbService.list()
            .then(function (films) {
                vm.films = films;
            })
            .catch(function (err) {
                console.log("Some Error Occured", err);
            });
    }

    ListCtrl.$inject = ["dbService", "$stateParams", "$scope"];

    function DetailCtrl($stateParams, dbService) {
        var vm = this;

        dbService.detail($stateParams.filmId)
            .then(function (film) {
                vm.film = film;
            })
    }

    DetailCtrl.$inject = ["$stateParams", "dbService"];


    function LoginCtrl($http, authService){
        var vm = this;

        vm.login = function () {
            $http.post("/login", vm.user)
                .then(function () {
                    $state.go("list");
                    authService.loginConfirmed();
                });
        };

    }

    LoginCtrl.$inject = ["$http", "authService"];


}());