$(function(){

    function loadList(){
        // display onLoad the list of persons listed in the getList.php file
        // create the getList.php file
        // calling in the browser the getList.php file will display this result below:
        // [
        //     {"id":1,"name":"Steven Hawkins"},
        //     {"id":2,"name":"Homer Simpson"},
        //     {"id":3,"name":"Henry Miller"}
        // ]
        // ajax request call to display in the list div the list of persons

        $.ajax({
            url : 'getList.php',
            method : 'GET',
            dataType : 'json'
        }).done(function(r){
            $ul = $('#list ul');
            console.log(r);
            for(let i in r){
            $(`<li data-id =${r[i].id} >${r[i].name}</li>`).on('click',function(){
                showPerson($(this).data('id'))
            }).appendTo($ul);
            }
            $('#person').hide();
            $('#list').show();

        })
    }

    function showPerson(pid){
        console.log('id',pid);
    }

    

    



    loadList();




});