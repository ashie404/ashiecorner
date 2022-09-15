// this poorly written javascript brought to you by a gay cat

// randomized text stuff hehe :3
var r_text = new Array();
r_text[0] = "nyanyanya!";
r_text[1] = "sdfasdklfgsdfgsgoinrfoenlvbd";
r_text[2] = "Ashie was here";
r_text[3] = "Zenith was here";
r_text[4] = "Visual Studio Code is certainly the program of all time";
r_text[5] = "Reject human, embrace meow";
r_text[6] = "meow :3";
r_text[7] = "incrediblegaming";
r_text[8] = "pawwwwsssssss,,,,,";
r_text[9] = "mawwwwsssssss,,,,,";
r_text[10] = "sonic robo blsat 7";
r_text[11] = "Fun fact: I invented the sun";
r_text[12] = "<3 Zenith";
r_text[13] = "Puerto Amongalas";
r_text[14] = "awawawawa,,";
r_text[15] = "The included spork is certainly the utensil of all time";
r_text[16] = "jraphic desijn";
var r = Math.floor(17*Math.random());

$(".scroll-text").html(r_text[r]);

// randomized text colors
var r_neon = new Array();
r_neon[0] = ["#e6adff", "#f477ff"];
r_neon[1] = ["#b3ffe2", "#77ffe2"];
r_neon[2] = ["#ffd1ac", "#ffc077"];
r_neon[3] = ["#cfaaff", "#c977ff"];
r_neon[4] = ["#ffffff", "#FF99CC"];
r_neon[5] = ["#ff9e9e", "#ff7777"];
r = Math.floor(6*Math.random());

$(".scroll-text").css('color', r_neon[r][0]);
$(".scroll-text").css('textShadow', r_neon[r][1] + ' 0px 0px 6px');

// mobile navbutton

var navOpen = false;

function navButton() {
    if (navOpen) {
        // close nav
        $(".sidebar").css('left', '-256px');
        $(".page-content").css('margin-left', '0px');
        $(".navButton").css('left', '3px');
        $(".navButton img").attr('src', 'img/menu.svg');
    } else {
        $(".sidebar").css('left', '0px');
        $(".page-content").css('margin-left', '256px');
        $(".navButton").css('left', '259px');
        $(".navButton img").attr('src', 'img/close.svg');
    }
    navOpen = !navOpen;
}