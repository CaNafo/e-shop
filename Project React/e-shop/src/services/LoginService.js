import Static from '../services/Static';

const LoginServices = {
    redirectToIndex: function (response, history) {
        sessionStorage.setItem('user',JSON.stringify(response));

        if (Object.keys(response).length === 0){
            history.push('../');
            history.push('./components/Login');
        }
        else {
            sessionStorage.setItem('name', response[0].firstname);
            history.push('../IndexApp');
        }
    },
    setToken: function(token){
        let rememberMe = document.getElementById('customCheck1');
        if(rememberMe=!null && rememberMe.checked && token!=null){
            localStorage.setItem("pass", token[0].token);
        }
    },
    fetchItems : async (e, history, eMail, pass) => {
        e.preventDefault();

        if(localStorage.getItem('pass') != null && localStorage.getItem('pass')==pass){
            var link = Static.getServerLink()+'api/Validate?token='+pass+"&email="+eMail;

            await fetch(link).then(response => response.json())
                .then(
                    response => 
                    LoginServices.setToken(response) &
                    LoginServices.redirectToIndex(response,history)
                );
        }else{ 
            var link = Static.getServerLink()+'api/Login';

            await fetch(link, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:57703/',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    'Access-Control-Allow-Credentials': 'true',
                },
                body: JSON.stringify({
                    "eMail": eMail,
                    "password": pass
                })
            }).then(response => response.json())
                .then(
                    response => 
                    LoginServices.setToken(response) &
                    LoginServices.redirectToIndex(response,history)
                );
        }
        /**/
    }
}

export default LoginServices;


