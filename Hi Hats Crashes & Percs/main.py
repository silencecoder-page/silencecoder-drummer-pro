import os

allfiles = os.listdir('Hi Hats Crashes & Percs/')
c =1 
h =1
p = 1

for i,files in enumerate(allfiles):
    if 'Hit' in files:
        os.rename('Hi Hats Crashes & Percs/'+files, f'Hits {h}.wav')
        h+=1
    elif 'Crash' in files:
        os.rename('Hi Hats Crashes & Percs/'+files, f'Crashes {c}.wav')
        c+=1
    else:
        os.rename('Hi Hats Crashes & Percs/'+files, f'Percs {p}.wav')
        p+=1
    print(files)


