$(document).ready(function () {

    let skillDiv = $("#skillBank");

    let API = {

        getUsers: function () {
            return $.ajax({
                url: "api/users",
                type: "GET"
            });
        }

    };

    API.getUsers().then(function (userData) {
        let $users = userData.map(function (currentUser) {
            console.log(currentUser);
        })
    })

});



