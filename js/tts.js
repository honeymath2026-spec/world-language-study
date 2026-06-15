// tts.js - 통합 음성 엔진
// v2.2 - 프랑스어 ," 패턴 완전 해결

const TTS = {
    currentLanguage: 'en',
    currentVoiceGender: 'female',
    currentVoiceType: 'us',
    currentRate: 1.0,
    
    availableVoices: [],
    selectedVoice: null,
    synth: window.speechSynthesis,
    
    voiceCache: {
        en: { female: { us: null, uk: null }, male: { uk: null } },
        fr: { female: null, male: null },
        ja: { female: null, male: null },
        ko: { female: null, male: null }
    },
    
    async init() {
        console.log('🎤 TTS initializing...');
        await this.loadVoices();
        this.loadSettings();
        this.updateSelectedVoice();
        console.log('✅ TTS initialized');
    },
    
    loadVoices() {
        return new Promise((resolve) => {
            const load = () => {
                this.availableVoices = this.synth.getVoices();
                this.categorizeVoices();
                console.log('🎤 Voices loaded:', this.availableVoices.length);
                resolve();
            };
            
            if (this.synth.getVoices().length > 0) {
                load();
            } else {
                this.synth.onvoiceschanged = load;
            }
        });
    },
    
    categorizeVoices() {
        this.voiceCache = {
            en: { female: { us: null, uk: null }, male: { uk: null } },
            fr: { female: null, male: null },
            ja: { female: null, male: null },
            ko: { female: null, male: null }
        };
        
        for (const voice of this.availableVoices) {
            const name = voice.name;
            const lang = voice.lang;
            
            if (lang === 'en-US') {
                this.voiceCache.en.female.us = voice;
            }
            if (lang === 'en-GB') {
                if (name.includes('Female')) this.voiceCache.en.female.uk = voice;
                if (name.includes('Male')) this.voiceCache.en.male.uk = voice;
            }
            if (lang === 'fr-FR') {
                this.voiceCache.fr.female = voice;
                this.voiceCache.fr.male = voice;
            }
            if (lang === 'ja-JP') {
                this.voiceCache.ja.female = voice;
                this.voiceCache.ja.male = voice;
            }
            if (lang === 'ko-KR') {
                this.voiceCache.ko.female = voice;
                this.voiceCache.ko.male = voice;
            }
        }
        
        const anyEnglish = this.availableVoices.find(v => v.lang.startsWith('en'));
        if (anyEnglish) {
            if (!this.voiceCache.en.female.us) this.voiceCache.en.female.us = anyEnglish;
            if (!this.voiceCache.en.female.uk) this.voiceCache.en.female.uk = anyEnglish;
            if (!this.voiceCache.en.male.uk) this.voiceCache.en.male.uk = anyEnglish;
        }
        
        console.log('🎤 Voice cache ready');
    },
    
    // 🔥 프랑스어 ," 패턴 완전 해결
    preprocessText(text, lang) {
        if (!text) return '';
        
        let result = text;
        
        if (lang === 'fr') {
            // 🔥 가장 중요: ," 패턴을 , 로 변경 (큰따옴표 제거)
            result = result.replace(/,\s*"/g, ', ');
            result = result.replace(/"\s*,/g, ', ');
            
            // 큰따옴표 모두 제거
            result = result.replace(/["]/g, '');
            
            // 작은따옴표는 보존 (축약형 D'où, l'école 등)
            // 단, 인용문 시작의 작은따옴표는 제거
            result = result.replace(/^['"]|['"]$/g, '');
            
            // 쉼표 뒤 공백 보장
            result = result.replace(/,([^\s])/g, ', $1');
            
            // 물음표/느낌표 정리
            result = result.replace(/\s+\?/g, ' ?');
            result = result.replace(/\s+!/g, ' !');
            
            // 여러 공백을 하나로
            result = result.replace(/\s+/g, ' ');
            
            result = result.trim();
            
            console.log(`📝 [FR] "${text.substring(0, 60)}..." → "${result.substring(0, 60)}..."`);
        } else if (lang === 'en') {
            result = result.replace(/,([^\s])/g, ', $1');
            result = result.replace(/\s+/g, ' ');
            result = result.trim();
        } else if (lang === 'ja') {
            result = result.replace(/[、，]/g, '、');
            result = result.replace(/\s+/g, '');
        }
        
        return result;
    },
    
    updateSelectedVoice() {
        const lang = this.currentLanguage;
        
        if (lang === 'en') {
            const gender = this.currentVoiceGender;
            const type = this.currentVoiceType;
            if (gender === 'female') {
                this.selectedVoice = this.voiceCache.en.female[type] || this.voiceCache.en.female.us;
            } else {
                this.selectedVoice = this.voiceCache.en.male.uk;
            }
        } 
        else if (lang === 'fr') {
            this.selectedVoice = this.voiceCache.fr.female;
        }
        else if (lang === 'ja') {
            this.selectedVoice = this.voiceCache.ja.female;
        }
        else if (lang === 'ko') {
            this.selectedVoice = this.voiceCache.ko.female;
        }
        
        console.log(`🎤 Selected voice for ${lang}: ${this.selectedVoice?.name || 'default'}`);
    },
    
    setLanguage(lang) {
        if (!['en', 'ja', 'fr', 'ko'].includes(lang)) return;
        this.currentLanguage = lang;
        this.updateSelectedVoice();
        this.saveSettings();
        console.log('🌐 Language set to:', lang);
    },
    
    setVoiceType(type) {
        if (this.currentLanguage === 'en' && (type === 'us' || type === 'uk')) {
            this.currentVoiceType = type;
            this.updateSelectedVoice();
            this.saveSettings();
        }
    },
    
    setGender(gender) {
        if (gender === 'female' || gender === 'male') {
            this.currentVoiceGender = gender;
            this.updateSelectedVoice();
            this.saveSettings();
        }
    },
    
    setRate(rate) {
        let newRate = parseFloat(rate);
        if (isNaN(newRate)) newRate = 1.0;
        newRate = Math.max(0.5, Math.min(1.5, newRate));
        this.currentRate = newRate;
        this.saveSettings();
    },
    
    speak(text, onEnd = null) {
        if (!text) return;
        
        const processedText = this.preprocessText(text, this.currentLanguage);
        
        this.synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(processedText);
        
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
            utterance.lang = this.selectedVoice.lang;
        } else {
            const langMap = { en: 'en-US', ja: 'ja-JP', fr: 'fr-FR', ko: 'ko-KR' };
            utterance.lang = langMap[this.currentLanguage] || 'en-US';
        }
        
        utterance.rate = this.currentRate;
        
        if (onEnd && typeof onEnd === 'function') {
            utterance.onend = onEnd;
        }
        
        utterance.onerror = (event) => {
            console.error('TTS error:', event);
            if (onEnd) onEnd();
        };
        
        this.synth.speak(utterance);
    },
    
    stop() {
        this.synth.cancel();
    },
    
    saveSettings() {
        localStorage.setItem('tts_settings', JSON.stringify({
            language: this.currentLanguage,
            voiceType: this.currentVoiceType,
            gender: this.currentVoiceGender,
            rate: this.currentRate
        }));
    },
    
    loadSettings() {
        const saved = localStorage.getItem('tts_settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.currentLanguage = settings.language || 'en';
                this.currentVoiceType = settings.voiceType || 'us';
                this.currentVoiceGender = settings.gender || 'female';
                this.currentRate = settings.rate || 1.0;
                console.log('📀 Settings loaded');
            } catch (e) {}
        }
    },
    
    getCurrentSettings() {
        return {
            language: this.currentLanguage,
            voiceType: this.currentVoiceType,
            gender: this.currentVoiceGender,
            rate: this.currentRate,
            voiceName: this.selectedVoice?.name || 'Default'
        };
    }
};

window.TTS = TTS;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TTS.init());
} else {
    TTS.init();
}
