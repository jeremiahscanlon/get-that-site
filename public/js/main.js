$(document).ready(function() {
    
    $('#searchName').click(function(){
        var currentURL = window.location.origin;
        var name = $('#searchNameText').val().trim();
        $.post( currentURL + "/api/animals", newInvoice)
            .done(function(response){
                console.log(response);
                window.location.href = '/invoices';
            });
        return false;
    });

    $('#sortWeight').click(function(){
        var currentURL = window.location.origin;
        $.post( currentURL + "/api/animals", newInvoice)
            .done(function(response){
                console.log(response);
                window.location.href = '/invoices';
            });
        return false;
    });
    
}


