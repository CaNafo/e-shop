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

    fetchItems : async (e, history, eMail, pass) => {
        e.preventDefault();
        
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
                response => LoginServices.redirectToIndex(response,history) 
            );
    }
}

export default LoginServices;


