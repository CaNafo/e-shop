import Static from '../services/Static';

const SignUpServices = {
    redirectToIndex: function (response, history) {
        sessionStorage.setItem('user',JSON.stringify(response));

        if (Object.keys(response).length === 0){
            history.push('../');
            history.push('./components/SignUp');
        }
        else {
            sessionStorage.setItem('name', response[0].firstname);
            history.push('../IndexApp');
        } 
    }, 

    fetchItems : async (e, history,fname, lname, eMail, Pass) => {
        e.preventDefault();
        
        var link = Static.getServerLink()+'api/Registration';

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
                "FirstName": fname,
                "LastName": lname,
                "eMail": eMail,
                "password": Pass,
                
            })
        }).then(response => response.json())
            .then(
                console.log('registerd')
            );
    }
}

export default SignUpServices;


