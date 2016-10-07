// THIS SCRIPT DETECTS IF THE WEBSITE IS BEING VIEWED ON A MOBILE DEVICE
// IT REDIRETS TO A SEPERATE PAGE IF IT IS A MOBILE DEVICE

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

    if (isMobile.any()) {
        var mobileConfirm = window.confirm("The games on this website is made for desktop computers. These games may not function or run correctly on a mobile device. Do you wish to continue playing this game on a mobile device?");
        if (!mobileConfirm)
            {
                window.location = "../index.html";
            }
    }
