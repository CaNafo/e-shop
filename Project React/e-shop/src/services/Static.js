const Static = {
    checkPermision: function (perm, block) {
        var user = JSON.parse(sessionStorage.getItem('user'));
        var roles = user[0].roles;

        for (var i = 0; i < roles.length; i++) {
            var perms = roles[i].permisions;
            for (var j = 0; j < perms.length; j++) {
                if (perm === perms[j].permissionName) {
                    return block;
                }
            }
        }

    }
}


export default Static;