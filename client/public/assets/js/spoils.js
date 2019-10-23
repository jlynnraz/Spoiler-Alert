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

$("#spoilsForm").hide();

$("#reply").on("click", function(){
    const button = $("#reply");
    const form = $("#spoilsForm");

    form.toggle("slow", function(){
      
    })
});

$("#edit").on("click", function(event){
    event.preventDefault();
    console.log($(this))
    var postId = $(this).data("postId")
    //get data-postId from the button corresponding to the specific post
    //ajax call to "/thespoils/postId"
    //in the .then() similar to devoured/not devoured
});

$("#delete").on("click", function(event){
    event.preventDefault();
    var postId = $(this).data("postId")
    $.ajax({
        url: '/thespoils/postId',
        type: 'DELETE',
        success: function(result){
            console.log(result)
        }
    })
})