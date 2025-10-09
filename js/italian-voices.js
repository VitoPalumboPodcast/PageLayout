(function(root,factory){
  const utils=factory();
  if(typeof module==='object' && module.exports){ module.exports=utils; }
  if(root){ root.ItalianVoices=utils; }
})(typeof globalThis!=='undefined'?globalThis:typeof window!=='undefined'?window:this,function(){
  const ITALIAN_VOICE_HINTS=[
    'alice','andrea','bianca','caterina','chiara','diego','elena','elisa','elsa','federica','filippo',
    'gianni','giorgio','giulia','isabella','lucia','luca','marco','marta','matteo','noemi','paolo',
    'riccardo','serena','silvia','valentina','carla','susanna','nicol\u00f2','nicolo','pierluigi'
  ];
  const ITALIAN_WORD_PATTERN=/\bital(?:ian|iano|iani|iana|ia|y)\b/;
  const ITALIAN_COUNTRY_PATTERN=/\bital(?:y|ia)\b/;
  const IT_CODE_PATTERN=/\bit[-_]?it\b/;
  const IT_CH_PATTERN=/\bit[-_]?ch\b/;

  const lower=str=>String(str||'').toLowerCase();
  const normalizeLang=lang=>lower(lang).replace(/_/g,'-');

  const hasExplicitItalianMarker=voice=>{
    const descriptor=lower(`${voice?.name||''} ${voice?.voiceURI||''}`);
    const lang=normalizeLang(voice?.lang||'');
    const uri=lower(voice?.voiceURI||'');
    if(!descriptor && !lang && !uri) return false;
    if(lang.startsWith('it') || lang.includes('ital')) return true;
    if(ITALIAN_WORD_PATTERN.test(lang)) return true;
    if(ITALIAN_WORD_PATTERN.test(descriptor) || ITALIAN_COUNTRY_PATTERN.test(descriptor)) return true;
    if(IT_CODE_PATTERN.test(descriptor) || IT_CH_PATTERN.test(descriptor)) return true;
    if(ITALIAN_WORD_PATTERN.test(uri) || ITALIAN_COUNTRY_PATTERN.test(uri)) return true;
    if(IT_CODE_PATTERN.test(uri) || IT_CH_PATTERN.test(uri)) return true;
    return false;
  };

  function isItalianVoice(voice){
    if(!voice) return false;
    const descriptor=lower(`${voice.name||''} ${voice.voiceURI||''}`);
    const lang=normalizeLang(voice.lang||'');
    if(hasExplicitItalianMarker(voice)) return true;
    const hintMatched=ITALIAN_VOICE_HINTS.some(hint=>descriptor.includes(hint));
    if(!hintMatched) return false;
    const uri=lower(voice.voiceURI||'');
    if(ITALIAN_WORD_PATTERN.test(descriptor) || ITALIAN_COUNTRY_PATTERN.test(descriptor)) return true;
    if(IT_CODE_PATTERN.test(descriptor) || IT_CH_PATTERN.test(descriptor)) return true;
    if(ITALIAN_WORD_PATTERN.test(uri) || ITALIAN_COUNTRY_PATTERN.test(uri) || IT_CODE_PATTERN.test(uri) || IT_CH_PATTERN.test(uri)) return true;
    if(lang.startsWith('it') || lang.includes('ital')) return true;
    if(!lang) return true;
    if(/^(es|pt|fr|de|en|ca|br|mx|us|uk)([-_]|$)/.test(lang)) return false;
    return true;
  }

  function scoreVoice(voice){
    const name=lower(`${voice?.name||''} ${voice?.voiceURI||''}`);
    let score=0;
    const lang=normalizeLang(voice?.lang||'');
    if(lang.startsWith('it') || lang.includes('ital')) score+=120; else score-=120;
    if(/online/.test(name) || voice?.localService===false) score+=60;
    if(/natural|neural/.test(name)) score+=25;
    if(/microsoft (lucia|isabella|elsa|valentina|andrea|gianni|bianca|diego)/.test(name)) score+=35;
    if(/google (italiano|italian)/.test(name)) score+=40;
    if(/diego/.test(name)) score+=30;
    if(/(alice|chiara|caterina|luca|paolo|giorgio|silvia|carla|federica|elena|serena)/.test(name)) score+=15;
    if(voice?.localService===false) score+=10;
    if(/\bit[-_]?it\b/.test(lang)) score+=20;
    return score;
  }

  function compareVoices(a,b){
    const diff=scoreVoice(b)-scoreVoice(a);
    if(diff!==0) return diff;
    const nameA=String(a?.name||'');
    const nameB=String(b?.name||'');
    return nameA.localeCompare(nameB);
  }

  function signatureFor(list){
    if(!Array.isArray(list)) return '';
    return list.map(v=>[
      v?.voiceURI||'',
      v?.name||'',
      v?.lang||'',
      String(!!v?.localService),
      String(!!v?.default)
    ].join('::')).join('|');
  }

  function filterItalianVoices(list){
    if(!Array.isArray(list)) return [];
    const seen=new Set();
    const result=[];
    for(const voice of list){
      if(!isItalianVoice(voice)) continue;
      const key=`${voice.voiceURI||''}::${voice.name||''}`;
      if(seen.has(key)) continue;
      seen.add(key);
      result.push(voice);
    }
    return result;
  }

  return {
    ITALIAN_VOICE_HINTS,
    isItalianVoice,
    scoreVoice,
    compareVoices,
    signatureFor,
    filterItalianVoices
  };
});
