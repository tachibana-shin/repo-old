#!/bin/bash

for i in ./debs/*.deb
do
   rm -rf ./debs/tmp
   debInfo=`dpkg -f $i`
   dep=`echo "$debInfo" | grep "Depiction: " | cut -c 12- | tr -d "\n\r"`
   home=`echo "$debInfo" | grep "Homepage: " | cut -c 11- | tr -d "\n\r"`
   pkg=`echo "$debInfo" | grep "Package: " | cut -c 10- | tr -d "\n\r"`
   
   dpkg-deb -R $i ./debs/tmp
   if [[ -z $dep ]]; then
       echo "Depiction: https://nguyenthanh1995.github.io/description.html?goto=${pkg}" >> ./debs/tmp/DEBIAN/control
   else continue
   fi
   if [[ -z $home ]]; then
        echo "Homepage: https://nguyenthanh1995.github.io/" >> ./debs/tmp/DEBIAN/control
   else continue
   fi

   dpkg -b ./debs/tmp

   bsname=$(basename "$i")
   mv ./debs/tmp.deb "./debs/$bsname"
done
   rm -fr ./debs/tmp
exit 0
