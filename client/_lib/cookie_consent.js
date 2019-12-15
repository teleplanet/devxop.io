var options = {
    cookieTitle: "We use Cookies",
    cookieMessage: "We are using cookies to give you the best"
       + " experience on our site. Cookies are files stored in your"
       + " browser and are used by most websites to help personalise your web experience.",
    showLink: true,
    linkText: "Read more",
    linkRouteName: "/cookiePolicy",
    acceptButtonText: "Accept and Continue",
    html: false,
    expirationInDays: 7,
    forceShow: false
  };
  
  CookieConsent.init(options);
  
  // or
  
  var optionsImply = {
    cookieMessage: "We are using cookies to give you the best"
       + " experience on our site. Cookies are files stored in your"
       + " browser and are used by most websites to help personalise your web experience.",
    cookieMessageImply: "By continuing to use our website without changing the settings,"
      + " you are agreeing to our use of cookies.",
    showLink: true,
    position: 'bottom',
    linkText: "Read more",
    linkRouteName: "/cookiePolicy",
    html: false,
    className: null,
    expirationInDays: 365,
    forceShow: false
  };
  
  CookieConsent.init(optionsImply);