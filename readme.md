# cookiejacker.js

Intercept and replace your browser's default cookie getter and setters with your own custom code.

Inject your own logic between <em>document.cookie="var=val"</em> and <em>var x=document.cookie</em> statements and the actual creation or returning of the cookie value, controlling, modifying or preventing the setting or retrieval of cookies at your discretion.

By hijacking the standard javascript <em>document.cookie</em> property, cookiejacker.js allows you to intercept cookies set or retrieved by any other javascript code, including third-party scripts.  Just ensure that cookiejacker runs before these scripts, and their cookies are yours to intercept and fiddle with as you see fit.

## Browser coverage

Work in progress:

Currently works in latest versions of FF and Opera.

Currently won't work in Webkit due to known bug in the JS implementation (https://bugs.webkit.org/show_bug.cgi?id=49739).

*May* be possible in IE with enough fiddling.
 