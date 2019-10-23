$("#postButton").on("click", function (event) {
    event.preventDefault();
    const newpost = $("#newpost").val();
    console.log(newpost);

    $.post("/api/thespoils", {content: newpost, MovieId: $("#newpost").data("id"), UserId: $("#newpost").data("user")}).then(function (results){
        location.reload();
    });
});

$("#spoilsForm").hide();

$("#reply").on("click", function(){
    const button = $("#reply");
    const form = $("#spoilsForm");

    form.toggle("slow", function(){
      
    })
})