<?php

$list = [
   "1"=>[
       "id"=> 1,
       "name"=> "Steven Hawkins",
       "email"=> "steven@gmail.com",
       "phone"=> "050 525 44 55"
   ],
   "2"=>[
    "id"=> 2,
    "name"=> "Homer Simpson",
    "email"=> "simpson@gmail.com",
    "phone"=> "050 787 88 66"
],
"3"=>[
    "id"=> 3,
    "name"=> "Henry Miller",
    "email"=> "miller@gmail.com",
    "phone"=> "050 454 11 55"
    ]
];

$person = NULL;
if(!empty($_GET['id'])  && isset($list[$_GET['id']])){
    $person = $list[$_GET['id']];
}

if($person){
    $ret = [
        "success" => TRUE,
        "data" => $person
    ];
    
}
else{
    $ret = [
        "success"=> FALSE,
        "error"=> "can't find person"
    ];
}

echo json_encode($ret);


