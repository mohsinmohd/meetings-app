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
        mode : "cors",
        headers: new Headers({
            'Authorization': 'Bearer '+ window.localStorage.getItem('accessToken')
        })
    };
    fetch(signInUrl, other_params)
        .then((response) => {
            if (response.ok) {                
                response.text().then((data) => {
                    data = JSON.parse(data);
                    window.localStorage.setItem("accessToken", data.accessToken);
                    window.localStorage.setItem("refreshToken", data.refreshToken);
                    window.location.href = "http://localhost:3000" + redirectUrl;
                })
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
        mode : "cors",
        headers: new Headers({
            'Authorization': 'Bearer '+ window.localStorage.getItem('accessToken')
        })
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
        mode : "cors",
        headers: new Headers({
            'Authorization': 'Bearer '+ window.localStorage.getItem('accessToken')
        })
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

function logout() {
    var logoutUrl = "/logout";
    const other_params = {
        method : "DELETE",
        mode : "cors",
        headers: new Headers({
            'Authorization': 'Bearer '+ window.localStorage.getItem('accessToken')
        })
    };
    fetch(logoutUrl, other_params)
        .then((response) => {
            if (response.ok) {                
                //var x = data;
                window.location = "/";
                window.localStorage.removeItem("accessToken");
            } else {
                response.text().then((text) => {
                    alert(text);
                })
            }
        }).catch((error) => {
            alert(error.message);
        });
}

function isLoggedIn(){
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if(isLoggedIn != undefined && isLoggedIn == true) {
        return true;
    }
}