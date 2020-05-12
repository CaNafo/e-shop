
const NavServices = {
        logout : function(history){
            sessionStorage.clear();
            history.push('../components/Login');
        }
    }


export default NavServices;