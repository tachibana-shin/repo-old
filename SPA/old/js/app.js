// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var mainView = myApp.addView('.view-main', {
  
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view4 = myApp.addView('#view-4', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10)+"."+parseInt(v[2], 10)+"."+parseInt(v[3] || 0, 10)];
  }
}

var part1 = 'itms-services://?action=download-manifest&url=https%3A%2F%http://2Fsmartinstaller.com%2Finstall.php%3Fipa%3D';
var part2 = '';
var part3 = '';
var part4 = '';
var resultpart4 = ''
function installApp() {
 part4 = document.getElementById('appname');
 resultpart4 = part4.value.split(' ').join('%2520')
 
}

function loadPage (name) {
var tool = {
	"Chimera Jailbreak": {
		icon: "chimera.png",
		plist: [
			"https://iosninja.io/plist/in/a110/chimera.plist",
			"https://iosninja.io/plist/in/a113/chimera.plist", 
			"https://ammaripa.com/files/Chimera.plist",
			"https://dzmohaipa.com/Jb2017/chimera.plist",
			"https://ipa.kenhtao.net/plists/chimera.plist",
			"https://ignition.fun/install.php%3Fapp%3D1356",
			"https%3A%2F%2Fapi.tweakboxapp.com%2Fdownload%2Fmsru3sdqVWaqotCiq4Tu5bmRkZm0rJSjpMWp18SRVau8mceelMXynbeYj6Sqpsdhm8bb%2Ftitle%2FChimera%2520Jailbreak",
			"https://app.app-valley.vip/plists/1589/install.plist",
			"https://ipa-apps.me/plist/ChimeraJB.plist",
			"https://achlhi.com/jailbreak/plist/chimera.plist",
			"https://achlhi.com/jailbreak/plist111/chimera.plist",
			"https://achlhi.com/jailbreak/plist112/chimera.plist",
			"https://achlhi.com/jailbreak/plist114/chimera.plist",
			"https://cydiaabdullah.com/App/plist/Ch.plist"
		],
		version: "1.3.9",
		support: "11 - 12.2 & 12.4"
	},
	"unc0ver Jailbreak": {
		icon: "unc0ver.png",
		plist: [
			"https://dzmohaipa.com/Jb2017/unc0ver.plist",
			"https://ammaripa.com/files/unc0ver.plist",
			"https://ipa.kenhtao.net/plists/unc0ver.plist",
			"https://ignition.fun/install.php%3Fapp%3D204",
			"https://app.app-valley.vip/plists/1574/install.plist",
			"https://corejb.com/app/1.plist",
			"https%3A%2F%2Fapi.tweakboxapp.com%2Fdownload%2Fmsru3sdqVWaqotCiq4Tu5bmRkZm0rJSjpMWp18SRVau8mceelMXyncmeiaa7mdhhm8bb%2Ftitle%2Func0ver%2520Jailbreak",
			"https://iosninja.io/plist/in/a100/unc0ver.plist",
			"https://tbsq.pandahelp.vip/plist/zb/20191225/109099_10013922_190707.plist",
			"https://iosninja.io/plist/in/a110/unc0ver.plist",
			"https://iosninja.io/plist/in/a113/unc0ver.plist",
			"https://ipa-apps.me/plist/Unc0ver.plist",
			"https://achlhi.com/jailbreak/plist/unc0verb3.plist",
			"https://achlhi.com/jailbreak/plist111/unc0verb3.plist",
			"https://achlhi.com/jailbreak/plist112/unc0verb3.plist",
			"https://achlhi.com/jailbreak/plist114/unc0verb3.plist",
			"https://cydiaabdullah.com/App/plist/un.plist" 
		],
		version: "3.8.0 b1",
		support: "11 - 12.2 & 12.4"
	},
	"doubleH3lix": {
		icon: "dbh3lix.png",
		plist: [
			"https://dzmohaipa.com/Jb2017/doubleH3lix-RC6.plist",
			"https://ammaripa.com/files/doubleH3lix.plist",
			"https://iosninja.io/plist/in/a110/doubleh3lix.plist",
			"https://iosninja.io/plist/in/a113/doubleh3lix.plist", 
			"https://ipa-apps.me/plist/DoubleH3lix.plist",
			"https://achlhi.com/jailbreak/plist/doubleh3lix.plist",
			"https://achlhi.com/jailbreak/plist111/doubleh3lix.plist",
			"https://achlhi.com/jailbreak/plist112/doubleh3lix.plist",
			"https://achlhi.com/jailbreak/plist114/doubleh3lix.plist",
			"https://cydiaabdullah.com/App/plist/doubleh.plist" 
		],
		version: "1.0 RC8",
		support: "10.0 - 10.3.3 (64-bit)"
	},
	"Electra Jailbreak": {
		icon: "electra.png",
		plist: [
			"https://iosninja.io/plist/in/a110/electra.plist",
			"https://iosninja.io/plist/in/a113/electra.plist",
			"https://ammaripa.com/files/Electra.plist",
			"https%3A%2F%2Fapi.tweakboxapp.com%2Fdownload%2Fmsru3sdqVWaqotCiq4Tu5bmRkZm0rJSjpMWp18SRVau8mceelMXynbmci5q5psdkY4qrnL2ghw,,%2Ftitle%2FElectra%2520iOS%252011.4.1%2520Jailbreak",
			"https://ignition.fun/install.php%3Fapp%3D1356",
			"https://app.app-valley.vip/plists/460/install.plist",
			"https://ipa.kenhtao.net/plists/Electra1141.plist",
			"https://ipa-apps.me/plist/ElectraJB.plist",
			"https://achlhi.com/jailbreak/plist/electra.plist",
			"https://achlhi.com/jailbreak/plist111/electra.plist",
			"https://achlhi.com/jailbreak/plist112/electra.plist",
			"https://achlhi.com/jailbreak/plist114/electra.plist",
			"https://cydiaabdullah.com/App/plist/ele1141.plist" 
		 ],
		version: "1.3.2",
		support: "11 - 11.4.1"
	},
	"EtasonJB": {
		icon: "etasonjb.png",
		plist: [
			"https://iosninja.io/plist/in/a110/etason.plist",
			"https://iosninja.io/plist/in/a113/etason.plist",
			"https://ipa.kenhtao.net/plists/etasonJB.plist",
			"https://cydiaabdullah.com/App/plist/eta.plist" 
		],
		version: "1.0 RC5",
		support: "8.x.x"
	},
	"g0blin Jailbreak": {
		icon: "g0blin.png",
		plist: [
			"https://iosninja.io/plist/in/a110/g0blin.plist",
			"https://iosninja.io/plist/in/a113/g0blin.plist",
			"https://ammaripa.com/files/g0blin.plist",
			"https://ipa-apps.me/plist/g0blin.plist",
			"https://achlhi.com/jailbreak/plist/g0blin.plist",
			"https://achlhi.com/jailbreak/plist111/g0blin.plist",
			"https://achlhi.com/jailbreak/plist112/g0blin.plist",
			"https://achlhi.com/jailbreak/plist114/g0blin.plist",
			"https://cydiaabdullah.com/App/plist/g0blin.plist" 
		],
		version: "1.0 RC2",
		support: "10.3.x (64-bit)"
	},
	"h3lix Jailbreak": {
		icon: "h3lix.png",
		plist: [
			"https://iosninja.io/plist/in/a110/h3lix.plist",
			"https://iosninja.io/plist/in/a113/h3lix.plist",
			"https://dzmohaipa.com/Jb2017/h3lix.plist",
			"https://ammaripa.com/files/H3lix.plist",
			"https://ipa-apps.me/plist/H3lix.plist",
			"https://achlhi.com/jailbreak/plist/h3lix.plist",
			"https://achlhi.com/jailbreak/plist111/h3lix.plist",
			"https://achlhi.com/jailbreak/plist112/h3lix.plist",
			"https://achlhi.com/jailbreak/plist114/h3lix.plist",
			"https://cydiaabdullah.com/App/plist/H3lix.plist" 
		],
		version: "1.0 RC6",
		support: "10.x.x (32-bit)"
	},
	"Pangu Jailbreak": {
		icon: "pangu.png",
		plist: [
			"https://iosninja.io/plist/in/a110/pangu.plist",
			"https://iosninja.io/plist/in/a113/pangu.plist",
			"https://ammaripa.com/files/panGu.plist",
			"https://ipa.kenhtao.net/plists/pangu.plist",
			"https://ipa-apps.me/plist/pangu.plist",
			"https://achlhi.com/jailbreak/plist/pangu.plist",
			"https://achlhi.com/jailbreak/plist111/pangu.plist",
			"https://achlhi.com/jailbreak/plist112/pangu.plist",
			"https://achlhi.com/jailbreak/plist114/pangu.plist",
			"https://cydiaabdullah.com/App/plist/Pangu.plist" 
		],
		version: "1.1",
		support: "9.3 - 9.3.3"
	},
	"Saigon Jailbreak": {
		icon: "saigon.png",
		plist: [
			"https://iosninja.io/plist/in/a110/saigon.plist",
			"https://iosninja.io/plist/in/a113/saigon.plist",
			"https://ammaripa.com/files/saigon.plist",
			"https://ipa-apps.me/plist/Saigon.plist",
			"https://achlhi.com/jailbreak/plist/saigon.plist",
			"https://achlhi.com/jailbreak/plist111/saigon.plist",
			"https://achlhi.com/jailbreak/plist112/saigon.plist",
			"https://achlhi.com/jailbreak/plist114/saigon.plist",
			"https://cydiaabdullah.com/App/plist/sai.plist" 
		],
		version: "b2 RC1",
		support: "10.2.1 (jack 3.5)"
	},
	"Yalu Jailbreak": {
		icon: "yalu.png",
		plist: [
			"https://iosninja.io/plist/in/a110/yalu.plist",
			"https://iosninja.io/plist/in/a113/yalu.plist",
			"https://ammaripa.com/files/Yalu102.plist",
			"https://dzmohaipa.com/Jb2017/YaluArabic.plist",
			"https://ipa.kenhtao.net/plists/yalu102.plist",
			"https://ipa-apps.me/plist/Yalu102.plist",
			"https://achlhi.com/jailbreak/plist/yalu.plist",
			"https://achlhi.com/jailbreak/plist111/yalu.plist",
			"https://achlhi.com/jailbreak/plist112/yalu.plist",
			"https://achlhi.com/jailbreak/plist114/yalu.plist",
			"https://cydiaabdullah.com/App/plist/yalu.plist" 
		],
		version: "b7",
		support: "10 - 10.2 (64-bit)"
	},
	"Phoenix Jailbreak": {
		icon: "phoenix.png",
		plist: [
			"https://iosninja.io/plist/in/a110/phoenix.plist",
			"https://iosninja.io/plist/in/a113/phoenix.plist",
			"https://ammaripa.com/files/Phoenix9.3.6.plist",
			"https://dzmohaipa.com/Jb2017/Phoenix5.plist",
			"https://achlhi.com/jailbreak/plist/phoenix.plist",
			"https://achlhi.com/jailbreak/plist111/phoenix.plist",
			"https://achlhi.com/jailbreak/plist112/phoenix.plist",
			"https://achlhi.com/jailbreak/plist114/phoenix.plist",
			"https://cydiaabdullah.com/App/plist/Phoenix.plist" 
		],
		version: "5.0 RC6",
		support: "9.x (32-bit)"
	},
	"Meridian Jailbreak": {
		icon: "meridian.png",
		plist: [
			"https://ipa.kenhtao.net/plists/Meridian.plist",
			"https://ammaripa.com/files/Meridian.plist",
			"https://dzmohaipa.com/Jb2017/Meridian-pb6.plist",
			"https://ipa-apps.me/plist/Meridian.plist",
			"https://achlhi.com/jailbreak/plist/meridian.plist",
			"https://achlhi.com/jailbreak/plist111/meridian.plist",
			"https://achlhi.com/jailbreak/plist112/meridian.plist",
			"https://achlhi.com/jailbreak/plist114/meridian.plist"
		],
		version: "1.0",
		support: "10 (64-bit)"
	},
	"Th0r Jailbreak": {
		icon: "th0r.png",
		plist: [
			"https://dzmohaipa.com/Snapchat/Th0rEn.plist",
			"https://achlhi.com/jailbreak/plist/Th0r.plist",
			"https://achlhi.com/jailbreak/plist111/Th0r.plist",
			"https://achlhi.com/jailbreak/plist112/Th0r.plist",
			"https://achlhi.com/jailbreak/plist114/Th0r.plist", 
			"https://ammaripa.com/files/Th0r.plist",
			"https://ipa-apps.me/plist/Th0r.plist",
			"https://cydiaabdullah.com/App/plist/th0r2.plist" 
		],
		version: "2.9.3 b6",
		support: "11 - 12"
	}
}
// # fixed vuejs sort object in ti
    window.open("itms-services://?action=download-manifest&url=" + tool[name].plist[tool[name].plist.length - 1])

}
