function attachEvents() {
    const kinveyId = "kid_H14g_83C7";
    const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyId;
    const kinveyUsername = "peter";
    const kinveyPassword = "p";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = { "Authorization": "Basic " + base64auth };

    $("#btnLoadPosts").click(loadPostsClick);
    $("#btnViewPost").click(viewPostsClick);

    function loadPostsClick() {
        let loadPostRequest = {
            url: serviceUrl + "/posts",
            headers: authHeaders
        };

        $.ajax(loadPostRequest)
            .then(displayPosts)
            .catch(displayError);
    }

    function viewPostsClick(){
        let selectedPostId = $("#posts").val();

        if(!selectedPostId)
            return;

        let requestedPosts = $.ajax({
            url: serviceUrl + '/posts/' + selectedPostId,
            headers: authHeaders
        });

        let requestedComments = $.ajax({
            url: serviceUrl + `/comments/?query={"post_id":"${selectedPostId}"}`,
            headers: authHeaders
        });

        Promise.all([requestedPosts, requestedComments])
            .then(displayPostWithComments)
            .catch(displayError);
    }

    function displayPostWithComments([post, comments]){
        $("#post-title").text(post.title);
        $("#post-body").text(post.body);
        $("#post-comments").empty();

        for(let comment of comments){
            let commentItem = $("<li>").text(comment.text);

            $("#post-comments").append(commentItem);
        }
    }

    function displayPosts(posts) {
        $("#posts").empty();

        for(let post of posts){
            let option = $("<option>")
                .text(post.title)
                .val(post._id);

            $("#posts").append(option);
        }
    }
    
    function displayError() {
        let errorDiv = $("<div>").text(`Error: ${err.status} (${err.statusText})`);
        $(document.body).prepend(errorDiv);

        setTimeout(function () {
           $(errorDiv).fadeOut(function () {
              $(errorDiv).remove();
           });
        }, 3000);
    }
}