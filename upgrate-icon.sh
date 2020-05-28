#!/bin/bash
printf "{" > icons.json
  for file in ./debs/*.deb
  do
     inf=`dpkg -f $file`
     icon=`echo "$inf" | grep "Icon: " | cut -c 7- | tr -d "\n\r"`
     if [ -n "$icon" ]; then
        pkg=`echo "$inf" | grep "Package: " | cut -c 10- | tr -d "\n\r"`
        echo "\"$pkg\":\"$icon\"," >> icons.json
     fi
  done
printf "\"\":\"\"}" >> icons.json
exit 0