function bugTracker() {
    let obj = (() => {
       let container = [];
       let selector = undefined;
       let counter = 0;
       let report = function (author, description, reproducible, severity) {
           container[counter] = {
               ID: counter,
               author: author,
               description: description,
               reproducible: reproducible,
               severity: severity,
               status: "Open",
           };

           counter++;

           if(selector){
               show();
           }
       };

       let setStatus = function (id, newStatus) {
           container[id].status = newStatus;
           if(selector){
               show();
           }
       };

       let remove = function (id) {
           container = container.filter(x => x.ID !== id);
           if(selector){
               show();
           }
       };
       
       let sort = function (method) {
           switch (method) {
               case "author":
                   container = container.sort((a, b) => a.author.localeCompare(b.author));
                   break;
               case "severity":
                   container = container.sort((a, b) => a.severity - b.severity);
                   break;
               case "ID":
                   container = container.sort((a, b) => a.ID - b.ID);
                   break;
               default:
                   container = container.sort((a, b) => a.ID - b.ID);
                   break;
           }
           if(selector){
               show();
           }
       };

       let output = function (sel) {
           selector = sel;
       };

       let show = function () {
           $(selector).html("");
           for(let bug of container){
               $(selector).append($('<div>').attr('id', "report_" + bug.ID).addClass('report').append($('<div>').addClass('body').append($('<p>').text(bug.description))).append($('<div>').addClass('title').append($('<span>').addClass('author').text('Submitted by: ' + bug.author)).append($('<span>').addClass('status').text(bug.status + " | " + bug.severity))));
           }
       }
        return {report, setStatus, remove, sort, output};
    })();

    return obj;
}