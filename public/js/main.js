$(document).ready(function() {

    $.getJSON('http://localhost:8383/pages', function(data) {
        for (var i = 0; i<data.length; i++){
            $('#articleTable').append('<tr class="tableRow" data-id="' + data[i]._id + '"><td class="tableTitle">'+ data[i].title + '</td><td class="tableLink">'+ data[i].link + '</td></tr>');
        }
    });

    $(document).on('click', 'tr', function(){
        $('#notes').empty();
        var thisId = $(this).attr('data-id');
        

        $.ajax({
            method: "GET",
            url: "/pages/" + thisId,
        })
            .done(function( data ) {
                console.log(data);
                $('#notes').append('<h3>' + data.title + '</h3>');
                $('#notes').append('<input id="titleinput" name="title" placeholder="Title">');
                $('#notes').append('<textarea id="bodyinput" name="body" placeholder="Note"></textarea>');
                $('#notes').append('<a class="button" data-id="' + data._id + '" id="addNoteSubmit">Submit</a>');

                if(data.note){
                    $('#titleinput').val(data.note.title);
                    $('#bodyinput').val(data.note.body);
                }
            });
    });

    $(document).on('click', '#addNoteSubmit', function(){
        var thisId = $(this).attr('data-id');

        $.ajax({
            method: "POST",
            url: "/pages/" + thisId,
            data: {
                title: $('#titleinput').val(),
                body: $('#bodyinput').val()
            }
        })
            .done(function( data ) {
                console.log(data);
                $('#notes').empty();
            });


        $('#titleinput').val("");
        $('#bodyinput').val("");
    });
    
});

