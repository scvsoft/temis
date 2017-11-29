#!/usr/bin/env bash
set -e

cd ~/temis/server
npm install
npm run build

# setup NODE_ENV
if [ ! -z "$DEPLOYMENT_GROUP_NAME=" ]; then
    export NODE_ENV=$DEPLOYMENT_GROUP_NAME
	export FACEBOOK_CLIENTID=128732717834556
	export FACEBOOK_CLIENTSECRET=fada2088cc5fcf83788c16285d3a535c
	export JWT_SECRET=wGi9eZhag7yXBmeU7mM3c2QY
	export JWT_EXPIRATION=2h
	export PORT=3000
	export HOST=0.0.0.0
	export MONGODB_HOST=localhost:27017
	export MONGODB_DBNAME=temis

    hasEnv=`grep "export NODE_ENV" ~/.bash_profile | cat`
    if [ -z "$hasEnv" ]; then
        echo "export NODE_ENV=$DEPLOYMENT_GROUP_NAME" >> ~/.bash_profile
		echo "export FACEBOOK_CLIENTID=128732717834556" >> ~/.bash_profile
		echo "export FACEBOOK_CLIENTSECRET=fada2088cc5fcf83788c16285d3a535c" >> ~/.bash_profile
		echo "export JWT_SECRET=wGi9eZhag7yXBmeU7mM3c2QY" >> ~/.bash_profile
		echo "export JWT_EXPIRATION=2h" >> ~/.bash_profile
		echo "export PORT=3000" >> ~/.bash_profile
		echo "export HOST=0.0.0.0" >> ~/.bash_profile
		echo "export MONGODB_HOST=localhost:27017" >> ~/.bash_profile
		echo "export MONGODB_DBNAME=temis" >> ~/.bash_profile
    else
        sed -i "/export NODE_ENV=\b/c\export NODE_ENV=$DEPLOYMENT_GROUP_NAME" ~/.bash_profile
		sed -i "/export FACEBOOK_CLIENTID=\b/c\export FACEBOOK_CLIENTID=128732717834556" >> ~/.bash_profile
		sed -i "/export FACEBOOK_CLIENTSECRET=\b/c\export FACEBOOK_CLIENTSECRET=fada2088cc5fcf83788c16285d3a535c" >> ~/.bash_profile
		sed -i "/export JWT_SECRET=\b/c\export JWT_SECRET=wGi9eZhag7yXBmeU7mM3c2QY" >> ~/.bash_profile
		sed -i "/export JWT_EXPIRATION=\b/c\export JWT_EXPIRATION=2h" >> ~/.bash_profile
		sed -i "/export PORT=\b/c\export PORT=3000" >> ~/.bash_profile
		sed -i "/export HOST=\b/c\export HOST=0.0.0.0" >> ~/.bash_profile
		sed -i "/export MONGODB_HOST=\b/c\export MONGODB_HOST=localhost:27017" >> ~/.bash_profile
		sed -i "/export MONGODB_DBNAME=\b/c\export MONGODB_DBNAME=temis" >> ~/.bash_profile
    fi
fi

# add node to startup
hasRc=`grep "su -l $USER" /etc/rc.d/rc.local | cat`
if [ -z "$hasRc" ]; then
    sudo sh -c "echo 'su -l $USER -c \"cd ~/temis/server;sh ./run.sh\"' >> /etc/rc.d/rc.local"
fi
