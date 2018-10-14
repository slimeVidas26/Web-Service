$(function(){
function loadList(){
    //alert('loadList')
    //ajax request
    $ul = $('#list ul') ;
     $.ajax({
        
        url:'getList.php',
        // result:[
        //     {"id":1,"name":"Steven Hawking"},
        //     {"id":2,"name":"Homer Simpson"},
        //     {"id":3,"name":"Prince Ess"}
        //    ]
        method: 'GET',
        dataType:'json'
    }).done(function(r){
        console.log(r);
        // 0: {id: 1, name: "Steven Hawking"}
        // 1: {id: 2, name: "Homer Simpson"}
        // 2: {id: 3, name: "Prince Ess"}
        for(let i in r){
            $('<li>'+r[i].name+'</li>').appendTo($ul);
        }
    })
}

loadList();

});