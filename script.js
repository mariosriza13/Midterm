
    $(document).ready(function() {
      //retrieve datalist from local storage
        var dataList = JSON.parse(localStorage.getItem('dataList')) || [];
        var dataTable = $('#data-table tbody');
    
        // Function to add data to the list and table
        function addData(data1, data2) {
          //new data with properties
            var data = { data1: data1, data2: data2 };
            // add data to array
            dataList.push(data);
    
            // Save the data to localStorage
            localStorage.setItem('dataList', JSON.stringify(dataList));
    
            updateTable();
        }
    
        // Function to update the table
        function updateTable() {
            dataTable.empty();
    // for empty table create new row with the appropriate data
            dataList.forEach(function(data, index) {
                var row = $('<tr>');
                $('<th>').text(index + 1).appendTo(row);
                $('<td>').text(data.data1).appendTo(row);
                $('<td>').text(data.data2).appendTo(row);
                //delete button
                var deleteButton = $('<button>').addClass('btn btn-danger').text('Delete');
                $('<td>').append(deleteButton).appendTo(row);
                dataTable.append(row);
    //delete button function
                deleteButton.click(function() {
                    dataList.splice(index, 1);
                    localStorage.setItem('dataList', JSON.stringify(dataList));
                    row.remove();
                });
            });
        }
    
        // Call updateTable on page load
        updateTable();
    
    

    // Handle form submission
    $('#data-form').submit(function(e) {
        e.preventDefault();
        //get data and add to the array list
        var data1 = $('#data1').val();
        var data2 = $('#data2').val();
        addData(data1, data2);
        this.reset();
    });
    });

$(document).ready(function() {
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        // get data of user and show the aert
        var name = $('#userName').val();
        var email = $('#userEmail').val();
        var phone = $('#userPhone').val();
        var message = $('#userMessage').val();
        alert('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nMessage: ' + message);
        // Clear the form fields
        $('#contactForm')[0].reset();
    });
});
// sorting function
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("data-table");
    //loop for table rowe
    switching = true;
    //Ascending sorting direction
    dir = "asc"; 
    while (switching) {
      switching = false;
      rows = table.rows;
      // loop through all rows and compare
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      //makes the switch
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;      
      } else {
        //if the direction is ok do the oposite
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
 