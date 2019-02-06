// When the document is ready run the code inside this function
$(document).ready(function () {
    // creating a vairable to reference the <ul> on line 42 in the available_services.html 
    let skillDiv = $("#skillBank");

    // this is a variable to hold all of the ajax methods in an object 
    let API = {
        // this function is an ajax request to get all the data from the given route
        getUsers: function () {
            return $.ajax({
                url: "api/users",
                type: "GET"
            });
        }

    };
    // This runs the getUsers function, after the user data has been retrieved... TODO:dynamically create a new media object to display each user and their skills
    API.getUsers().then(function (userData) {
        // create a variable called allUsers and using ,map() create a new array with all of the user objects in it and assign them to the appropriate html elements
        let allUsers = userData.map(function (currentUser) {

            console.log(currentUser);

            let skill = $(`<p>`)
                .text(currentUser.skill);

            let fullName = currentUser.firstName + ` ` + currentUser.lastName;

            let name = $(`<h5 class="mt-0 mb-1">`)
                .text(fullName);

            let mediaBody = $(`<div class="media-body">`)
                .append(name, skill);

            let mediaImage = $(`<img class="mr-3" id="userImage" alt="...">`)
                .attr({
                    src: currentUser.image
                });

            let mediaObject = $(`<li class="media" data-toggle="modal" data-target="#emailModal" data-whatever="user@mail">`)
                .append(mediaImage, mediaBody);

            let mediaContainer = $(`<ul class="list-unstyled" id="skillBank">`)
                .append(mediaObject);

            let mediaDestination = $(`#centerBody`)
                .append(mediaContainer);

        })
    })





});



