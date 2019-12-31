function table(data, columns, tableContainerId){
    let table = document.createElement("table"); 
    table.classList.add('table')
    table.classList.add('mt-3')
    let tr = table.insertRow(-1);                   
    
    for (let column of columns) {
        let th = document.createElement("th");   
        th.innerHTML = column.name;
        tr.appendChild(th);
    }

    let width = columnsWidth(columns)
    
    for (let row of data) {
    
        tr = table.insertRow(-1);
    
        for (let column of columns) {
            let tabCell = tr.insertCell(-1);

            tabCell.style.width = column.width ? column.width + "%" : width + "%"

            let value = row[column.value]
            if (column.prepare){
                value = column.prepare(value)
            }
            tabCell.innerHTML = value;
        }
    }
    
    let divContainer = document.getElementById(tableContainerId);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function columnsWidth(columns){
    let alreadySet = 0
    let alreadySetCount = 0
    for (let column of columns){
        if (column.width){
            alreadySet += column.width
            alreadySetCount++
        }
    }

    return (100 - alreadySet) / (columns.length - alreadySetCount)
}