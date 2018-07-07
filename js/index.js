/**
 * Speak from the upside down world.
 * @namespace st
 * @method speakFromUpsideDownWorld
 * @method turnOnLights
**/
var st = {};

st.speakFromUpsideDownWorld = function(message) {  
  var psr = {};
  
  psr['ae'] = 'ä|æ|ǽ';
  psr['oe'] = 'ö|œ';
  psr['ue'] = 'ü';
  psr['Ae'] = 'Ä';
  psr['Ue'] = 'Ü';
  psr['Oe'] = 'Ö';
  psr['A']  = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
  psr['a']  = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
  psr['C']  = 'Ç|Ć|Ĉ|Ċ|Č';
  psr['c']  = 'ç|ć|ĉ|ċ|č';
  psr['D']  = 'Ð|Ď|Đ';
  psr['d']  = 'ð|ď|đ';
  psr['E']  = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
  psr['e']  = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
  psr['G']  = 'Ĝ|Ğ|Ġ|Ģ';
  psr['g']  = 'ĝ|ğ|ġ|ģ';
  psr['H']  = 'Ĥ|Ħ';
  psr['h']  = 'ĥ|ħ';
  psr['I']  = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
  psr['i']  = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
  psr['J']  = 'Ĵ';
  psr['j']  = 'ĵ';
  psr['K']  = 'Ķ';
  psr['k']  = 'ķ';
  psr['L']  = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
  psr['l']  = 'ĺ|ļ|ľ|ŀ|ł';
  psr['N']  = 'Ñ|Ń|Ņ|Ň';
  psr['n']  = 'ñ|ń|ņ|ň|ŉ';
  psr['O']  = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
  psr['o']  = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
  psr['R']  = 'Ŕ|Ŗ|Ř';
  psr['r']  = 'ŕ|ŗ|ř';
  psr['S']  = 'Ś|Ŝ|Ş|Š';
  psr['s']  = 'ś|ŝ|ş|š|ſ';
  psr['T']  = 'Ţ|Ť|Ŧ';
  psr['t']  = 'ţ|ť|ŧ';
  psr['U']  = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
  psr['u']  = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
  psr['Y']  = 'Ý|Ÿ|Ŷ';
  psr['y']  = 'ý|ÿ|ŷ';
  psr['W']  = 'Ŵ';
  psr['w']  = 'ŵ';
  psr['Z']  = 'Ź|Ż|Ž';
  psr['z']  = 'ź|ż|ž';
  psr['AE'] = 'Æ|Ǽ';
  psr['ss'] = 'ß';
  psr['IJ'] = 'Ĳ';
  psr['ij'] = 'ĳ';
  psr['OE'] = 'Œ';
  psr['f']  = 'ƒ';

  for(var i in psr) {
    message = message.replace(new RegExp(psr[i], 'g'), i);
  }
    
  this.turnOnLights(message.toUpperCase().split(''));
};

st.turnOnLights = function(message) {
  var letter = 0;
  var slowly;
  
  slowly = setInterval(function() {
    if(letter < message.length) {      
      var element = document.querySelector('[data-light="' + message[letter] + '"]');
      
      if(element) {
        element.classList.add('active');

        setTimeout(function() {
          element.classList.remove('active');
        }, 1000);
      }
      
      ++letter;
          
      return;
    }
    
    clearInterval(slowly);
  }, 1000);
};
/**
 * Native (webkit) speech recognition API.
 * @see {@link https://shapeshed.com/html5-speech-recognition-api/}
 * @namespace ai
 * @method onresult
 * @method onend
**/
var ai = new webkitSpeechRecognition();

ai.lang = 'pt-br';

ai.onresult = function(event) {
  var message = '';

  for(var i = event.resultIndex; i < event.results.length; ++i) {
    message += event.results[i][0].transcript;
  }
  
  console.log(message);

  st.speakFromUpsideDownWorld(message);
};

ai.onend = function () {
  this.start();
};

ai.start();