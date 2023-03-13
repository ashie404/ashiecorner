// this poorly written javascript brought to you by a gay cat

async function hcGET() {
    const response = await fetch('https://api.ashiecorner.xyz/hc/gh/ashiecorner', {mode: 'cors'});
    if (response.ok) {
        let json = await response.json();
        if (json) {
            $('#hits').text(json['hits'] + ' hits');
        }
    }
}

// newsfeed stuff (omg its a proper rss feed now -Ash)
// putting this here as a reminder to make this fancier later
function feedGET() {
    $.get('newsfeed.xml', function(rss) {
        var tmp = '';
        $(rss).find("item").each(function() {
            var element = $(this);
            if (postType = element.find("category")) {
                switch (postType.text()) {
                    case 'Site Update':
                        // site update post stuff awawa
                        tmp += '<h1 class="post update"><img src="img/update.png"> ' + element.find('title').text() + ' <span class="subnote"> | ' + element.find('pubDate').text() + '</span></h1>';
                        break;
                    case 'Blog':
                        // blog post stuff
                        tmp += '<h1 class="post blog"><img src="img/news.png"> ' + element.find('title').text() + ' <span class="subnote"> | ' + element.find('pubDate').text() + '</span></h2>';
                        break;
                    default:
                        console.log('invalid category');
                        break;
                }
                if (desc = element.find("description")) {
                    tmp += '<p>' + desc.text() + '</p>';
                }
                tmp += '<br>';
            } else {
                console.log('category does not exist in newsfeed entry');
            }
        });
        $('.feed').html(tmp);
    });
}

// guestbook stuff (please also criticize my terrible programming)
async function guestbookGET() {
    const response = await fetch('https://api.ashiecorner.xyz/guestbook/getEntries/ashiecorner', {mode: 'cors'});
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
                tmp += '      <p class="gbe-email">' + atob(value[1]) + '</p>';
                tmp += '    </div>';
                tmp += '    <p>' + value[2] + '</p>';
                tmp += '</div>';
            });
        
            $('.gb-entries').html(tmp);
        }
    }
}

// parts menus shit
var p0o = false;
function p0Open() {
    if (p0o) {
        $('#parts-0').css('maxHeight', '0');
        $('#pbtn-0').attr('open', null);
    } else {
        $('#parts-0').css('maxHeight', $('#parts-0').prop('scrollHeight'));
        $('#pbtn-0').attr('open', '1');
    }
    p0o = !p0o;
}
var p1o = false;
function p1Open() {
    if (p1o) {
        $('#parts-1').css('maxHeight', '0');
        $('#pbtn-1').attr('open', null);
    } else {
        $('#parts-1').css('maxHeight', $('#parts-1').prop('scrollHeight'));
        $('#pbtn-1').attr('open', '1');
    }
    p1o = !p1o;
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
    "I love my Zenith <3",
    "Puerto Amongalas",
    "awawawawa,,",
    "The included spork is certainly the utensil of all time",
    "jraphic desijn",
    "any weather is skirt weather if you aren't a bitch",
    '<img src="img/Theta-delta.svg" width="32px" alt="ΘΔ">',
    '<img src="img/incrediblespinning.gif" width="16px" title="it is spinning">incredible　　　　　　　it is spinning',
    'this patch of snow is comprised of more than 14 snow',
    'Although many have speculated the moon is made of cheese, the moon is not real.',
    'i love spreading misinformation on the internet <3',
    'no two snowflakes are the same unless you have a snow duplicator',
    'gordan freeman　　　he does it <img src="img/goodjob.webp" alt="goodjob" width="16px">',
    'I <3 pastel gore,,',
    'I amorted too much'
];
var r = Math.floor(27*Math.random());

$(".scroll-text").html(r_text[r]);

$(".post-button").click(function() {
    $.ajax({
       type: "POST",
       url: "https://api.ashiecorner.xyz/guestbook/postEntry/ashiecorner",
       data: $(".guestbook").serialize(),
       success: function(data) {
            guestbookGET();
            $('.captcha-frame').attr('src', 'https://api.ashiecorner.xyz/captcha/ashiecorner'); // reset captcha
            $('.captcha-frame').css('box-shadow', ''); // reset shadow
            $('.errorNotif').each(function(i, obj) { obj.remove(); }); // clear error notifications
            $('input[name="name"]').removeClass('error');
            $('textarea[name="message"]').removeClass('error');
            $('input[name="email"]').removeClass('error');
       },
       error: function(xhr, status, error) {
           $("<div>").attr('class', 'errorNotif')
            .append(
                '<p>' + xhr.responseJSON['code'] + ': ' + xhr.responseJSON['description'] + '</p>')
                    .append('<a onclick="$(this).parent().remove()" href="#">X</a>')
           .insertAfter($("#errAfter"));
           switch (xhr.responseJSON['description']) { // the jank of ever
            case "Invalid captcha.":
                $('input[name="name"]').removeClass('error');
                $('textarea[name="message"]').removeClass('error');
                $('input[name="email"]').removeClass('error');
                $('.captcha-frame').attr('src', 'https://api.ashiecorner.xyz/captcha/ashiecorner'); // reset captcha
                $('.captcha-frame').css('box-shadow', '0px 0px 12px #ff3939'); // make captcha have red shadow to show what went wrong
                break;
            case "Name missing/too long.":
                $('input[name="name"]').addClass('error');
                $('textarea[name="message"]').removeClass('error');
                $('input[name="email"]').removeClass('error');
                break;
            case "Message missing/too long.":
                $('textarea[name="message"]').addClass('error');
                $('input[name="name"]').removeClass('error');
                $('input[name="email"]').removeClass('error');
                break;
            case "Invalid email.":
                $('input[name="email"]').addClass('error');
                $('input[name="name"]').removeClass('error');
                $('textarea[name="message"]').removeClass('error');
                break;
            default:
                break;
           }
       }
    });
     
    return false; // avoid to execute the actual submit of the form.
});

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

hcGET();


});