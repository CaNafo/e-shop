
const NavServices = {
        logout : function(history){
            history.push('../');
            sessionStorage.clear();
            window.location.reload();
        }
    }


export default NavServices;