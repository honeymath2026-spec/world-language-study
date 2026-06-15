// generate.js
const fs = require('fs');
const handlebars = require('handlebars');

// 레벨별 설정
const levels = ['beginner', 'elementary', 'preintermediate', 'intermediate', 'upperintermediate', 'advanced'];
const languages = ['en', 'ja', 'fr', 'ko'];

// 각 레벨별 템플릿 로드
const templates = {};
levels.forEach(level => {
    templates[level] = handlebars.compile(
        fs.readFileSync(`templates/${level}_template.html`, 'utf8')
    );
});

// 유닛 데이터 로드
for (const level of levels) {
    const unitData = JSON.parse(fs.readFileSync(`data/${level}_units.json`, 'utf8'));
    
    for (const lang of languages) {
        const totalUnits = Object.keys(unitData).length;
        
        for (let unit = 1; unit <= totalUnits; unit++) {
            const data = unitData[unit.toString()];
            if (!data) continue;
            
            const html = templates[level]({
                lang: lang,
                unit: unit,
                level: level,
                series: 'core',
                title: data.title,
                core_title: data.core_title,
                core_reading_html: data.core_reading_html,
                vocabulary: data.vocabulary,
                listening_tracks: data.listening_tracks,
                extra_reading_title: data.extra_reading_title,
                extra_reading_html: data.extra_reading_html,
                tf_quiz: data.tf_quiz,
                speaking_chunks: data.speaking_chunks,
                grammar_html: data.grammar_html,
                content_check_question: data.content_check_question,
                content_check_keywords: data.content_check_keywords,
                content_check_placeholder: data.content_check_placeholder,
                deepening_question: data.deepening_question,
                deepening_placeholder: data.deepening_placeholder,
                critical_question: data.critical_question,
                critical_placeholder: data.critical_placeholder
            });
            
            const dir = `${lang}/${level}`;
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            
            const unitStr = String(unit).padStart(2, '0');
            fs.writeFileSync(`${dir}/unit_${unitStr}.html`, html);
            console.log(`✅ Generated: ${dir}/unit_${unitStr}.html`);
        }
    }
}
