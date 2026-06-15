#!/usr/bin/env python3
import json
import os
import re
import shutil

def convert_vocab_links(text):
    if not text:
        return text
    pattern = r"onclick='scrollToCard\(\"vocab-([^\"]+)\"\)'"
    def replace_func(match):
        word_id = match.group(1)
        return f"onclick='speakAndScroll(\"{word_id}\", \"vocab-{word_id}\")'"
    return re.sub(pattern, replace_func, text)

def process_json_file(filepath):
    print(f"📂 Processing: {os.path.basename(filepath)}")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False
    
    modified = False
    for lang in ['en', 'ko', 'ja', 'fr']:
        if 'core_reading_html' in data and lang in data['core_reading_html']:
            original = data['core_reading_html'][lang]
            converted = convert_vocab_links(original)
            if original != converted:
                data['core_reading_html'][lang] = converted
                modified = True
                print(f"   ✅ Converted {lang} core_reading_html")
        if 'extra_reading_html' in data and lang in data['extra_reading_html']:
            original = data['extra_reading_html'][lang]
            converted = convert_vocab_links(original)
            if original != converted:
                data['extra_reading_html'][lang] = converted
                modified = True
                print(f"   ✅ Converted {lang} extra_reading_html")
    
    if modified:
        backup_path = filepath + '.bak'
        if not os.path.exists(backup_path):
            shutil.copy2(filepath, backup_path)
            print(f"   📋 Backup: {os.path.basename(backup_path)}")
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"   💾 Saved: {os.path.basename(filepath)}")
        return True
    else:
        print(f"   ⏭️ No changes")
        return False

def main():
    print("=" * 50)
    print("Converting scrollToCard -> speakAndScroll")
    print("=" * 50)
    converted = 0
    for i in range(1, 17):
        filename = f"unit_{i:02d}.json"
        if os.path.exists(filename):
            if process_json_file(filename):
                converted += 1
        else:
            print(f"⚠️ Not found: {filename}")
    print("=" * 50)
    print(f"✅ Done! Converted {converted} files.")

if __name__ == "__main__":
    main()
