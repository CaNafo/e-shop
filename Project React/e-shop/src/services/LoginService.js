import Static from '../services/Static';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

            const data = await fetch(link);
            try{
                const temp = await data.json();
                LoginServices.setToken(temp);
                LoginServices.redirectToIndex(temp, history);
            }catch(e){
                Swal.fire({
                icon: 'error',
                title: 'Oops looks like token has expired...',
                text: 'Please please enter your password again!',
              }).then(()=>{                      
                window.location.reload();
              });
              localStorage.removeItem('pass');
            }
            
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


