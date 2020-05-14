
const LoginServices = {
    redirectToIndex: function (response, history) {
        // console.log(response[0].firstName);
        if (Object.keys(response).length == 0){
            history.push('../');
            history.push('./components/Login');
        }
        else {
            sessionStorage.setItem('name', response[0].firstname);
            history.push('../IndexApp');
        }
    },

    fetchItems : async (e, history, eMail, pass) => {
        e.preventDefault();
        await fetch('http://localhost:57703/api/Login', {
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
                response => LoginServices.redirectToIndex(response,history)
            );
    }
}

export default LoginServices;


