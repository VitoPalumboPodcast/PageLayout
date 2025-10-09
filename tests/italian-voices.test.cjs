const test=require('node:test');
const assert=require('node:assert/strict');
const {
  isItalianVoice,
  scoreVoice,
  compareVoices,
  signatureFor,
  filterItalianVoices
}=require('../js/italian-voices.js');

test('detects Italian voices from language tag',()=>{
  assert.ok(isItalianVoice({name:'Any', voiceURI:'uri', lang:'it-IT'}));
  assert.ok(isItalianVoice({name:'Voce italiana', voiceURI:'uri', lang:'it_CH'}));
});

test('detects Italian voices from descriptor hints even with empty lang',()=>{
  assert.ok(isItalianVoice({name:'Microsoft Diego Online (Natural)', voiceURI:'MSTTS_V110_itIT_DiegoM', lang:''}));
  assert.ok(isItalianVoice({name:'Elisa', voiceURI:'google/it-it-elisa', lang:''}));
});

test('excludes non-Italian voices with similar names',()=>{
  assert.ok(!isItalianVoice({name:'Microsoft Diego Online (Natural)', voiceURI:'MSTTS_V110_esES_DiegoM', lang:'es-ES'}));
  assert.ok(!isItalianVoice({name:'Elisa', voiceURI:'google/es-es-elisa', lang:'es-ES'}));
});

test('filterItalianVoices returns unique italian voices only',()=>{
  const voices=[
    {name:'Diego', voiceURI:'uri:it-diego', lang:'it-IT'},
    {name:'Diego', voiceURI:'uri:it-diego', lang:'it-IT'},
    {name:'Maria', voiceURI:'uri:es-maria', lang:'es-ES'}
  ];
  const filtered=filterItalianVoices(voices);
  assert.equal(filtered.length,1);
  assert.equal(filtered[0].name,'Diego');
});

test('compareVoices prefers online neural options',()=>{
  const local={name:'Lucia', voiceURI:'local', lang:'it-IT', localService:true};
  const online={name:'Lucia Online Neural', voiceURI:'online', lang:'it-IT', localService:false};
  assert.ok(compareVoices(online,local)<0, 'online voice should sort before local');
});

test('signatureFor tracks relevant fields',()=>{
  const voices=[
    {name:'Lucia', voiceURI:'uri:lucia', lang:'it-IT', localService:true, default:true},
    {name:'Diego', voiceURI:'uri:diego', lang:'it-IT', localService:false, default:false}
  ];
  const signature=signatureFor(voices);
  assert.match(signature,/uri:lucia::Lucia::it-IT::true::true/);
  assert.match(signature,/uri:diego::Diego::it-IT::false::false/);
});
