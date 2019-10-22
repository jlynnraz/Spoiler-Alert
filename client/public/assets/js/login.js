$("#loginSubmit").on("click", function (event) {
    event.preventDefault();
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();
    $.post("/api/users/login", {username: username, password: password}).then(function (results) {
        window.location.href = "/profile";
    });
});