function sort(colIndex, descending) {
    let tables = $("tbody").children().toArray();

    if(colIndex === 0 && descending === false){
        tables.sort((a, b) => {
            return a.children[0].textContent.localeCompare(b.children[0].textContent);
        });
    }
    else if(colIndex === 0 && descending === true){
        tables.sort((a, b) => {
            return b.children[0].textContent.localeCompare(a.children[0].textContent);
        });
    }
    else if(colIndex === 1 && descending === false){
        tables.sort((a, b) => Number(a.children[1].textContent) - Number(b.children[1].textContent));
    }
    else if(colIndex === 1 && descending === true){
        tables.sort((a, b) => Number(b.children[1].textContent) - Number(a.children[1].textContent));
    }

    $("tbody").append(tables);
}