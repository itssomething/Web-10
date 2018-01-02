var print = function (count, i){
    setTimeout(function(){
        console.log(i);
    }, 1000*(count - i));
}

var countDown = function(count){
    for (var i = count; i > 0; i--){
        print(count, i);
    }
}

countDown(6);

function functionScope() {
    var a = 5;
    if(1+1==2){
        console.log(a);//5
        var a = 6;
        console.log(a);//6
    }
    console.log(a);//5||6
}

functionScope()


function blockScope() {
    var a = 5;
    if(1+1==2){
        let a = 6;
        console.log(a);//6
    }
    console.log(a);//5||6
}

blockScope()
