"use strict";

var passStrength = {};

passStrength.rate = function (pass) {
    //where we store the strength
    var score = 0;

    if (!pass)
        return score; //no score for nothing

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    var variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

passStrength.check = function(pass) {
    var score = passStrength.rate(pass);
    if (score > 80)
        return "strong";
    if (score > 60)
        return "gut";
    if (score >= 30)
        return "bad";
    if (score < 30)
        return "poor";

    return "";
}

module.exports = passStrength;
