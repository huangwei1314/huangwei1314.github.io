var posts = ["/post/e714ea6d/", "/post/313abb0c/", "/post/1ce2907b/"];
function toRandomPost() {
    pjax.loadUrl("/" + posts[Math.floor(Math.random() * posts.length)])
}