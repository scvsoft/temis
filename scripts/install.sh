#!/usr/bin/env bash
set -e

# update instance
yum -y update

# install mongo
cat <<EOF>/etc/yum.repos.d/mongodb-org-3.0.repo
[mongodb-org-3.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1
EOF

yum install -y mongodb-org
service mongod start

# add nodejs to yum
curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
yum install -y nodejs

# install pm2 module globaly
npm install -g pm2
pm2 update