#!/bin/sh
echo "Add infomation Depiction..."
#sh "add-descript.sh"
echo "------------------"
echo "Building Packages...."

apt-ftparchive packages ./debs > ./Packages;
#sed -i -e '/^SHA/d' ./Packages;
bzip2 -c9k ./Packages > ./Packages.bz2;
echo "------------------"
echo "Building Release...."
printf "Origin: Nguyen Thanh (shin-dev)\nLabel: shin-chan (N.Thanh)\nSuite: stable\nVersion: 1.0\nCodename: ios\nArchitecture: iphoneos-arm\nComponents: main\nDescription: Source Cydia Repo by Shin-chan (Nguyen Thanh)\nMD5Sum:\n "$(cat ./Packages | md5sum | cut -d ' ' -f 1)" "$(stat ./Packages --printf="%s")" Packages\n "$(cat ./Packages.bz2 | md5sum | cut -d ' ' -f 1)" "$(stat ./Packages.bz2 --printf="%s")" Packages.bz2\n" >Release;

echo "------------------"
echo "Building to json..."
sh "./buid json.sh"
echo "------------------"
echo "Get Support OS..."
sh "shell.sh"

echo "=================="
echo "Done!"

exit 0;
