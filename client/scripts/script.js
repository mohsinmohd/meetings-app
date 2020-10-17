function submitForm(formMethod, url)
{
    var inputElements = document.getElementById(formMethod + "Form").getElementsByTagName("input");
    if(formMethod == "signUp" && inputElements[2]['value'] != inputElements[3]['value']) {
        alert("Password and ConfirmPassword don't match");
    }
    var x = objectifyForm(inputElements);
    submitToApi(JSON.stringify(x), url)
}

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function submitToApi(data, url) {
    const other_params = {
        headers : { "content-type" : "application/json; charset=UTF-8" },
        body : data,
        method : "POST",
        mode : "cors"
    };

    fetch(url, other_params)
        .then(function(response) {
            if (response.ok) {
                
                alert(response.json());
            } else {
                response.text().then((text) => {
                    alert(text);
                })
            }
        }).then(function(data) {
            document.getElementById("message").innerHTML = data.encoded;
        }).catch(function(error) {
            document.getElementById("message").innerHTML = error.message;
        });
    return false;
}