/*
This is some Javascript Robin wrote way back in the day (read: in 2013) for the page on which he sold Noteboards. Its purpose is to send parameters to a PayPal button changing the cost of Noteboards depending on quantity and the cost of shipping depending on country.

How could this be refactored and made more object-oriented?
*/

var euro1 = "BE, FR, DK, SP, LU, AT, IT, GB, DE, SE";

var euro2 = "BG, CZ, PT, EE, IE, RO, PL, SI, FI, LT, HU, LV, SK";

var euro3 = "GI, AL, CS, UA, AD, HR, FO, MD, NO, GL, IS, MT, CH, VA, MK, SM, TR, BA, CY, GR, LI";

function hasjs() {
    document.getElementById("submitno").style.display = "none";
    document.getElementById("submityes").style.display = "block";
}

function wheredest(inwhich) {
    var country = document.getElementById("country").value,
        locatn = 0;
    locatn = (inwhich.indexOf(country));
}

function usdamount() {
    var amount = document.getElementById("amount"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        document.getElementById("amount").value = "0.01";
    } else if (qty == 1) {
        amount.value = "10.00";
    } else if (qty == 2 || qty == 3) {
        amount.value = "9.00";
    } else if (qty >= 4 && qty <= 12) {
        amount.value = "8.00";
    } else {
        amount.value = "10.00";
    }
}

function euramount() {
    var amount = document.getElementById("amount"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        document.getElementById("amount").value = "0.01";
    } else if (qty == 1) {
        amount.value = "10.00";
    } else if (qty == 2) {
        amount.value = "9.00";
    } else if (qty == 3) {
        amount.value = "8.00";
    } else if (qty == 4 || qty == 5) {
        amount.value = "7.00";
    } else if (qty == 6 || qty == 7) {
        amount.value = "6.50";
    } else if (qty >= 8 && qty <= 12) {
        amount.value = "6.25";
    } else {
        amount.value = "10.00";
    }
}

function usdship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "2.39";
    } else if (qty == 2) {
        ship.value = "3.23";
    } else if (qty >= 3 && qty <= 4) {
        ship.value = "5.15";
    } else {
        ship.value = "5.70";
    }
}

function canship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "7.70";
    } else if (qty == 2) {
        ship.value = "8.24";
    } else {
        ship.value = "19.95";
    }
}

function intship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "11.48";
    } else if (qty == 2) {
        ship.value = "13.41";
    } else {
        ship.value = "23.95";
    }
}

function nedship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "2.16";
    } else if (qty >= 2 && qty <= 3) {
        ship.value = "2.70";
    } else if (qty >= 4 && qty <= 7) {
        ship.value = "3.24";
    } else {
        ship.value = "6.75";
    }
}

function ezaship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "4.50";
    } else if (qty >= 2 && qty <= 3) {
        ship.value = "7.20";
    } else {
        ship.value = "9.00";
    }
}

function ezbship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "4.50";
    } else if (qty >= 2 && qty <= 3) {
        ship.value = "7.20";
    } else if (qty >= 4 && qty <= 7) {
        ship.value = "9.00";
    } else {
        ship.value = "10.80";
    }
}

function ezcship() {
    var ship = document.getElementById("ship"),
        qty = document.getElementById("quantity").value;
    if (qty == 100) {
        ship.value = "0.00";
    } else if (qty == 1) {
        ship.value = "4.50";
    } else if (qty >= 2 && qty <= 3) {
        ship.value = "7.20";
    } else if (qty >= 4 && qty <= 7) {
        ship.value = "9.00";
    } else {
        ship.value = "11.70";
    }
}

function shipto() {
    var country = document.getElementById("country").value,
        region = document.getElementById("os1"),
        currency = document.getElementById("currency"),
        qty = document.getElementById("quantity").value;
    if (country == "XX") {
        alert("Oops! Your order can't be completed because I haven't added your country as a shipping destination! Please send an e-mail to robin@rgft.net letting me know and I'll add it as soon as possible.");
    } else if (euro1.indexOf(country) != "-1") {
        region.value = "Europe Z1" + " (" + country + ")";
        currency.value = "EUR";
        ezaship();
        euramount();
    } else if (euro2.indexOf(country) != "-1") {
        region.value = "Europe Z2" + " (" + country + ")";
        currency.value = "EUR";
        ezbship();
        euramount();
    } else if (euro3.indexOf(country) != "-1") {
        region.value = "Europe Z3" + " (" + country + ")";
        currency.value = "EUR";
        ezcship();
        euramount();
    } else if (country == "NL") {
        region.value = "Netherlands" + " (" + country + ")";
        currency.value = "EUR";
        nedship();
        euramount();
    } else if (country == "US") {
        region.value = "USA" + " (" + country + ")";
        currency.value = "USD";
        usdship();
        usdamount();
    } else if (country == "CA") {
        region.value = "Canada" + " (" + country + ")";
        currency.value = "USD";
        canship();
        usdamount();
    } else {
        region.value = "International" + " (" + country + ")";
        currency.value = "USD";
        intship();
        usdamount();
    }
}

function curwhat(which) {
    var curr = document.getElementById("currency").value;
    if (curr == "EUR") {
        document.getElementsByClassName(which).item(x).innerHTML = "&#8364";
    } else {
        document.getElementsByClassName(which).item(x).innerHTML = "&#36";
    }
}

function totcur(which) {
    var numspans = (document.getElementsByClassName(which).length) - 1;
    for (x = 0; x <= numspans; x++) {
        curwhat(which);
    }
}

function handling() {
    var ship = Number(document.getElementById("ship").value),
        tips = Number(document.getElementById("tips").value),
        tipsok = /^\d+(?:\.\d{1,2})?$/;
    if (tipsok.test(tips)) {
        document.getElementById("tips").value = tips.toFixed(2);
        document.getElementById("handling").value = (ship + tips).toFixed(2);
        document.getElementById("os2").value = "$" + (ship).toFixed(2);
        document.getElementById("os3").value = "$" + (tips).toFixed(2);
    } else {
        document.getElementById("tips").value = "0.00";
        document.getElementById("handling").value = ship.toFixed(2);
    }
}

function tottot() {
    var prix = Number(document.getElementById("amount").value),
        qty = Number(document.getElementById("quantity").value),
        handling = Number(document.getElementById("handling").value);
    document.getElementById("tottot").value = ((prix * qty) + handling).toFixed(2);
}

function addresslight(which) {
    var thisun = document.getElementById(which);
    thisun.select();
}

function addresscolor(which) {
    var thisun = document.getElementById(which);
    thisun.style.color = "#000000";
}

function addresscheck(which, thenorm) {
    var thisun = document.getElementById(which),
        thisunval = thisun.value,
        thenormpunc = thenorm.replace(/[!$@%\^&\*;:{}=`~]/g,""),
        thenormcap = thenormpunc.toUpperCase(),
        thenormfinal = thenormcap.replace(/\s+/g, " "),
        nopunc = thisunval.replace(/[!$@%\^&\*;:{}=`~]/g,""),
        allcap = nopunc.toUpperCase(),
        final = allcap.replace(/\s+/g, " ");
    if (final == "" || final == " " || final == thenorm || final == thenormpunc || final == thenormcap || final == thenormfinal) {
        thisun.value = thenorm;
        thisun.style.color = "#999999";
    } else {
        thisun.style.color = "#000000";
        thisun.value = final;
    }
}

function addressit() {
    var adfname = document.getElementById("adfname").value,
        adlname = document.getElementById("adlname").value,
        adl1 = document.getElementById("adl1").value,
        adl2 = document.getElementById("adl2").value,
        adcity = document.getElementById("adcity").value,
        adstate = document.getElementById("adstate").value,
        adzip = document.getElementById("adzip").value,
        country = document.getElementById("country").value,
        addresspunc = adfname + " " + adlname + ", " + adl1 + ", " + adl2 + ", " + adcity + ", " + adstate + " " + adzip,
        addressnopunc = addresspunc.replace(/[!$@%\^&\*;:{}=`~]/g,""),
        addresscap = addressnopunc.toUpperCase(),
        addressfinal = addresscap.replace(/\s+/g, " "),
        addresslength = addressfinal.length;
    if (addresslength >= 200) {
        alert("Your address is too long! It has to be fewer than 200 characters total. This site records your address as:\n\n" + addressfinal + "\n\n...which is " + addresslength + " characters.");
    } else {
        document.getElementById("os0").value = addressfinal;
        document.getElementById("country2").value = country;
    }
}

function doitall() {
    shipto();
    totcur("cursym");
    handling();
    tottot();
}

function setimgs() {
// CHANGE NUM
    var fpnumbot = (Math.floor(Math.random() * 7) + 1);
    document.getElementById("fpbackbot").src = fpnumbot + ".jpg";
    document.getElementById("fpbacktop").title = fpnumbot;
}

function fadeimgs() {
    var counter = 5000,
        fptopopc = 1.0,
        fpbotopc = 0,
        fpnum = Number(document.getElementById("fpbacktop").title);
    setInterval(function spatula() {
        if (counter < 2000 && counter > 1000) {
            document.getElementById("fpbackbot").style.opacity = fpbotopc + 0.1;
            fpbotopc = fpbotopc + 0.05;
            counter = counter - 50;
        } else if (counter < 1000 && counter > 0) {
            document.getElementById("fpbacktop").style.opacity = fptopopc - 0.1;
            fptopopc = fptopopc - 0.05;
            counter = counter - 50;
// CHANGE NUM
        } else if (counter === 0 && fpnum < 7) {
            document.getElementById("fpbacktop").src = fpnum + ".jpg";
            document.getElementById("fpbacktop").title = Number(fpnum);
            fpnum = fpnum + 1;
            document.getElementById("fpbackbot").src = fpnum + ".jpg";
            document.getElementById("fpbacktop").style.opacity = 1;
            document.getElementById("fpbackbot").style.opacity = 0;
            counter = 5000;
            fptopopc = 1.0;
            fpbotopc = 0;
// CHANGE NUM
        } else if (counter === 0 && fpnum >= 7) {
            document.getElementById("fpbacktop").src = fpnum + ".jpg";
            document.getElementById("fpbacktop").title = Number(fpnum);
            fpnum = 1;
            document.getElementById("fpbackbot").src = fpnum + ".jpg";
            document.getElementById("fpbacktop").style.opacity = 1;
            document.getElementById("fpbackbot").style.opacity = 0;
            counter = 5000;
            fptopopc = 1.0;
            fpbotopc = 0;
        } else {
            counter = counter - 50;
        }
    }, 50);
}

function changetxt(which, text) {
    document.getElementById(which).innerHTML = text;
}


function showframe(fwidth) {
    document.getElementById("fpframe").style.width = fwidth + "px";
    document.getElementById("fpframewrap").style.display = "block";
    document.getElementById("fpbg").style.display = "block";
    setTimeout(function() {
        document.getElementById("fpbg").style.cursor = "pointer";
    }, 100);
    window.location.hash = "fpframewrap";
}

function clearframe() {
    var id1 = document.getElementById("fpframewrap"),
        id2 = document.getElementById("fpbg"),
        shown = window.getComputedStyle(id1).getPropertyValue("display"),
        cursor = window.getComputedStyle(id2).getPropertyValue("cursor");
    if (shown == "block" && cursor == "pointer") {
        document.getElementById("fpframewrap").style.display = "none";
        document.getElementById("fpbg").style.cursor = "default";
        document.getElementById("fpbg").style.display = "none";
    }
}


function swapin(swapout, swapin) {
    document.getElementById(swapout).style.display = "none";
    document.getElementById(swapin).style.display = "block";
}

function outoftown() {
    alert("Hi there! You're welcome (and encouraged!) to place an order for Noteboards. But I'm going to be out of town this week, so your order likely won't be shipped until Monday, April 15th. Take care!");
}
