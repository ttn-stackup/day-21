(function () {
    angular.module("FilmApp")
        .controller("ListCtrl", ListCtrl)
        .controller("DetailCtrl", DetailCtrl);

    function ListCtrl(dbService, $stateParams) {
        var vm = this;

        dbService.list()
            .then(function (films) {
                vm.films = films;
            })
            .catch(function (err) {
                console.log("Some Error Occured", err);
            });
    }

    ListCtrl.$inject = ["dbService"];

    function DetailCtrl($stateParams, dbService) {
        var vm = this;

        dbService.detail($stateParams.filmId)
            .then(function (film) {
                vm.film = film;
            })
    }

    DetailCtrl.$inject = ["$stateParams", "dbService"];
}());