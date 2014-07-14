// scrape master public key from logged in counterwallet
var MASPUBKEY = WALLET.BITCOIN_WALLET.HierarchicalKey.derive('m/0\'/0').extendedPublicKeyString();

// create new HD wallet form master public key
var NEWHDWALLET = new bitcore.HierarchialKey(MASPUBKEY);

// generate addresses
var HOWMANY = 3;
var ADDRESSES = [];
for (i = 0, i < HOWMANY; i++){
	var thisAddr = [];
	thisAddr[0] = bitcore.Address.fromPubKey( SHIT.derive('m/' + i).eckey.public ).toString();
	ADDRESSES.push(thisAddr);

}

// to get json data from url asyncronously
// ref: http://stackoverflow.com/questions/2499567/how-to-make-a-json-call-to-a-url
function getJSON(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

// query blockscan API
for (j = 0, j < ADDRESSES.length, j++){
  var bsAPi = 'http://blockscan.com/api2.aspx?module=balance&address=';
  var thisAddr = ADDRESSES[j][0];
  ADDRESSES[j][1] = getJSON(bsAPi + thisAddr, function(data){return data;});
}
