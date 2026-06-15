// utils.js - 공통 유틸리티 함수 모음
// 통합 언어 학습 플랫폼

const Utils = {
    // ==================== DOM 관련 ====================
    
    // 요소 가져오기 (에러 처리 포함)
    getElement(id) {
        const el = document.getElementById(id);
        if (!el) {
            console.warn(`Element not found: ${id}`);
        }
        return el;
    },
    
    // 요소 존재 확인
    elementExists(id) {
        return !!document.getElementById(id);
    },
    
    // 여러 요소 한 번에 가져오기
    getElements(ids) {
        const result = {};
        ids.forEach(id => {
            result[id] = this.getElement(id);
        });
        return result;
    },
    
    // ==================== localStorage 관련 ====================
    
    // 저장
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },
    
    // 불러오기
    getStorage(key, defaultValue = null) {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : defaultValue;
        } catch (e) {
            console.error('Storage load error:', e);
            return defaultValue;
        }
    },
    
    // 삭제
    removeStorage(key) {
        localStorage.removeItem(key);
    },
    
    // 특정 prefix로 시작하는 모든 키 삭제
    clearStorageByPrefix(prefix) {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
            }
        });
    },
    
    // ==================== URL 관련 ====================
    
    // URL 파라미터 가져오기
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },
    
    // URL 파라미터 설정 (페이지 리로드 없이)
    setUrlParams(params, replace = true) {
        const url = new URL(window.location.href);
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, value);
        }
        if (replace) {
            window.history.replaceState({}, '', url);
        } else {
            window.history.pushState({}, '', url);
        }
    },
    
    // 특정 파라미터 삭제
    removeUrlParam(key, replace = true) {
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        if (replace) {
            window.history.replaceState({}, '', url);
        } else {
            window.history.pushState({}, '', url);
        }
    },
    
    // ==================== 문자열 처리 ====================
    
    // HTML 이스케이프 (XSS 방지)
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // HTML 언이스케이프
    unescapeHtml(html) {
        if (!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent;
    },
    
    // 문자열 자르기 (말줄임표)
    truncate(text, maxLength, suffix = '...') {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + suffix;
    },
    
    // 첫 글자 대문자로
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    // 각 단어의 첫 글자 대문자로
    titleCase(str) {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    },
    
    // ==================== 날짜/시간 ====================
    
    // 날짜 포맷 (YYYY-MM-DD)
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = date instanceof Date ? date : new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes);
    },
    
    // 상대적 시간 표현 (몇 분 전, 몇 시간 전 등)
    timeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diff = Math.floor((now - past) / 1000);
        
        if (diff < 60) return `${diff}초 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
        return this.formatDate(past);
    },
    
    // ==================== 배열/객체 처리 ====================
    
    // 배열 섞기 (Fisher-Yates)
    shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // 중복 제거
    uniqueArray(arr) {
        return [...new Set(arr)];
    },
    
    // 배열을 청크 단위로 분할
    chunkArray(arr, size) {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    },
    
    // 객체에서 null/undefined 값 제거
    cleanObject(obj) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined && value !== '') {
                result[key] = value;
            }
        }
        return result;
    },
    
    // ==================== 숫자 처리 ====================
    
    // 퍼센트 계산
    getPercentage(value, total, decimals = 0) {
        if (total === 0) return 0;
        const percent = (value / total) * 100;
        return decimals === 0 ? Math.round(percent) : percent.toFixed(decimals);
    },
    
    // 숫자에 쉼표 추가
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // 범위 내 숫자로 제한
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },
    
    // ==================== 레벤슈타인 거리 (문자열 유사도) ====================
    
    levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    },
    
    // 문자열 유사도 (0-100%)
    stringSimilarity(a, b) {
        if (!a || !b) return 0;
        const distance = this.levenshteinDistance(a.toLowerCase(), b.toLowerCase());
        const maxLen = Math.max(a.length, b.length);
        if (maxLen === 0) return 100;
        return Math.round((1 - distance / maxLen) * 100);
    },
    
    // ==================== 음성 관련 ====================
    
    // 텍스트 정규화 (발음 평가용)
    normalizeText(text, language = 'en') {
        if (!text) return '';
        let result = text.toLowerCase().trim();
        
        // 쉼표, 마침표 등 문장부호 제거
        result = result.replace(/[.,!?;:()[\]{}"'\-–—]/g, '');
        
        // 여러 공백을 하나로
        result = result.replace(/\s+/g, ' ');
        
        // 언어별 특수 처리
        if (language === 'ja') {
            // 일본어: 카타카나 → 히라가나
            result = result.replace(/[ァ-ヶ]/g, (m) => {
                return String.fromCharCode(m.charCodeAt(0) - 0x60);
            });
            // 한자 제거 (초급 단계)
            result = result.replace(/[\u4e00-\u9fff]/g, '');
        }
        
        return result.trim();
    },
    
    // ==================== 디바운스 / 쓰로틀 ====================
    
    // 디바운스 (입력 지연)
    debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    // 쓰로틀 (실행 간격 제한)
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // ==================== 클립보드 ====================
    
    // 텍스트 복사
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Copy failed:', err);
            // 폴백: textarea 사용
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        }
    },
    
    // ==================== 디바이스/브라우저 감지 ====================
    
    // 모바일 여부
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // 브라우저 정보
    getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.indexOf('Chrome') > -1) return 'Chrome';
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('Safari') > -1) return 'Safari';
        if (ua.indexOf('Edge') > -1) return 'Edge';
        return 'Unknown';
    },
    
    // 음성 인식 지원 여부
    isSpeechRecognitionSupported() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },
    
    // TTS 지원 여부
    isSpeechSynthesisSupported() {
        return 'speechSynthesis' in window;
    },
    
    // ==================== 에러 처리 ====================
    
    // 에러 로깅
    logError(error, context = '') {
        console.error(`[${context}]`, error);
        
        // 오류 보고 (개발 중)
        if (window.onerror) {
            window.onerror(error.message, context, 0, 0, error);
        }
    },
    
    // 안전한 JSON 파싱
    safeJsonParse(str, defaultValue = null) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return defaultValue;
        }
    },
    
    // ==================== 랜덤 ====================
    
    // 랜덤 ID 생성
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // 범위 내 랜덤 숫자
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // 배열에서 랜덤 요소 선택
    randomItem(arr) {
        if (!arr.length) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

// 전역 노출
window.Utils = Utils;
