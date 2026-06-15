// drill.js - 통합 드릴센터 기능 (완전 다국어)

const drillI18n = {
    en: {
        page_title: "Speaking Drill Center",
        drill_title: "Speaking Drill Center",
        drill_subtitle: "Practice pronunciation with saved sentences | Language · Level based learning",
        listen: "Listen",
        record: "Record",
        play: "Play",
        transcribe: "Speech Recognition",
        goto_unit: "Go to Unit",
        delete: "Delete",
        best: "Best",
        recent: "Recent",
        practiced: "Practiced",
        attempts: "Attempts",
        progress: "Progress",
        no_sentences: "No saved sentences",
        no_sentences_desc: "Press the 📦 button in the learning page to save difficult sentences.",
        export: "Export",
        clear_all: "Clear All",
        saved_sentences: "Saved Sentences",
        learning_units: "Learning Units",
        avg_accuracy: "Avg Accuracy",
        stop: "Stop",
        record_start: "Record",
        listening: "Listening... Please speak",
        accuracy: "Accuracy",
        correct: "Correct",
        answer: "Answer",
        copy: "Copy",
        close: "Close",
        confirm_delete: "Delete this sentence?",
        confirm_clear: "Delete all sentences? This cannot be undone.",
        no_chunks: "No sentences to export.",
        import_complete: "Import complete!",
        invalid_file: "Invalid file format.",
        parse_error: "File parsing error.",
        language: "Language",
        english_pron: "English Pronunciation",
        gender: "Gender",
        female: "Female",
        male: "Male",
        speed: "Speed",
        back: "Dashboard",
        footer: "© 2025 Unified Language Learning Platform | Pronunciation · Statistics · Intensive Practice"
    },
    ja: {
        page_title: "スピーキングドリルセンター",
        drill_title: "スピーキングドリルセンター",
        drill_subtitle: "保存した文章で発音集中練習 | 言語別・レベル別学習管理",
        listen: "聞く",
        record: "録音",
        play: "再生",
        transcribe: "音声認識",
        goto_unit: "ユニットへ",
        delete: "削除",
        best: "最高",
        recent: "最近",
        practiced: "練習日",
        attempts: "試行",
        progress: "進捗",
        no_sentences: "保存された文がありません",
        no_sentences_desc: "学習ページで 📦 ボタンを押して難しい文を保存してください。",
        export: "エクスポート",
        clear_all: "すべて削除",
        saved_sentences: "保存された文",
        learning_units: "学習ユニット",
        avg_accuracy: "平均精度",
        stop: "停止",
        record_start: "録音",
        listening: "聞いています... 話してください",
        accuracy: "正解率",
        correct: "正解",
        answer: "解答",
        copy: "コピー",
        close: "閉じる",
        confirm_delete: "この文を削除しますか？",
        confirm_clear: "すべての文を削除しますか？戻せません。",
        no_chunks: "エクスポートする文がありません。",
        import_complete: "インポート完了！",
        invalid_file: "無効なファイル形式です。",
        parse_error: "ファイル解析エラー。",
        language: "言語",
        english_pron: "英語の発音",
        gender: "性別",
        female: "女性",
        male: "男性",
        speed: "速度",
        back: "ダッシュボード",
        footer: "© 2025 統合言語学習プラットフォーム | 発音評価 · 統計追跡 · 集中練習"
    },
    fr: {
        page_title: "Centre d'exercices d'expression orale",
        drill_title: "Centre d'exercices d'expression orale",
        drill_subtitle: "Entraînement intensif à la prononciation | Apprentissage par langue · niveau",
        listen: "Écouter",
        record: "Enregistrer",
        play: "Lire",
        transcribe: "Reconnaissance vocale",
        goto_unit: "Aller à l'unité",
        delete: "Supprimer",
        best: "Meilleur",
        recent: "Récent",
        practiced: "Pratiqué le",
        attempts: "Tentatives",
        progress: "Progrès",
        no_sentences: "Aucune phrase sauvegardée",
        no_sentences_desc: "Appuyez sur le bouton 📦 dans la page d'apprentissage pour sauvegarder les phrases difficiles.",
        export: "Exporter",
        clear_all: "Tout effacer",
        saved_sentences: "Phrases sauvegardées",
        learning_units: "Unités d'apprentissage",
        avg_accuracy: "Précision moyenne",
        stop: "Arrêter",
        record_start: "Enregistrer",
        listening: "Écoute... Parlez s'il vous plaît",
        accuracy: "Précision",
        correct: "Correct",
        answer: "Réponse",
        copy: "Copier",
        close: "Fermer",
        confirm_delete: "Supprimer cette phrase ?",
        confirm_clear: "Supprimer toutes les phrases ? Irréversible.",
        no_chunks: "Aucune phrase à exporter.",
        import_complete: "Import terminé !",
        invalid_file: "Format de fichier invalide.",
        parse_error: "Erreur d'analyse du fichier.",
        language: "Langue",
        english_pron: "Prononciation anglaise",
        gender: "Genre",
        female: "Femme",
        male: "Homme",
        speed: "Vitesse",
        back: "Tableau de bord",
        footer: "© 2025 Plateforme d'apprentissage des langues | Prononciation · Statistiques · Pratique intensive"
    },
    ko: {
        page_title: "스피킹 드릴센터",
        drill_title: "스피킹 드릴센터",
        drill_subtitle: "저장한 문장으로 발음 집중 연습 | 언어별 · 레벨별 학습 관리",
        listen: "듣기",
        record: "녹음",
        play: "재생",
        transcribe: "음성인식",
        goto_unit: "유닛 이동",
        delete: "삭제",
        best: "최고",
        recent: "최근",
        practiced: "연습일",
        attempts: "시도",
        progress: "진행률",
        no_sentences: "저장된 문장이 없습니다",
        no_sentences_desc: "학습 페이지에서 📦 버튼을 눌러 어려운 문장을 저장하세요.",
        export: "내보내기",
        clear_all: "전체 삭제",
        saved_sentences: "저장된 문장",
        learning_units: "학습 유닛",
        avg_accuracy: "평균 정확도",
        stop: "정지",
        record_start: "녹음",
        listening: "듣고 있습니다... 말씀해주세요",
        accuracy: "정확도",
        correct: "정답",
        answer: "정답",
        copy: "복사",
        close: "닫기",
        confirm_delete: "이 문장을 삭제하시겠습니까?",
        confirm_clear: "모든 문장을 삭제하시겠습니까? 되돌릴 수 없습니다.",
        no_chunks: "내보낼 문장이 없습니다.",
        import_complete: "가져오기 완료!",
        invalid_file: "잘못된 파일 형식입니다.",
        parse_error: "파일 파싱 오류",
        language: "언어",
        english_pron: "영어 발음",
        gender: "성별",
        female: "여성",
        male: "남성",
        speed: "속도",
        back: "대시보드",
        footer: "© 2025 통합 언어 학습 플랫폼 | 발음 평가 · 통계 추적 · 집중 연습"
    }
};

const DrillCenter = {
    currentLanguage: 'en',
    currentLevel: 'beginner',
    currentSeries: 'core',
    mediaRecorder: null,
    audioChunksUrl: {},
    audioChunksBlob: {},
    transcribeSessions: {},
    elements: {},
    openUnits: new Set(),

    async init() {
        console.log('🎯 Drill Center initializing...');
        this.parseUrlParams();
        this.cacheElements();
        if (window.TTS) { await TTS.init(); TTS.setLanguage(this.currentLanguage); }
        if (window.Database) { await Database.init(this.currentLevel, this.currentSeries); }
        this.bindEvents();
        // 약간의 지연 후 UI 업데이트 (DOM 완전 로드 보장)
        setTimeout(() => {
            this.updateFullUILanguage();
            this.loadChunks();
        }, 100);
        console.log(`✅ Drill Center ready! (${this.currentLanguage}/${this.currentLevel}/${this.currentSeries})`);
    },

    parseUrlParams() {
        const params = new URLSearchParams(window.location.search);
        this.currentLanguage = params.get('lang') || localStorage.getItem('drill_language') || 'en';
        this.currentLevel = params.get('level') || localStorage.getItem('drill_level') || 'beginner';
        this.currentSeries = params.get('series') || localStorage.getItem('drill_series') || 'core';
        localStorage.setItem('drill_language', this.currentLanguage);
        localStorage.setItem('drill_level', this.currentLevel);
        localStorage.setItem('drill_series', this.currentSeries);
    },

    cacheElements() {
        this.elements = {
            totalChunks: document.getElementById('totalChunks'),
            totalUnits: document.getElementById('totalUnits'),
            overallAccuracy: document.getElementById('overallAccuracy'),
            chunksContainer: document.getElementById('chunksContainer'),
            voiceLanguage: document.getElementById('voice-language'),
            voiceType: document.getElementById('voice-type'),
            voiceGender: document.getElementById('voice-gender'),
            voiceRate: document.getElementById('voice-rate'),
            rateValue: document.getElementById('rate-value')
        };
    },

    updateFullUILanguage() {
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        
        console.log('🎨 Updating UI to:', this.currentLanguage);
        
        // 헤더/타이틀
        const pageTitle = document.getElementById('pageTitle');
        const drillTitle = document.getElementById('drillTitle');
        const drillSubtitle = document.getElementById('drillSubtitle');
        if (pageTitle) pageTitle.textContent = texts.page_title;
        if (drillTitle) drillTitle.innerHTML = '<i class="fas fa-fire"></i> ' + texts.drill_title;
        if (drillSubtitle) drillSubtitle.textContent = texts.drill_subtitle;
        
        // 통계 라벨
        const statSaved = document.getElementById('statSavedSentences');
        const statUnits = document.getElementById('statLearningUnits');
        const statAcc = document.getElementById('statAvgAccuracy');
        if (statSaved) statSaved.textContent = texts.saved_sentences;
        if (statUnits) statUnits.textContent = texts.learning_units;
        if (statAcc) statAcc.textContent = texts.avg_accuracy;
        
        // 버튼 텍스트
        const btnExportText = document.getElementById('btnExportText');
        const btnClearText = document.getElementById('btnClearText');
        if (btnExportText) btnExportText.textContent = texts.export;
        if (btnClearText) btnClearText.textContent = texts.clear_all;
        
        // 빈 메시지
        const emptyTitle = document.getElementById('emptyTitle');
        const emptyDesc = document.getElementById('emptyDesc');
        if (emptyTitle) emptyTitle.textContent = texts.no_sentences;
        if (emptyDesc) emptyDesc.textContent = texts.no_sentences_desc;
        
        // 푸터
        const footerText = document.getElementById('footerText');
        if (footerText) footerText.textContent = texts.footer;
        
        // 하단 링크
        const backLink = document.getElementById('backToDashboard');
        if (backLink) backLink.textContent = texts.back;
        
        // 음성 설정 라벨
        const labelLanguage = document.getElementById('labelLanguage');
        const labelEnglishPron = document.getElementById('labelEnglishPron');
        const labelGender = document.getElementById('labelGender');
        const labelSpeed = document.getElementById('labelSpeed');
        if (labelLanguage) labelLanguage.innerHTML = '<i class="fas fa-language"></i> ' + texts.language;
        if (labelEnglishPron) labelEnglishPron.innerHTML = '<i class="fas fa-globe"></i> ' + texts.english_pron;
        if (labelGender) labelGender.innerHTML = '<i class="fas fa-user"></i> ' + texts.gender;
        if (labelSpeed) labelSpeed.innerHTML = '<i class="fas fa-tachometer-alt"></i> ' + texts.speed;
        
        // 성별 옵션
        const genderSelect = document.getElementById('voice-gender');
        if (genderSelect && genderSelect.options.length >= 2) {
            genderSelect.options[0].text = '👩 ' + texts.female;
            genderSelect.options[1].text = '👨 ' + texts.male;
        }
        
        // 언어 선택기 값 설정
        const voiceLanguage = document.getElementById('voice-language');
        if (voiceLanguage && voiceLanguage.value !== this.currentLanguage) {
            voiceLanguage.value = this.currentLanguage;
        }
        
        console.log('✅ UI update complete');
    },

    getStorageKey() { 
        return `${this.currentLanguage}_${this.currentLevel}_${this.currentSeries}_chunks`; 
    },

    saveOpenUnits() {
        this.openUnits.clear();
        document.querySelectorAll('.unit-section').forEach(section => {
            const unitId = section.getAttribute('data-unit-id');
            const content = document.getElementById(`unit-content-${unitId}`);
            if (content && content.classList.contains('open')) this.openUnits.add(unitId);
        });
    },

    restoreOpenUnits() {
        this.openUnits.forEach(unitId => {
            const content = document.getElementById(`unit-content-${unitId}`);
            if (content) content.classList.add('open');
        });
    },

    loadChunks() {
        this.saveOpenUnits();
        const saved = JSON.parse(localStorage.getItem(this.getStorageKey()) || '[]');
        this.updateStats(saved);
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        
        if (saved.length === 0) {
            if (this.elements.chunksContainer) {
                this.elements.chunksContainer.innerHTML = `<div class="empty-message"><i class="fas fa-inbox"></i><h3>${texts.no_sentences}</h3><p>${texts.no_sentences_desc}</p></div>`;
            }
            return;
        }
        const grouped = {};
        saved.forEach(chunk => {
            const unitId = chunk.unit || 'unknown';
            if (!grouped[unitId]) grouped[unitId] = { unitTitle: `Unit ${unitId}`, chunks: [] };
            grouped[unitId].chunks.push(chunk);
        });
        this.renderChunks(grouped);
        this.restoreOpenUnits();
    },

    updateStats(chunks) {
        if (this.elements.totalChunks) this.elements.totalChunks.innerText = chunks.length;
        const uniqueUnits = [...new Set(chunks.map(chunk => chunk.unit))];
        if (this.elements.totalUnits) this.elements.totalUnits.innerText = uniqueUnits.length;
        let totalAccuracy = 0, chunksWithStats = 0;
        chunks.forEach(chunk => {
            if (chunk.stats && chunk.stats.lastAccuracy) {
                totalAccuracy += chunk.stats.lastAccuracy;
                chunksWithStats++;
            }
        });
        const overallAvg = chunksWithStats > 0 ? Math.round(totalAccuracy / chunksWithStats) : 0;
        if (this.elements.overallAccuracy) this.elements.overallAccuracy.innerText = `${overallAvg}%`;
    },

    renderChunks(grouped) {
        if (!this.elements.chunksContainer) return;
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        let html = '';
        for (const [unitId, unitData] of Object.entries(grouped)) {
            html += `<div class="unit-section" data-unit-id="${unitId}"><div class="unit-header" onclick="DrillCenter.toggleUnit('${unitId}')"><h2><i class="fas fa-book-open"></i> ${this.escapeHtml(unitData.unitTitle)}</h2><span class="unit-badge">${unitData.chunks.length} ${texts.saved_sentences}</span></div><div class="unit-content" id="unit-content-${unitId}">`;
            unitData.chunks.forEach((chunk, idx) => {
                const uniqueId = `${unitId}_${idx}_${Date.now()}`;
                const stats = chunk.stats || { totalAttempts: 0, bestAccuracy: 0, lastAccuracy: 0 };
                const difficulty = chunk.difficulty || 3;
                const lastPracticed = stats.lastPracticed ? new Date(stats.lastPracticed).toLocaleDateString() : texts.practiced;
                html += `
                    <div class="chunk-card" id="chunk-${uniqueId}" data-unit="${unitId}" data-chunk-text="${this.escapeHtml(chunk.chunkText)}">
                        <div class="chunk-text">${this.escapeHtml(chunk.chunkText)}<span class="difficulty-stars">${this.renderStars(difficulty)}</span></div>
                        <div class="stats-panel">
                            <div class="stat-item"><i class="fas fa-chart-line"></i> ${texts.best}: <span class="stat-value">${stats.bestAccuracy || 0}%</span></div>
                            <div class="stat-item"><i class="fas fa-clock"></i> ${texts.recent}: <span class="stat-value">${stats.lastAccuracy || 0}%</span></div>
                            <div class="stat-item"><i class="fas fa-calendar"></i> ${texts.practiced}: ${lastPracticed}</div>
                            <div class="stat-item"><i class="fas fa-microphone"></i> ${texts.attempts}: ${stats.totalAttempts || 0}</div>
                            <div class="stat-item"><span>${texts.progress}:</span><div class="progress-bar-container"><div class="progress-fill" style="width: ${stats.bestAccuracy || 0}%"></div></div></div>
                        </div>
                        <div class="button-group">
                            <button class="drill-btn btn-speak" onclick="DrillCenter.speakChunk('${this.escapeHtml(chunk.chunkText).replace(/'/g, "\\'")}')"><i class="fas fa-volume-up"></i> ${texts.listen}</button>
                            <button class="drill-btn btn-record" id="rec-btn-${uniqueId}" onclick="DrillCenter.toggleRecording('${uniqueId}')"><i class="fas fa-microphone"></i> ${texts.record}</button>
                            <button class="drill-btn btn-play" id="play-btn-${uniqueId}" style="display:none;" onclick="DrillCenter.playRecording('${uniqueId}')"><i class="fas fa-play"></i> ${texts.play}</button>
                            <button class="drill-btn btn-transcribe" id="transcribe-btn-${uniqueId}" style="display:none;" onclick="DrillCenter.startTranscription('${uniqueId}', '${this.escapeHtml(chunk.chunkText).replace(/'/g, "\\'")}', '${unitId}', '${this.escapeHtml(chunk.chunkText).replace(/'/g, "\\'")}')"><i class="fas fa-language"></i> ${texts.transcribe}</button>
                            <button class="drill-btn btn-goto-unit" onclick="DrillCenter.goToUnitChunk('${unitId}', '${this.escapeHtml(chunk.chunkText).replace(/'/g, "\\'")}')"><i class="fas fa-external-link-alt"></i> ${texts.goto_unit}</button>
                            <button class="drill-btn btn-delete" onclick="DrillCenter.deleteChunk('${unitId}', '${this.escapeHtml(chunk.chunkText).replace(/'/g, "\\'")}')"><i class="fas fa-trash"></i> ${texts.delete}</button>
                        </div>
                        <div id="transcript-result-${uniqueId}"></div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
        this.elements.chunksContainer.innerHTML = html;
    },

    goToUnitChunk(unitId, chunkText) {
        const unitNumber = unitId.match(/\d+/)?.[0];
        if (!unitNumber) { alert('원본 유닛을 찾을 수 없습니다.'); return; }
        const unitUrl = `study.html?lang=${this.currentLanguage}&level=${this.currentLevel}&series=${this.currentSeries}&unit=${unitNumber}`;
        localStorage.setItem('jpScrollToChunk', chunkText);
        window.location.href = unitUrl;
    },

    toggleUnit(unitId) {
        const content = document.getElementById(`unit-content-${unitId}`);
        if (content) content.classList.toggle('open');
    },

    speakChunk(text) { if (window.TTS) TTS.speak(text); },

    async toggleRecording(uniqueId) {
        const btn = document.getElementById(`rec-btn-${uniqueId}`);
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
            btn.classList.remove('recording');
            btn.innerHTML = '<i class="fas fa-microphone"></i> ' + texts.record;
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    if (this.audioChunksUrl[uniqueId]) URL.revokeObjectURL(this.audioChunksUrl[uniqueId]);
                    this.audioChunksUrl[uniqueId] = url;
                    this.audioChunksBlob[uniqueId] = blob;
                    const playBtn = document.getElementById(`play-btn-${uniqueId}`);
                    if (playBtn) playBtn.style.display = 'inline-flex';
                    const transcribeBtn = document.getElementById(`transcribe-btn-${uniqueId}`);
                    if (transcribeBtn) transcribeBtn.style.display = 'inline-flex';
                    stream.getTracks().forEach(track => track.stop());
                };
                recorder.start();
                this.mediaRecorder = recorder;
                btn.classList.add('recording');
                btn.innerHTML = '<i class="fas fa-stop"></i> ' + texts.stop;
            } catch (err) { alert('마이크 접근이 거부되었습니다.'); }
        }
    },

    playRecording(uniqueId) {
        if (this.audioChunksUrl[uniqueId]) new Audio(this.audioChunksUrl[uniqueId]).play();
        else alert('먼저 녹음해주세요.');
    },

    async startTranscription(uniqueId, expectedText, unitId, chunkText) {
        const resultDiv = document.getElementById(`transcript-result-${uniqueId}`);
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (resultDiv && resultDiv.innerHTML.trim() !== '') { resultDiv.innerHTML = ''; return; }
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = this.currentLanguage === 'en' ? 'en-US' : (this.currentLanguage === 'ja' ? 'ja-JP' : (this.currentLanguage === 'fr' ? 'fr-FR' : 'ko-KR'));
        let recognizedText = '';
        recognition.onresult = (event) => { recognizedText = event.results[0][0].transcript; };
        recognition.onerror = (event) => { alert(`인식 오류: ${event.error}`); };
        recognition.onend = () => {
            const accuracy = this.calculateAccuracy(recognizedText, expectedText);
            this.updateChunkStats(unitId, chunkText, accuracy);
            this.showDetailedResult(uniqueId, recognizedText, expectedText, accuracy);
            this.updateStatsUIOnly(unitId, chunkText);
        };
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
            recorder.onstop = () => {
                if (chunks.length) {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    if (this.audioChunksUrl[uniqueId]) URL.revokeObjectURL(this.audioChunksUrl[uniqueId]);
                    this.audioChunksBlob[uniqueId] = blob;
                    this.audioChunksUrl[uniqueId] = URL.createObjectURL(blob);
                    const playBtn = document.getElementById(`play-btn-${uniqueId}`);
                    if (playBtn) playBtn.style.display = 'inline-flex';
                }
                stream.getTracks().forEach(track => track.stop());
            };
            recorder.start();
            recognition.start();
            if (resultDiv) resultDiv.innerHTML = `<div style="padding:8px;background:#fce4ec;border-radius:8px;">🎤 ${texts.listening}</div>`;
            setTimeout(() => { if (recorder.state === 'recording') recorder.stop(); }, 10000);
        } catch (err) { alert('마이크 접근이 거부되었습니다.'); }
    },

    calculateAccuracy(recognizedText, expectedText) {
        if (!recognizedText) return 0;
        const recognized = recognizedText.toLowerCase().trim();
        const expected = expectedText.toLowerCase().trim();
        if (recognized === expected) return 100;
        const recognizedWords = recognized.split(/\s+/);
        const expectedWords = expected.split(/\s+/);
        let matchedCount = 0;
        const usedExpected = new Set();
        for (let i = 0; i < recognizedWords.length; i++) {
            for (let j = 0; j < expectedWords.length; j++) {
                if (usedExpected.has(j)) continue;
                if (recognizedWords[i] === expectedWords[j]) { matchedCount++; usedExpected.add(j); break; }
                if (expectedWords[j].includes(recognizedWords[i]) || recognizedWords[i].includes(expectedWords[j])) { matchedCount++; usedExpected.add(j); break; }
            }
        }
        let accuracy = Math.round((matchedCount / expectedWords.length) * 100);
        return Math.min(100, Math.max(0, accuracy));
    },

    getDifficultyLevel(accuracy) {
        if (accuracy >= 90) return { level: 1, stars: '⭐', text: '매우 쉬움' };
        if (accuracy >= 70) return { level: 2, stars: '⭐⭐', text: '쉬움' };
        if (accuracy >= 50) return { level: 3, stars: '⭐⭐⭐', text: '보통' };
        if (accuracy >= 30) return { level: 4, stars: '⭐⭐⭐⭐', text: '어려움' };
        return { level: 5, stars: '⭐⭐⭐⭐⭐', text: '매우 어려움' };
    },

    renderStars(level) {
        let html = '';
        for (let i = 1; i <= 5; i++) html += i <= level ? '<i class="fas fa-star star-filled"></i>' : '<i class="fas fa-star star-empty"></i>';
        return html;
    },

    updateChunkStats(unitId, chunkText, accuracy) {
        const storageKey = this.getStorageKey();
        let chunks = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const idx = chunks.findIndex(ch => ch.unit === unitId && ch.chunkText === chunkText);
        if (idx !== -1) {
            if (!chunks[idx].stats) chunks[idx].stats = { totalAttempts: 0, bestAccuracy: 0, lastAccuracy: 0, lastPracticed: null };
            chunks[idx].stats.totalAttempts++;
            chunks[idx].stats.lastAccuracy = accuracy;
            chunks[idx].stats.lastPracticed = new Date().toISOString();
            if (accuracy > chunks[idx].stats.bestAccuracy) chunks[idx].stats.bestAccuracy = accuracy;
            chunks[idx].difficulty = this.getDifficultyLevel(accuracy).level;
            localStorage.setItem(storageKey, JSON.stringify(chunks));
        }
    },

    updateStatsUIOnly(unitId, chunkText) {
        const storageKey = this.getStorageKey();
        const chunks = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const chunk = chunks.find(ch => ch.unit === unitId && ch.chunkText === chunkText);
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (!chunk) return;
        const stats = chunk.stats || { totalAttempts: 0, bestAccuracy: 0, lastAccuracy: 0 };
        const card = document.querySelector(`.chunk-card[data-unit="${unitId}"][data-chunk-text="${chunkText}"]`);
        if (card) {
            const panel = card.querySelector('.stats-panel');
            if (panel) panel.innerHTML = `<div class="stat-item"><i class="fas fa-chart-line"></i> ${texts.best}: <span class="stat-value">${stats.bestAccuracy || 0}%</span></div><div class="stat-item"><i class="fas fa-clock"></i> ${texts.recent}: <span class="stat-value">${stats.lastAccuracy || 0}%</span></div><div class="stat-item"><i class="fas fa-calendar"></i> ${texts.practiced}: ${stats.lastPracticed ? new Date(stats.lastPracticed).toLocaleDateString() : texts.practiced}</div><div class="stat-item"><i class="fas fa-microphone"></i> ${texts.attempts}: ${stats.totalAttempts || 0}</div><div class="stat-item"><span>${texts.progress}:</span><div class="progress-bar-container"><div class="progress-fill" style="width: ${stats.bestAccuracy || 0}%"></div></div></div>`;
            const starsSpan = card.querySelector('.difficulty-stars');
            if (starsSpan) starsSpan.innerHTML = this.renderStars(chunk.difficulty || 3);
        }
        let totalAcc = 0, cnt = 0;
        chunks.forEach(ch => { if (ch.stats && ch.stats.lastAccuracy) { totalAcc += ch.stats.lastAccuracy; cnt++; } });
        document.getElementById('overallAccuracy').innerText = cnt > 0 ? Math.round(totalAcc/cnt) + '%' : '0%';
    },

    showDetailedResult(uniqueId, recognizedText, expectedText, accuracy) {
        const resultDiv = document.getElementById(`transcript-result-${uniqueId}`);
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (!resultDiv) return;
        const diff = this.getDifficultyLevel(accuracy);
        const expectedWords = expectedText.toLowerCase().trim().split(/\s+/);
        let matchedCount = 0;
        if (recognizedText) {
            const recognizedWords = recognizedText.toLowerCase().trim().split(/\s+/);
            for (let i = 0; i < recognizedWords.length; i++) {
                for (let j = 0; j < expectedWords.length; j++) {
                    if (recognizedWords[i] === expectedWords[j]) { matchedCount++; break; }
                }
            }
        }
        resultDiv.innerHTML = `<div style="background:#fff;border:2px solid ${accuracy >= 70 ? '#27ae60' : '#9b59b6'};border-radius:8px;padding:15px;margin-top:10px;"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;margin-bottom:10px;"><div><strong style="font-size:1.1rem;">🎯 ${texts.accuracy}: ${accuracy}%</strong><span style="margin-left:15px;">${diff.stars} (${diff.text})</span></div><div><strong>✅ ${texts.correct}: ${matchedCount}/${expectedWords.length}</strong></div></div><div style="background:#f8f9fa;padding:10px;border-radius:8px;margin-bottom:8px;"><div><strong>📝 ${texts.record}:</strong> "${recognizedText || '...'}"</div><div><strong>🎯 ${texts.answer}:</strong> "${this.escapeHtml(expectedText)}"</div></div><div style="font-size:0.8rem;color:#666;margin-top:8px;padding:8px;background:#f0f0f0;border-radius:6px;">💡 비슷한 단어나 부분 일치해도 점수가 부여됩니다.</div><div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end;"><button class="copy-btn" onclick="navigator.clipboard.writeText('${(recognizedText || '').replace(/'/g, "\\'")}');alert('${texts.copy}')">📋 ${texts.copy}</button><button class="copy-btn" onclick="this.parentElement.parentElement.parentElement.innerHTML=''" style="background:#e74c3c;color:white;">✖ ${texts.close}</button></div></div>`;
    },

    deleteChunk(unitId, chunkText) {
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (confirm(texts.confirm_delete)) {
            const storageKey = this.getStorageKey();
            let chunks = JSON.parse(localStorage.getItem(storageKey) || '[]');
            chunks = chunks.filter(ch => !(ch.unit === unitId && ch.chunkText === chunkText));
            localStorage.setItem(storageKey, JSON.stringify(chunks));
            this.loadChunks();
        }
    },

    clearAllChunks() {
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (confirm(texts.confirm_clear)) {
            localStorage.removeItem(this.getStorageKey());
            this.loadChunks();
        }
    },

    exportChunks() {
        const storageKey = this.getStorageKey();
        const chunks = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (chunks.length === 0) { alert(texts.no_chunks); return; }
        const dataStr = JSON.stringify(chunks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0,10);
        a.download = `drill_${this.currentLanguage}_${this.currentLevel}_${this.currentSeries}_${timestamp}.json`;
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
        alert(`${chunks.length} ${texts.saved_sentences} ${texts.export}`);
    },

    importChunks(file) {
        const texts = drillI18n[this.currentLanguage] || drillI18n.ko;
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    localStorage.setItem(this.getStorageKey(), JSON.stringify(imported));
                    this.loadChunks();
                    alert(texts.import_complete);
                } else { alert(texts.invalid_file); }
            } catch (err) { alert(texts.parse_error); }
        };
        reader.readAsText(file);
    },

    bindEvents() {
        if (this.elements.voiceLanguage) {
            this.elements.voiceLanguage.addEventListener('change', (e) => {
                const newLang = e.target.value;
                console.log('🌐 Language changed to:', newLang);
                this.currentLanguage = newLang;
                localStorage.setItem('drill_language', newLang);
                if (window.TTS) TTS.setLanguage(newLang);
                this.updateFullUILanguage();
                this.loadChunks();
            });
        }
        if (this.elements.voiceType) {
            this.elements.voiceType.addEventListener('change', (e) => {
                if (window.TTS) TTS.setVoiceType(e.target.value);
            });
        }
        if (this.elements.voiceGender) {
            this.elements.voiceGender.addEventListener('change', (e) => {
                if (window.TTS) TTS.setGender(e.target.value);
            });
        }
        if (this.elements.voiceRate) {
            this.elements.voiceRate.addEventListener('input', (e) => {
                const rate = parseFloat(e.target.value);
                if (window.TTS) TTS.setRate(rate);
                if (this.elements.rateValue) this.elements.rateValue.textContent = rate.toFixed(2);
            });
        }
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportChunks());
        const clearBtn = document.getElementById('clearAllBtn');
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearAllChunks());
        const importInput = document.getElementById('importInput');
        if (importInput) importInput.addEventListener('change', (e) => this.importChunks(e.target.files[0]));
    },

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

window.DrillCenter = DrillCenter;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DrillCenter.init());
} else {
    DrillCenter.init();
}
