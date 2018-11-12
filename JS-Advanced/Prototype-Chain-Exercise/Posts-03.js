function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}` +
                `\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let title = super.toString();
            let comments = "\nComments:";

            for (let comment of this.comments) {
                comments += `\n * ${comment}`;
            }

            let result = title +
                `\nRating: ${this.likes - this.dislikes}`;

            if(this.comments.length !== 0){
                result += comments;
            }

            return result;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views){
            super(title, content);
            this.views = views;
        }

        view(){
            this.views += 1;

            return this;
        }

        toString(){
            return super.toString() +
                `\nViews: ${this.views}`;
        }
    }

    return {Post, SocialMediaPost, BlogPost}
}

let classes = solve();

let test = new classes.BlogPost("TestTitle", "TestContent", 5);

test.view().view().view();

console.log(test.toString());