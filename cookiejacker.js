/*
Works in FF
Works in Opera
Impossible due to bug in Chrome (https://bugs.webkit.org/show_bug.cgi?id=49739)
May be possible in IE with enough fiddling
*/

cookiejacker = (function() {
    
    my = {
        cookiesJacked: false,
        
        nativeGet: null,
        nativeSet: null,
        customGet: function() {
            return cookiejacker.getCookie.apply(this, arguments);
        },
        customSet: function(str) {
            return cookiejacker.setCookie.apply(this, arguments);
        },
        getterShim: function() {
            /*return (customGet && typeof customGet === "function") ? customGet() : null;*/
            return cookiejacker.customGet.apply(this, arguments);    // my.
        },
        setterShim: function(cookiestr) {
            /*return (customSet && typeof customSet === "function") ? customSet(cookiestr) : null;*/
            return cookiejacker.customSet.apply(this, arguments); // my.
        },
        
        init: function() {
            
            if(this.cookiesJacked) {
                return false;
            }
            
            /* Firefox */
            if(HTMLDocument.prototype.__lookupSetter__("cookie")) {
                this.nativeGet = HTMLDocument.prototype.__lookupGetter__("cookie");
                this.nativeSet = HTMLDocument.prototype.__lookupSetter__("cookie");
                
                HTMLDocument.prototype.__defineGetter__("cookie", this.getterShim);
                HTMLDocument.prototype.__defineSetter__("cookie", this.setterShim);
                this.cookiesJacked = true;
            }
            /* Opera */
            else if(document.__lookupSetter__ ('cookie')) {
                this.nativeGet = document.__lookupGetter__ ('cookie');
                this.nativeSet = document.__lookupSetter__ ('cookie');
                
                document.__defineGetter__ ('cookie', this.getterShim);
                document.__defineSetter__ ('cookie', this.setterShim);
                
                this.cookiesJacked = true;
            }
            
            return this.cookiesJacked;
        },
        
        setGetter: function(callback) {
            this.customGet = callback;
        },
        
        setSetter: function(callback) {
            this.customSet = callback;
        },
        
        getGetter: function() {
            return this.customGet;
        },
        
        getSetter: function() {
            return this.customSet;
        },
        
        getCookie: function() {
            /*return nativeGet ? nativeGet.apply(this, arguments) : null;*/
            return cookiejacker.nativeGet.apply(this, arguments);
        },
        
        setCookie: function(str) {
            /*return nativeSet ? nativeSet.apply(this, arguments) : null;*/
            return cookiejacker.nativeSet.apply(this, arguments);
        }
    };
    
    return my;
}());