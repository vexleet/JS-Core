function monkeyPatcher(commandName) {
    let balance = this.upvotes - this.downvotes;
    let totalVotes = this.upvotes + this.downvotes;

    let command = {
        "upvote": () => this.upvotes++,
        "downvote": () => this.downvotes++,
        "score": () => {
            let upVotes = this.upvotes;
            let downVotes = this.downvotes;

            if (totalVotes > 50) {
                let valueToAdd = totalVotes > 50
                    ? Math.ceil(Math.max(upVotes, downVotes) * 0.25)
                    : 0;

                upVotes += valueToAdd;
                downVotes += valueToAdd;
            }

            return [upVotes, downVotes, balance, getRating.call(this)];

            function getRating() {
                if (totalVotes < 10) {
                    return 'new';
                }
                if (this.upvotes > (this.upvotes + this.downvotes) * 0.66) {
                    return 'hot';
                } else if (balance >= 0 && (this.upvotes > 100 || this.downvotes > 100)) {
                    return 'controversial';
                } else if (this.upvotes < this.downvotes) {
                    return "unpopular";
                } else {
                    return 'new';
                }
            }
        }
    }

    return command[commandName]();
}