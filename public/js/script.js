/* Author:

*/
bouncer = new doorman();
bouncer.verify_age();

suite = new engine(suite_setup);
suite.init();
$(window).resize(function(){ suite.resize(); })


