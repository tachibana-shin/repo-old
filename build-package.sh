#!/bin/sh
  echo "[" > list.pkgs

if [[ -e compatity.txt ]]; then
    compatity=$(cat compatity.txt)
fi

for i in ./debs/*.deb
do
   debInfo=`dpkg -f $i`
   section=`echo "$debInfo" | grep "Section: " | cut -c 10- | tr -d "\n\r"`
   section="${section//'"'/\\\"}"
   pkg=`echo "$debInfo" | grep "Package: " | cut -c 10- | tr -d "\n\r"`
   name=`echo "$debInfo" | grep "Name: " | cut -c 7- | tr -d "\n\r"`
   name="${name//'"'/\\\"}"
   vers=`echo "$debInfo" | grep "Version: " | cut -c 10- | tr -d "\n\r"`
   vers="${vers//'"'/\\\"}"
   size=$(du -b $i | cut -f1)
   time=$(date +%s -r $i)
    
   echo '{"Name":"'$name'","Version":"'$vers'","Section":"'$section'","Package":"'$pkg'","Size":"'$size'","Time":"'$time'000"},' >> list.pkgs
#Building to json done==============
  leng=${#pkg}
  leng=`expr $leng + 1`
  exists=`echo "$compatity" | grep "$pkg " | cut -c "$leng"- | tr -d "\n\r"`
  if [[ -z $exists ]]; then
     echo "$pkg ($name)? "
     read tmp
     echo "$pkg $tmp" >> compatity.txt;
  fi
done
echo "{}]" >> all.pkgs
exit 0;