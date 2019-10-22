$("#postButton").on("click", function (event) {
    event.preventDefault();
    const newpost = $("#newpost").val();
    console.log(newpost);

    $.post("/api/thespoils", {content: newpost, MovieId: $("#newpost").data("id"), UserId: $("#newpost").data("user")}).then(function (results){
        location.reload();
    });
    // const username = $("#username").val().trim();
    // const password = $("#password").val().trim();
    // $.post("/api/users/register", {username: username, password: password}).then(function (results) {
    //     window.location.href = "/profile";
    // });
});