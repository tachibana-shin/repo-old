#!/bin/bash

    if [ ! -e "URI.txt" ]; then
        touch "URI.txt"
    fi

    for i in ./debs/*.deb
    do
        package=`dpkg -f "$i" | grep "Package: " | cut -c 10- | tr -d "\n\r"`
        URI="http://nguyenthanh1995.github.io/description.html?goto=$package"

        if [[ -z `cat "URI.txt" | grep "$URI"` ]]; then
            echo "$URI" >> URI.txt
        fi
    done
exit 0
