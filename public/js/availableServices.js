// When the document is ready run the code inside this function
$(document).ready(function () {
    // this is a variable to hold all of the ajax methods in an object called API not sure why API is underlined in red... 
    let API = {
        // this function is an ajax request to get all the data from the given route
        getUsers: function () {
            return $.ajax({
                url: "api/users",
                type: "GET"
            });
        }

    };
    // This runs the getUsers function. Then after the user data has been retrieved we run a callback function in the form of a promise(.then()) that dynamically creates a new bootstrap "media-object" to display each user and the skill(s) they are offering in the time bank.
    API.getUsers().then(function (userData) {
        // creates a variable called allUsers and using the jquery .map() method (instead of a forloop) we are creating a new array with all of the user objects in it which we assign to the appropriate html elements using jquery.
        let allUsers = userData.map(function (currentUser) {

            console.log(currentUser);

            // variable that dynamically creates an html <p> tag and using .text() inserts the text found in the skill column of the userdb
            let skill = $(`<p>`)
                .text(`Skill: ${currentUser.skill}`);

            // fullName uses string interpolation to combine firstName and lastName columns of userdb for each user into a single variable.
            let fullName = `${currentUser.firstName} ${currentUser.lastName}`;

            // name renders the header html element of the bootstrap media-object and inserts the fullName variable for each user into the that element using .text(). 
            let name = $(`<h5 class="mt-0 mb-1">`)
                .text(`Name: ${fullName}`);

            // this follows the ame pattern as the two lines of code above but the appends the two previous variables to it.
            let mediaBody = $(`<div class="media-body">`)
                .append(name, skill);

            // .attr allows us to set a dynamic src attribute to the <img> tage specific to each user in the database.
            let mediaImage = $(`<img class="mr-3" id="userImage" alt="...">`)
                .attr({
                    src: currentUser.image
                });

            // here we append the users image and the media body which contains their unique name and skill to create the complete media-object 
            let mediaObject = $(`<li class="media" data-toggle="modal" data-target="#emailModal" data-whatever="user@mail">`)
                .append(mediaImage, mediaBody);

            // mediaContainer is the container for all of the media-objects so that we have a place to append them all after they are created
            let mediaContainer = $(`<ul class="list-unstyled" id="skillBank">`)
                .append(mediaObject);
            
            // media destination is necessary becuase we are using bootstrap rows and columns.  This allows us to control the size and position of the media container on the DOM.
            let mediaDestination = $(`#centerBody`)
                .append(mediaContainer);

        })
    })

});



