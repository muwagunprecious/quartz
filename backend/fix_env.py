
import os

env_path = os.path.join('c:\\Users\\TINGO-AI-010\\Documents\\quartz\\backend', '.env')

if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    port_added = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('PORT='):
            continue
        if '5000' in stripped and ('URL' in stripped or 'ORIGIN' in stripped):
            line = line.replace('5000', '6000')
        new_lines.append(line)
    
    # Add PORT=6000 at the end if not present (which it won't be since we skipped it)
    new_lines.append('PORT=6000\n')
    
    with open(env_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Fixed .env file successfully.")
else:
    print(".env file not found.")
