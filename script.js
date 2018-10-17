$(function () {

    var person = {};

    function loadList() {
        // display onLoad the list of persons listed in the getList.php file
        // create the getList.php file
        // calling in the browser the getList.php file will display this result below:
        // [
        //     {"id":1,"name":"Steven Hawkins"},
        //     {"id":2,"name":"Homer Simpson"},
        //     {"id":3,"name":"Henry Miller"}
        // ]
        // ajax request call to display in the list div the list of persons
         $('#spinner').show();
        $.ajax({
            url: 'getList.php',
            method: 'GET',
            dataType: 'json'
        }).done(function (r) {
            $ul = $('#list ul');
            console.log(r);
            for (let i in r) {
                $(`<li data-id =${r[i].id} >${r[i].name}</li>`).on('click', function () {
                    showPerson($(this).data('id'));
                }).appendTo($ul);
            }
            $('#spinner').hide();
            $('#list').show();
           

        })
    }

    function showPerson(pid) {
        //console.log('id',pid);
        //this function will make a request to the getPerson.php file
        //create getPerson.php file
        //we want to display the details of the person that has ID = pid
        //this ID is provided by the data-id of the <li>
        $('#list').hide();
        $('#spinner').show();
        $.ajax({
            url: "getPerson.php",
            method: "GET",
            data: {id: pid},
            dataType: "json"

        }).done(function (r) {
            console.log(r);
            if (!r.success) {
                notify(r.error , true);
                $('#spinner').hide();
                $('#list').show();
            } else {
                //display person details
                //alert(r.data.id)
                person = r.data;
                $("#person .name").text(r.data.name);
                $("#person .email").text(r.data.email);
                $("#person .phone").text(r.data.phone);
                //show filled form
                var es = document.forms.edit.elements;
                //console.log(es);
                es.name.value = r.data.name;
                es.email.value = r.data.email;
                es.phone.value = r.data.phone;
                $('#edit h3').text('Edit Person');
                $('#edit .delete').show();
                $('#spinner').hide();
                $("#person").show();
            }

        });
    }

    function savePerson(params){
        //this function will use the dummyPerson.php file
        //create dummyPerson.php file
        //calling this file will return an ID
        $('#edit').hide();
        $('#spinner').show();
        $.ajax({
            url : "dummyPerson.php",
            method : 'POST',
            data : params,
            dataType : 'json'
        }).done(function(r){
           
            //console.log(r.error)

            if(!r.success){
                notify(r.error,true);
                $('#spinner').hide();
                $('#list').show();
            }
            else{
                if(person.id){
                 notify(params.name + ' saved');
                 $('#person .name').text(params.name);
          $('#person .email').text(params.email);
          $('#person .phone').text(params.phone);
          $('#list li[data-id="'+person.id+'"]').text(params.name);
          $('#spinner').hide();
          $('#person').show();
                }
                else{
                    notify(params.name + ' created');
                    person.id = r.id;
                    person.email = params.email;
                    person.phone = params.phone;
                    person.name = params.name;
                    $('#person .name').text(params.name);
                    $('#person .email').text(params.email);
                    $('#person .phone').text(params.phone);
                    $('<li data-id="'+person.id+'">'+person.name+'</li>')
                    .on('click',function() {
                      showPerson($(this).data('id'));
                    }).appendTo($('#list ul'));
                    $('#spinner').hide();
                    $('#person').show();
                }
            }

        })

    
    }
    function deleteUser() {
        $('#edit').hide();
        $('#spinner').show();
        $.ajax({
          url: 'dummyPerson.php',
          method: 'GET',
          data: {id:person.id},
          dataType: 'json'
        }).done(function(r) {
          if(!r.success) {
            notify(r.error,true);
            $('#spinner').hide();
            $('#list').show();
          }
          else {
            notify(person.name + ' deleted');
            $('#list li[data-id="'+person.id+'"]').remove();
            $('#spinner').hide();
            $('#list').show();
          }
        });
    }

    function notify(str , isError){
        if(!str){
         $('#notify').hide();
        }
        else{
            $('#notify').html(str).removeClass().addClass(isError ? 'bg-danger':'bg-success').show();

        }
    }

    function validateForm(){
        var err = [];
        var params = null;
        var es = document.forms.edit.elements;
        if(es.name.value.trim()==''){
            err.push(name);
        }
        if(es.email.value.trim()==''){
            err.push(email);
        }
        if(es.phone.value.trim()==''){
            err.push(phone);
        }
        if(err.length){
            notify('All fields are required ! missing'+err.join(', '),true);
        }
    else{
        params = {
            name :  es.name.value.trim(),
            email : es.email.value.trim(),
            phone : es.phone.value.trim()
        }

        if(person.id){
            params.id = person.id;
        }
        savePerson(params);
    }

    }

   
    function addNewPerson(){
        person = {};
        var es = document.forms.edit.elements;
        es.name.value = '';
        es.email.value = '';
        es.phone.value = '';
        $('#edit h3').text('Add person');
        $('#edit .delete').hide();
        $('#list').hide();
        $('#edit').show();
    }

    $('#person .back').on('click', function () {
        $('#person').hide();
        $('#list').show();
       
    });

    

    $('#person .edit').on('click', function () {
        $('#person').hide();
        $('#edit').show();

    });
    $('#edit .back').on('click',function() {
        notify();
        $('#edit').hide();
        if(person.id) {
          $('#person').show();
        }
        else {
          $('#list').show();
        }
      });

    

    $('#edit .save').on('click', function () {
        validateForm();

    });

    $('#deleteConfirm .delete').on('click',function() {
        deleteUser();
      });

    $('#list .create').on('click',function(){
        addNewPerson();
    });

    loadList();
});