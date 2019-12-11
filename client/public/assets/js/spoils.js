$("#postButton").on("click", function (event) {
    event.preventDefault();
    const newpost = $("#newpost").val();
    console.log(newpost);

    $.post("/api/thespoils", { content: newpost, MovieId: $("#newpost").data("id"), UserId: $("#newpost").data("user") }).then(function (results) {
        location.reload();
    });
});

$("#editform").hide();
$("#spoilsForm").hide();

$("#reply").on("click", function () {
    const button = $("#reply");
    const form = $("#spoilsForm");

    form.toggle("slow", function () {

    })
});

$(".edit").on("click", function (event) {
    event.preventDefault();
    $("#postButtonE").attr("data-postid", $(this).data("postid"))
    console.log($(this).data("postid"))
    $("#editform").show();
});

$("#postButtonE").on("click", function (event) {
    event.preventDefault();
    var data = {
        content: $("#editedpost").val()
    }
    var postId = $(this).attr("data-postid")
    console.log($(this).data("postid"))
    $.ajax({
        url: `/api/thespoils/${postId}`,
        type: 'PUT',
        data: data,
        success: function (result) {
            console.log($(`#post-${postId}`))
            $(`#post-${postId}`).text($("#editedpost").val());
            $("#editedpost").val("");
        }
    })
})

$(".delete").on("click", function (event) {
    event.preventDefault();
    var postId = $(this).attr("data-postid");
    $.ajax({
        url: `/api/thespoils/${postId}`,
        type: 'DELETE',
        success: function (result) {
            $(`#post-${postId}`).empty();
            location.reload();
        }
    })
})
