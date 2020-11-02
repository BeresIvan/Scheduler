
//set moment to a variable
let now = moment();
//create a variable for the current date
let currentDate = now.format("dddd, MMMM Do");

// Set date 
$("#currentDay").text(currentDate);
    $(document).ready(function() {

        // For loop to get and display tasks from local storage
        hourArr = $('.hour').toArray();
        for (i = 0; i < hourArr.length; i++) {
            $(hourArr[i]).siblings('textarea').text(localStorage.getItem($(hourArr[i]).attr('data-time')));
        }
    });
    
    
    // For loop to print rows with timeblocks, taskblocks, savebuttons and hover buttons.
    for (i = 0; i < 9; i++) {
        //create a variable for the row
        let rowBlock = $('<div>').addClass('row');
        //create a variable for the time block
        let timeBlock = $('<div>').addClass('hour col-md-1').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
        timeBlock.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
        //create a variable for the taskblock
        let taskBlock = $('<textarea>').addClass('col-md-10');
        //create a variable for the save block
        let saveButton = $('<button>').addClass('saveBtn col-md-1 saveBtn i:hover').html('<i class="fas fa-save"></i>');
    
        // Placing content created above into the DOM in the right order.
        //append the container with the row
        $('.container').append(rowBlock);
        //append the row with the time block
        $(rowBlock).append(timeBlock);
        //after the timeblock display the task block
        $(timeBlock).after(taskBlock);
        //after the taskblock display the save button
        $(taskBlock).after(saveButton);
    
    
        // if else statement to determine the color of the row
        //if the time is the same as the time on the timeblock, display task block as red
        if (now.isSame(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(taskBlock).addClass('present');
            //if the time is in the future, display green
        } else if (now.isBefore(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(taskBlock).addClass('future');
            //if the time is in the past, display grey
        } else if (now.isAfter(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
            $(taskBlock).addClass('past');
        }
    }
    
    // Save click event to store the data in local storage.
    $('.saveBtn').on('click', function() {
    
        localStorage.setItem($(this).siblings('div.hour').attr('data-time'), $(this).siblings('textarea').val())
    });