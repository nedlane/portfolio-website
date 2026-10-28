from pathlib import Path
from html import escape
import argparse

parser = argparse.ArgumentParser(description="Render the plain-text resume as printable HTML.")
parser.add_argument("--source", type=Path, default=Path(__file__).resolve().parents[1] / "resume/resume.txt")
parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "resume/resume.html")
parser.add_argument("--email", default="jobs@nedlane.com")
args = parser.parse_args()
lines=args.source.read_text().replace('jobs@nedlane.com', args.email).splitlines()
headings={'PROFILE','EDUCATION','ENGINEERING EXPERIENCE','OTHER EMPLOYMENT','TECHNICAL SKILLS','AVAILABILITY'}
parts=[]; paragraph=[]; bullet=False; listing=False

def flush():
 global bullet,listing
 if not paragraph:return
 text=escape(' '.join(paragraph));paragraph.clear()
 if bullet:
  if not listing:parts.append('<ul>');listing=True
  parts.append('<li>'+text+'</li>')
 else:
  close_list();parts.append('<p>'+text+'</p>')
 bullet=False

def close_list():
 global listing
 if listing:parts.append('</ul>');listing=False
for i,line in enumerate(lines):
 if i==0:parts.append('<h1>'+escape(line)+'</h1>');continue
 if i in (1,2):
  flush();
  contact=escape(line)
  for label,href in [(args.email,'mailto:'+args.email),('nedlane.com','https://www.nedlane.com'),('github.com/nedlane','https://github.com/nedlane'),('linkedin.com/in/nedlane','https://www.linkedin.com/in/nedlane/')]:
   if i==1 and label!=args.email:continue
   if i==2 and label==args.email:continue
   contact=contact.replace(label,'<a href="'+href+'">'+label+'</a>')
  parts.append('<p class="contact">'+contact+'</p>');continue
 if line.startswith('Commenced '):
  flush();parts.append('<p>'+escape(line)+'</p>');continue
 if line in headings:
  flush();close_list();parts.append('<h2>'+line.title()+'</h2>')
 elif not line:flush();close_list()
 elif line.startswith('- '):flush();bullet=True;paragraph.append(line[2:])
 elif ' | ' in line and i>3:
  flush();close_list();parts.append('<p class="role">'+escape(line)+'</p>')
 elif line in ('Autonomous vehicle engineering','Team operations and safety'):flush();close_list();parts.append('<h4>'+escape(line)+'</h4>')
 elif line=='UQ Racing':flush();close_list();parts.append('<h3>UQ Racing</h3>')
 elif line.startswith(('Programming:','Robotics:','Web and infrastructure:')):
  flush();close_list();parts.append('<p>'+escape(line)+'</p>')
 else:paragraph.append(line)
flush();close_list()
css='''@page{size:A4;margin:15mm 17mm}*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#172330;background:transparent;font-size:10pt;line-height:1.4}.sheet{background:white;padding:24px;border-radius:8px;max-width:800px;margin:0 auto}a{color:inherit;text-decoration:none}.contributions{font-size:9pt;color:#40525c;margin-top:7px}h1{font-size:25pt;letter-spacing:.5px;margin:0 0 5px;color:#153949}h2{font-size:10pt;color:#153949;letter-spacing:.8px;text-transform:uppercase;border-bottom:1px solid #b7cbd1;padding-bottom:4px;margin:14px 0 7px;break-after:avoid}h4{font-size:10pt;margin:9px 0 3px;color:#153949;break-after:avoid}h3{font-size:11pt;margin:0 0 4px}p{margin:0 0 5px}.role{font-weight:bold;font-size:9.5pt}ul{padding-left:17px;margin:6px 0 8px}li{padding-left:2px;margin-bottom:4px;break-inside:avoid}@media print{.sheet{padding:0;border-radius:0;max-width:none}body{font-size:10pt;line-height:1.3}h2{margin-top:12px}p{margin-bottom:4px}li{margin-bottom:4px}}'''
html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ned Lane resume</title><style>'+css+'</style></head><body><article class="sheet">'+''.join(parts)+'</article></body></html>'
args.output.write_text(html)
