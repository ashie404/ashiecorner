// this poorly written javascript brought to you by a gay cat

// newsfeed stuff (please hate me as much as possible for this code -Ash)
function feedGET() {
    fetch('newsfeed.md').then(response => response.text()).then(result => $('.feed').html(snarkdown(result)));
}

// guestbook stuff (please also criticize my terrible programming)
async function guestbookGET() {
    const response = await fetch('https://api.ashiecorner.xyz/pygb/api/getEntries/ashiecorner', {mode: 'cors'});
    if (response.ok) {
        let json = await response.json();
        if (json) {
            var tmp = '';
            $.each( json, function( key, value ) {
                const epoch = Number(value[3])
                tmp += '<div class="gbe">';
                tmp += '    <div class="gbe-header">';
                tmp += '      <p class="gbe-name">' + value[0] + '</p>';
                if (Number.isInteger(epoch)) {
                    var date = new Date(epoch*1000);
                    var timestamp = date.toLocaleTimeString([], {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    tmp += '      <p class="gbe-timestamp">' + timestamp + '</p><br>';        
                } else {
                    tmp += '      <p class="gbe-timestamp">' + value[3] + '</p><br>';
                }
                tmp += '      <p class="gbe-email">' + value[1] + '</p>';
                tmp += '    </div>';
                tmp += '    <p>' + value[2] + '</p>';
                tmp += '</div>';
            });
        
            $('.gb-entries').html(tmp);
        }
    }
}

// mobile navbutton

var navOpen = false;

function navButton() {
    if (navOpen) {
        // close nav
        $(".sidebar").css('left', '');
        $(".nav-button").css('left', '');
        $(".nav-button img").attr('src', 'img/menu.svg');
        $(".page-content").attr('id', '');
    } else {
        $(".sidebar").css('left', '0px');
        $(".nav-button").css('left', '259px');
        $(".nav-button img").attr('src', 'img/close.svg');
        $(".page-content").attr('id', 'navOpen');
    }
    navOpen = !navOpen;
}

// randomized text stuff hehe :3
// for some reason this works better outside of the document ready function
// i have no idea
var r_text = [
    "nyanyanya!",
    "sdfasdklfgsdfgsgoinrfoenlvbd",
    "Ashie was here",
    "Zenith was here",
    "Visual Studio Code is certainly the program of all time",
    "Reject human, embrace meow",
    "meow :3",
    "incrediblegaming",
    "pawwwwsssssss,,,,,",
    "mawwwwsssssss,,,,,",
    "sonic robo blsat 7",
    "Fun fact: I invented the sun",
    "<3 Zenith",
    "Puerto Amongalas",
    "awawawawa,,",
    "The included spork is certainly the utensil of all time",
    "jraphic desijn"];
var r = Math.floor(17*Math.random());

$(".scroll-text").html(r_text[r]);

$(function() {

// randomized text colors
var r_neon = [
    ["#e6adff", "#f477ff"],
    ["#b3ffe2", "#77ffe2"],
    ["#ffd1ac", "#ffc077"],
    ["#cfaaff", "#c977ff"],
    ["#ffffff", "#FF99CC"],
    ["#ff9e9e", "#ff7777"]];
r = Math.floor(6*Math.random());

$(".scroll-text").css('color', r_neon[r][0]);
$(".scroll-text").css('textShadow', r_neon[r][1] + ' 0px 0px 6px');

// days of the week uwu
const d = new Date();
let day = d.getDay();
switch (day) {
    case 1: // monday
        $(".index-img").attr("src", "/img/index1.png");
        break;
    case 3: // wednesday
        $(".index-img").attr("src", "/img/index3.png");
        break;
    default: //  fallback pic
        $(".index-img").attr("src", "/img/index1.png");
        break;
}

// mobile nav swipe actions

function navSwipeRight() {
    // open nav
    if (!navOpen) {
        navButton();
    }
}
function navSwipeLeft() {
    // close nav
    if (navOpen) {
        navButton();
    }
}

Hammer(document).on("swipeleft", navSwipeLeft);
Hammer(document).on("swiperight", navSwipeRight);

});