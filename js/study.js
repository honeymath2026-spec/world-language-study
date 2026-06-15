// study.js - 통합 학습 페이지 기능 (다국어 지원)
// 템플릿에서 공통 함수로 사용됨 (study.html은 더 이상 사용하지 않음)

// ===== 커스텀 모달 추가 (시작) =====

// 다국어 모달 텍스트
const modalI18n = {
    en: { 
        message: "Saved! Go to Drill Center?", 
        cancel: "Cancel", 
        confirm: "OK",
        already_saved: "⚠️ Already saved in Drill Center!"
    },
    ja: { 
        message: "保存しました！ドリルセンターに移動しますか？", 
        cancel: "キャンセル", 
        confirm: "OK",
        already_saved: "⚠️ すでにドリルセンターに保存されています！"
    },
    fr: { 
        message: "Enregistré ! Aller au centre d'exercices ?", 
        cancel: "Annuler", 
        confirm: "OK",
        already_saved: "⚠️ Déjà enregistré dans le centre d'exercices !"
    },
    ko: { 
        message: "저장됨! 드릴센터로 이동?", 
        cancel: "취소", 
        confirm: "확인",
        already_saved: "⚠️ 이미 드릴센터에 저장된 문장입니다!"
    }
};

// 커스텀 확인 모달 함수
function showConfirmModal(message, onConfirm, onCancel) {
    const existingModal = document.getElementById('customConfirmModal');
    if (existingModal) existingModal.remove();
    
    const modalHtml = `
        <div id="customConfirmModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        ">
            <div style="
                background: white;
                border-radius: 12px;
                padding: 20px;
                min-width: 280px;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            ">
                <p style="margin-bottom: 20px; font-size: 16px;">${message}</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="modalCancelBtn" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 8px;
                        background: #95a5a6;
                        color: white;
                        cursor: pointer;
                    ">취소</button>
                    <button id="modalConfirmBtn" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 8px;
                        background: #27ae60;
                        color: white;
                        cursor: pointer;
                    ">확인</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('customConfirmModal');
    const cancelBtn = document.getElementById('modalCancelBtn');
    const confirmBtn = document.getElementById('modalConfirmBtn');
    
    const closeModal = (result) => {
        modal.remove();
        if (result && onConfirm) onConfirm();
        else if (!result && onCancel) onCancel();
    };
    
    cancelBtn.addEventListener('click', () => closeModal(false));
    confirmBtn.addEventListener('click', () => closeModal(true));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(false);
    });
}

// ===== 커스텀 모달 추가 (끝) =====

// ==================== 글로벌 상태 (템플릿에서 설정) ====================
let currentLanguage = 'en';
let currentLevel = 'beginner';
let currentSeries = 'core';
let currentUnit = 1;

// ==================== 녹음 관련 전역 변수 ====================
let mediaRecorder = null;
let audioChunksUrl = {};
let audioChunksBlob = {};

// ==================== SPEAKING FUNCTIONS ====================

// TTS 음성 출력 (tts.js 사용)
function speakText(text) {
    if (window.TTS) TTS.speak(text);
}

// 녹음 시작/중지
async function startRecording(btn, index) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        
        recorder.ondataavailable = event => { chunks.push(event.data); };
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            if (audioChunksUrl[index]) URL.revokeObjectURL(audioChunksUrl[index]);
            audioChunksUrl[index] = url;
            audioChunksBlob[index] = blob;
            
            const playBtn = document.getElementById(`play-${index}`);
            if (playBtn) playBtn.style.display = 'inline-flex';
            const downloadBtn = document.getElementById(`download-${index}`);
            if (downloadBtn) downloadBtn.style.display = 'inline-flex';
            const transcribeBtn = document.getElementById(`transcribe-${index}`);
            if (transcribeBtn) transcribeBtn.style.display = 'inline-flex';
            stream.getTracks().forEach(track => track.stop());
        };
        
        recorder.start();
        btn.textContent = '⏹';
        btn.style.background = '#000';
        btn.classList.add('recording');
        mediaRecorder = recorder;
        
        btn.onclick = () => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                btn.textContent = '🎤';
                btn.style.background = '';
                btn.classList.remove('recording');
                btn.onclick = () => startRecording(btn, index);
            }
        };
    } catch (error) {
        alert('Microphone access denied.');
    }
}

// 녹음된 음성 재생
function playMyVoice(index) {
    if (audioChunksUrl[index]) {
        new Audio(audioChunksUrl[index]).play();
    } else {
        alert('Please record first.');
    }
}

// 녹음 파일 다운로드
function downloadRecording(index) {
    if (audioChunksBlob[index]) {
        const blob = audioChunksBlob[index];
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `recording_${index+1}.webm`;
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        alert('No recording to download.');
    }
}

// ==================== STT (Speech to Text) ====================

// 음성 인식 (전사)
async function transcribeRecording(index) {
    const existingResult = document.getElementById(`transcript-result-${index}`);
    if (existingResult && existingResult.innerHTML.trim() !== '') {
        existingResult.innerHTML = '';
        existingResult.style.display = 'none';
        return;
    }
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported. Please use Chrome, Edge, or Safari.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const langMap = { en: 'en-US', ja: 'ja-JP', fr: 'fr-FR', ko: 'ko-KR' };
    recognition.lang = langMap[currentLanguage] || 'en-US';
    
    let recognizedText = '';
    recognition.onresult = (event) => { recognizedText = event.results[0][0].transcript; };
    recognition.onerror = (event) => { alert(`Recognition error: ${event.error}`); };
    recognition.onend = () => { 
        const expectedText = getExpectedTextForIndex(index);
        const accuracy = calculateAccuracy(recognizedText, expectedText);
        showTranscriptionResult(index, recognizedText, expectedText, accuracy);
        
        // ✅ 녹음 상태 메시지 제거
        const statusDiv = document.getElementById(`transcribe-status-${index}`);
        if (statusDiv) statusDiv.remove();
    };
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = () => {
            if (chunks.length) {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                if (audioChunksUrl[index]) URL.revokeObjectURL(audioChunksUrl[index]);
                audioChunksBlob[index] = blob;
                audioChunksUrl[index] = URL.createObjectURL(blob);
                const playBtn = document.getElementById(`play-${index}`);
                if (playBtn) playBtn.style.display = 'inline-flex';
                const downloadBtn = document.getElementById(`download-${index}`);
                if (downloadBtn) downloadBtn.style.display = 'inline-flex';
            }
            stream.getTracks().forEach(track => track.stop());
        };
        recorder.start();
        recognition.start();
        
        const card = document.getElementById(`speaking-card-${index}`);
        if (card) {
            let statusDiv = document.getElementById(`transcribe-status-${index}`);
            if (!statusDiv) {
                statusDiv = document.createElement('div');
                statusDiv.id = `transcribe-status-${index}`;
                statusDiv.style.cssText = 'padding:8px;background:#fce4ec;border-radius:8px;margin-top:8px;font-size:12px;';
                card.appendChild(statusDiv);
            }
            const listeningTexts = { 
                en: '🎤 Listening... Please speak', 
                ja: '🎤 聞いています... 話してください', 
                fr: '🎤 Écoute... Parlez', 
                ko: '🎤 듣고 있습니다... 말씀해주세요' 
            };
            statusDiv.innerHTML = `${listeningTexts[currentLanguage] || listeningTexts.en}`;
            
            // 10초 후에도 인식이 끝나지 않으면 강제 종료
            setTimeout(() => {
                if (recorder.state === 'recording') {
                    recorder.stop();
                }
                if (recognition && recognition.state !== 'ended') {
                    recognition.stop();
                }
                const status = document.getElementById(`transcribe-status-${index}`);
                if (status) status.remove();
            }, 10000);
        }
    } catch (err) { 
        alert('Microphone access denied.');
        // 에러 시 상태 메시지 제거
        const statusDiv = document.getElementById(`transcribe-status-${index}`);
        if (statusDiv) statusDiv.remove();
    }
}

function getExpectedTextForIndex(index) {
    const card = document.getElementById(`speaking-card-${index}`);
    if (card) {
        return card.dataset.chunk || '';
    }
    return '';
}

function calculateAccuracy(recognizedText, expectedText) {
    if (!recognizedText) return 0;
    
    const normalize = (text, lang) => {
        let result = text;
        if (lang === 'ja') {
            result = result.replace(/[！？。、「」”'"!?.,:;]/g, '');
            result = result.replace(/\s+/g, '');
            result = result.replace(/[ァ-ヶ]/g, m => String.fromCharCode(m.charCodeAt(0) - 0x60));
        } else {
            result = result.toLowerCase();
            result = result.replace(/[.!?,'"]/g, '');
            result = result.replace(/\s+/g, ' ');
        }
        return result;
    };
    
    const normalizedRecognized = normalize(recognizedText, currentLanguage);
    const normalizedExpected = normalize(expectedText, currentLanguage);
    
    if (normalizedRecognized === normalizedExpected) return 100;
    
    const recChars = normalizedRecognized.split('');
    const expChars = normalizedExpected.split('');
    let matchedCount = 0;
    const usedExp = new Array(expChars.length).fill(false);
    
    for (let i = 0; i < recChars.length; i++) {
        for (let j = 0; j < expChars.length; j++) {
            if (usedExp[j]) continue;
            if (recChars[i] === expChars[j]) {
                matchedCount++;
                usedExp[j] = true;
                break;
            }
        }
    }
    
    return Math.min(100, Math.round((matchedCount / expChars.length) * 100));
}

function getDifficultyLevel(accuracy) {
    const levels = {
        en: { excellent: 'Excellent', good: 'Good', average: 'Average', needs_work: 'Needs work', poor: 'Poor' },
        ja: { excellent: '優秀', good: '良い', average: '普通', needs_work: '要練習', poor: '不良' },
        fr: { excellent: 'Excellent', good: 'Bon', average: 'Moyen', needs_work: 'À améliorer', poor: 'Faible' },
        ko: { excellent: '우수', good: '좋음', average: '보통', needs_work: '연습 필요', poor: '미흡' }
    };
    const l = levels[currentLanguage] || levels.en;
    
    if (accuracy >= 90) return { stars: '⭐', text: l.excellent };
    if (accuracy >= 70) return { stars: '⭐⭐', text: l.good };
    if (accuracy >= 50) return { stars: '⭐⭐⭐', text: l.average };
    if (accuracy >= 30) return { stars: '⭐⭐⭐⭐', text: l.needs_work };
    return { stars: '⭐⭐⭐⭐⭐', text: l.poor };
}

function showTranscriptionResult(index, text, expectedText, accuracy) {
    const resultDiv = document.getElementById(`transcript-result-${index}`);
    const diff = getDifficultyLevel(accuracy);
    
    const texts = {
        en: { 
            accuracy: 'Accuracy', recognized: 'Your pronunciation', 
            expected: 'Expected', note: 'Similar words or partial matches also affect the score.', 
            copy: 'Copy', close: 'Close' 
        },
        ko: { 
            accuracy: '정확도', recognized: '당신의 발음', 
            expected: '정답', note: '비슷한 단어나 부분 일치도 점수에 영향을 줍니다.', 
            copy: '복사', close: '닫기' 
        },
        ja: { 
            accuracy: '正解率', recognized: 'あなたの発音', 
            expected: '正解', note: '類似した単語や部分一致もスコアに影響します。', 
            copy: 'コピー', close: '閉じる' 
        },
        fr: { 
            accuracy: 'Précision', recognized: 'Votre prononciation', 
            expected: 'Attendu', note: 'Les mots similaires ou les correspondances partielles affectent également le score.', 
            copy: 'Copier', close: 'Fermer' 
        }
    };
    const t = texts[currentLanguage] || texts.en;
    
    // 정답 단어 수 계산
    const expectedWords = expectedText.toLowerCase().trim().split(/\s+/);
    const recognizedWords = text ? text.toLowerCase().trim().split(/\s+/) : [];
    let matchedCount = 0;
    const usedExpected = new Array(expectedWords.length).fill(false);
    
    for (let i = 0; i < recognizedWords.length; i++) {
        for (let j = 0; j < expectedWords.length; j++) {
            if (!usedExpected[j] && recognizedWords[i] === expectedWords[j]) {
                matchedCount++;
                usedExpected[j] = true;
                break;
            }
        }
    }
    
    // 한글/일본어 등은 공백 없이 문자 단위로 비교 (선택사항)
    let displayAccuracy = accuracy;
    let displayMatched = matchedCount;
    let displayTotal = expectedWords.length;
    
    // 결과 HTML - 줄바꿈 적용
    const resultHtml = `
        <div style="background:#fff; border:2px solid ${accuracy >= 70 ? '#27ae60' : '#9b59b6'}; border-radius:8px; padding:12px; margin-top:10px;">
            <div style="margin-bottom:8px;">
                <strong>🎯 ${t.accuracy}: ${displayAccuracy}%</strong> <span style="color:#666;">(${diff.stars} ${diff.text})</span>
            </div>
            <div style="margin-bottom:8px;">
                <strong>✅ 정답:</strong> ${displayMatched}/${displayTotal}
            </div>
            <div style="background:#f8f9fa; padding:10px; border-radius:8px; margin-bottom:8px;">
                <div style="margin-bottom:4px;"><strong>📝 ${t.recognized}:</strong></div>
                <div style="margin-left:12px;">"${text || '...'}"</div>
            </div>
            <div style="background:#f8f9fa; padding:10px; border-radius:8px; margin-bottom:8px;">
                <div style="margin-bottom:4px;"><strong>🎯 ${t.expected}:</strong></div>
                <div style="margin-left:12px;">"${escapeHtml(expectedText)}"</div>
            </div>
            <div style="font-size:0.75rem; color:#666; padding:6px; background:#f0f0f0; border-radius:6px; margin-bottom:8px;">
                💡 ${t.note}
            </div>
            <div style="display:flex; gap:8px; justify-content:flex-end;">
                <button onclick="copyToClipboard('${(text || '').replace(/'/g, "\\'")}')" style="background:#e1bee7; border:none; border-radius:5px; padding:4px 10px; cursor:pointer;">📋 ${t.copy}</button>
                <button onclick="this.closest('.transcript-result').style.display='none'" style="background:#e74c3c; border:none; border-radius:5px; padding:4px 10px; color:white; cursor:pointer;">✖ ${t.close}</button>
            </div>
        </div>
    `;
    
    if (resultDiv) {
        resultDiv.innerHTML = resultHtml;
        resultDiv.style.display = 'block';
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => alert('Copied!')).catch(() => alert('Failed to copy'));
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== TRUE/FALSE QUIZ ====================

function selectTF(btn, val) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.tf-btn').forEach(b => {
        b.style.background = '#fff';
        b.style.color = '#333';
        b.classList.remove('selected');
    });
    btn.style.background = '#333';
    btn.style.color = '#fff';
    btn.classList.add('selected');
    btn.dataset.value = val;
}

function validateTF(rowId, correctVal, explanation) {
    const row = document.getElementById(rowId);
    const selectedBtn = row.querySelector('.tf-btn.selected');
    const ansText = row.querySelector('.answer-text');
    
    if (ansText.style.display === 'block') {
        ansText.style.display = 'none';
        row.style.background = '#fff';
        return;
    }
    
    if (!selectedBtn) {
        alert("Please select T or F first!");
        return;
    }
    
    const userVal = selectedBtn.dataset.value;
    ansText.style.display = 'block';
    ansText.innerHTML = explanation;
    
    if (userVal === correctVal) {
        row.style.background = '#e8f5e9';
        ansText.style.color = '#2e7d32';
    } else {
        row.style.background = '#ffebee';
        ansText.style.color = '#c62828';
    }
}

// ==================== VOCABULARY CHECK ====================
function checkVocab(btn) {
    const container = btn.parentElement;
    const select = container.querySelector('.vocab-select');
    const answerSpan = container.querySelector('.vocab-answer');
    const selectedValue = select.value;
    const correctAnswer = answerSpan.getAttribute('data-correct');
    
    if (!selectedValue) {
        alert("Please select an answer first!");
        return;
    }
    
    if (selectedValue === correctAnswer) {
        answerSpan.style.display = 'inline';
        answerSpan.style.color = '#27ae60';
        answerSpan.innerHTML = `✓ Correct!`;
        
        // ✅ 버튼 비활성화 제거 (다시 누를 수 있음)
        // btn.disabled = true;  ← 이 줄 삭제!
        // btn.style.background = '#27ae60';  ← 필요 없으면 삭제
        
        // 2초 후에 메시지만 사라짐 (버튼은 계속 활성화)
        setTimeout(() => {
            answerSpan.style.display = 'none';
        }, 2000);
        
    } else {
        answerSpan.style.display = 'inline';
        answerSpan.style.color = '#e53e3e';
        answerSpan.innerHTML = `✗ Wrong. Try again!`;
        
        setTimeout(() => {
            answerSpan.style.display = 'none';
        }, 2000);
    }
}

// ==================== DRILL CENTER SAVE ====================

function saveChunkToDrillCenter(chunkText) {
    const storageKey = `${currentLanguage}_${currentLevel}_${currentSeries}_chunks`;
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (saved.some(chunk => chunk.chunkText === chunkText)) {
        const alertTexts = modalI18n[currentLanguage] || modalI18n.ko;
        alert(alertTexts.already_saved);
        return;
    }
    
    saved.push({ 
        chunkText, 
        language: currentLanguage, 
        level: currentLevel, 
        series: currentSeries, 
        unit: currentUnit, 
        savedAt: new Date().toISOString() 
    });
    
    localStorage.setItem(storageKey, JSON.stringify(saved));
    const modalTexts = modalI18n[currentLanguage] || modalI18n.ko;
    showConfirmModal(modalTexts.message, () => {
        window.location.href = `drill_center.html?lang=${currentLanguage}&level=${currentLevel}&series=${currentSeries}`;
    }, () => {});
}

// ==================== Study 객체 (메타 정보 저장용) ====================
const Study = {
    currentLanguage: 'en',
    currentLevel: 'beginner',
    currentSeries: 'core',
    currentUnit: 1,
    
    // 템플릿에서 설정할 수 있도록 setter
    setLanguage(lang) { 
        currentLanguage = lang;
        this.currentLanguage = lang;
        if (window.TTS) TTS.setLanguage(lang);
    },
    setLevel(level) { 
        currentLevel = level;
        this.currentLevel = level;
    },
    setSeries(series) { 
        currentSeries = series;
        this.currentSeries = series;
    },
    setUnit(unit) { 
        currentUnit = unit;
        this.currentUnit = unit;
    },
    
    // 현재 설정 반환
    getSettings() {
        return {
            language: currentLanguage,
            level: currentLevel,
            series: currentSeries,
            unit: currentUnit
        };
    }
};


// ==================== VOCABULARY SCROLL FUNCTIONS ====================
function scrollToCard(cardId) {
    const element = document.getElementById(cardId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.transition = 'background 0.3s';
        element.style.background = '#fff59d';
        setTimeout(() => { element.style.background = ''; }, 1500);
    }
}

function scrollToText(textId) {
    const element = document.getElementById(textId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.transition = 'background 0.3s';
        element.style.background = '#fff59d';
        setTimeout(() => { element.style.background = ''; }, 1500);
    }
}

// 전역 함수로 노출
window.scrollToCard = scrollToCard;
window.scrollToText = scrollToText;
window.startRecording = startRecording;
window.playMyVoice = playMyVoice;
window.downloadRecording = downloadRecording;
window.transcribeRecording = transcribeRecording;
window.speakText = speakText;
window.selectTF = selectTF;
window.validateTF = validateTF;
window.saveChunkToDrillCenter = saveChunkToDrillCenter;
window.copyToClipboard = copyToClipboard;
window.Study = Study;
window.checkVocab = checkVocab;

// TTS 초기화 (필요시)
if (window.TTS && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TTS.init());
} else if (window.TTS) {
    TTS.init();
}
