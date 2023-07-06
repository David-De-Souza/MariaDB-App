getData();

async function getData() {
    const response = await fetch("/api/user-data");
    const data = await response.json();
    console.log(data);
    
    data.forEach(row => {
        AddRow(row);
    });
}

function AddRow(data_entry) {
    var tbody = document.getElementById("table-body");
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");

    col1.textContent = data_entry.username;
    col2.textContent = data_entry.mobile;
    col3.textContent = data_entry.email;

    row.append(col1, col2, col3);
    tbody.append(row);
}