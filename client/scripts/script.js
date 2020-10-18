function submitForm(formMethod, url, redirectUrl)
{
    var inputElements = document.getElementById(formMethod + "Form").getElementsByTagName("input");
    if(formMethod == "signUp" && inputElements[2]['value'] != inputElements[3]['value']) {
        alert("Password and ConfirmPassword don't match");
    }
    var serializedObject = objectifyForm(inputElements);
    submitToApi(JSON.stringify(serializedObject), "POST", url, redirectUrl)
}

function signInForm(formMethod, url, redirectUrl)
{
    var inputElements = document.getElementById(formMethod + "Form").getElementsByTagName("input");
    var signInUrl = "/signIn?username=" + inputElements[0].value + "&password=" + inputElements[1].value;
    const other_params = {
        method : "GET",
        mode : "cors"
    };
    fetch(signInUrl, other_params)
        .then((response) => {
            if (response.ok) {                
                //var x = data;
                window.location = redirectUrl;
            } else {
                response.text().then((text) => {
                    alert(text);
                })
            }
        }).catch((error) => {
            alert(error.message);
        });
}

function editMeetingForm(formMethod, url, redirectUrl)
{
    var inputElements = document.getElementById(formMethod + "Form").getElementsByTagName("input");
    var serializedObject = objectifyForm(inputElements);
    submitToApi(JSON.stringify(serializedObject), "PUT", url, redirectUrl)
}

function deleteMeeting(meetingId, redirectUrl)
{
    var deleteMeetingUrl = "/meetings/" + meetingId;
    const other_params = {
        method : "DELETE",
        mode : "cors"
    };
    fetch(deleteMeetingUrl, other_params)
        .then((response) => {
            if (response.ok) {                
                //var x = data;
                window.location = redirectUrl;
            } else {
                response.text().then((text) => {
                    alert(text);
                })
            }
        }).catch((error) => {
            alert(error.message);
        });
}

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function submitToApi(data, method, url, redirectUrl) {
    const other_params = {
        headers : { "content-type" : "application/json; charset=UTF-8" },
        body : data,
        method : method,
        mode : "cors"
    };

    fetch(url, other_params)
        .then((response) => {
            if (response.ok) {                
                var x = data;
                window.location = redirectUrl;
            } else {
                response.text().then((text) => {
                    alert(text);
                })
            }
        }).catch((error) => {
            alert(error.message);
        });
}