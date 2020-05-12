
const NavServices = {
        logout : function(history){
            sessionStorage.clear();
            history.push('../');
            window.location.reload();
        }
    }


export default NavServices;