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
                showPerson($(this).data('id'));
            }).appendTo($ul);
            }
            $('#list').show();

        })
    }

    function showPerson(pid){
        //console.log('id',pid);
        //this function will make a request to the getPerson.php file
        //create getPerson.php file
        //we want to display the details of the person that has ID = pid
        //this ID is provided by the data-id of the <li>
        $.ajax({
            url:"getPerson.php",
            method: "GET",
            data:{id:pid},
            dataType: "json"

        }).done(function(r){
            console.log(r);
            $("#person h3").text(r.data.name);
            $("#person .email").text(r.data.email);
            $("#person .phone").text(r.data.phone);

            
            $("#list").hide();
            $("#person").show();

        });
    }

    

    



    loadList();




});