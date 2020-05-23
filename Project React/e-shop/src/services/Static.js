const Static = {
    checkPermision: function (perm, block) {
        var user = JSON.parse(sessionStorage.getItem('user'));

        if (user !== null) {
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
    },
    checkForRoles: function () {
        var user = JSON.parse(sessionStorage.getItem('user'));

        if (user !== null) {
            var roles = user[0].roles;
            if (roles.length > 0)
                return true;
        }
    },
    getServerLink: function () {
        return 'http://localhost:57703/';
    },
    getUser: function () {
        if (JSON.parse(sessionStorage.getItem('user')) != null)
            return JSON.parse(sessionStorage.getItem('user'))[0];
        else
            return null;
    },
    setCookie: function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: function (name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    },
    setInputFilter: function (textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        });
    }
}


export default Static;