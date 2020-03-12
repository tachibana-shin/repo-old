#!/bin/bash

if [ -e compatity.txt ]; then
    compatity=$(cat compatity.txt)
fi

for i in ./debs/*.deb
do
   pkg=`dpkg -f $i`
   pkg=`echo "$pkg" | grep "Package: " | cut -c 10- | tr -d "\n\r"`
   leng=${#pkg}
   leng=`expr $leng + 1`
   exists=`echo "$compatity" | grep "$pkg" | cut -c "$leng"- | tr -d "\n\r"`
   if [[ -z $exists ]]; then
      echo "$pkg...?"
      read tmp
      echo "$pkg $tmp" >> compatity.txt;
   else echo "FALSE"
   fi
   #break
done
exit 0
