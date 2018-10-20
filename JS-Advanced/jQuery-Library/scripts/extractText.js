function extractText() {
    let text = $("#items li").toArray().map(li => li.textContent).join(", ");

    $("#result").text(text);
}