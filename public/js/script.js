/* Author:

*/
bouncer = new doorman();
bouncer.verify_age();

var suite_setup = suite_setup || {}
suite = new engine(suite_setup);
suite.init();
$(window).resize(function(){ suite.resize(); })


