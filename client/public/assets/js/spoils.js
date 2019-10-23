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

$("#editform").hide();
$("#spoilsForm").hide();

$("#reply").on("click", function(){
    const button = $("#reply");
    const form = $("#spoilsForm");

    form.toggle("slow", function(){
      
    })
});

$(".edit").on("click", function(event){
    event.preventDefault();
    $("#postButtonE").attr("data-postId", $(this).data("postId"))
    console.log($(this).data("postId"))
    $("#editform").show();
});

$("#postButtonE").on("click", function(event){
    event.preventDefault();
    var postId = $(this).data("postId")
    $.ajax({
        url: `/api/thespoils/${postId}`,
        type: 'PUT',
        success: function(result){
            console.log($(`#post-${postId}`))
            $(`#post-${postId}`).text($("#editedpost").val());
        }
    })
})

$(".delete").on("click", function(event){
    event.preventDefault();
    var postId = $(this).data("postId")
    $.ajax({
        url: '/api/thespoils/postId',
        type: 'DELETE',
        success: function(result){
            console.log(result)
        }
    })
})