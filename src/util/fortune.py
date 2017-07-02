
import codecs
import re
content = ""
with codecs.open('fortunes.txt', 'r', encoding='ascii',errors='ignore') as f:
    content = f.read()
    content = content.replace('\r', '').replace('\n', '').replace('\t', '').replace('\u', '').replace("'", "\\'")
    content = re.sub( '\s+', ' ', content).strip()

fortunes = content.split("%")
fortunes = filter(lambda x: len(x) > 20, fortunes)
print(fortunes[24])
with open('fortune_list.txt', 'w') as f:
    f.writelines(["'%s',\n" % item  for item in fortunes])
