Video Link: https://drive.google.com/open?id=15c7vq_5MyrkeG0CunHEfODCmtVs-_d_R

# Running the project and tests

Start by cloning the repository onto your local machine(git must be installed).

## Using Node.js

Make sure Node.js is installed on your system. First you must install all the node module dependencies in the ```frontend``` and ```backend``` directories. Change to the ```frontend``` directory and run ```$ npm ci```. Now change to the ```backend``` directory and run ```$ npm ci```. To start the node runtimes both the front-end and back-end servers need to be started. Change to the ```backend``` directory and run ```$ npm run start```. Then, in another terminal, change to the ```frontend``` directory and run ```$ npm run start```. To start the Elasticsearch Database instance, in another terminal, run ```$ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.4.2```. In a browser, go to ```localhost:4200``` and the application should be served.

Note: for Windows systems, a minor edit needs to be made in the ```package.json``` files in both the ```frontend``` and “backend” directory. Inside the ```package.json``` in the ```frontend``` directory, change ```"start": "NODE_ENV=development ng serve```,
“ to ```"start": "SET NODE_ENV=development && ng serve",```. Inside the ```package.json``` in the ```backend``` directory, change ```"start": "SET NODE_ENV=development && nodemon",``` to ```"start": "SET NODE_ENV=development && nodemon",```.

## Using Docker Compose

Make sure Docker is installed on your system. In the root directory of the project, run ```docker-compose -f docker-compose.yml up --build```. This will create all the images, build the docker container, and run the docker container.


## Launching the Cybera instance and deploying the application

Using Cybera’s Rapid Access Cloud (RAC) service, you can launch instances of virtual machines and run the application on the instance.

1. Creating an instance

In the RAC dashboard, select the “Instances” tab under the “Compute” dropdown (left side). Within the “Instances” tab, select “Launch Instance”. On the “Launch Instance” window, you can provide a name, flavour, and boot source. For our project, we initialized a “youcanbenefit” instance with a m1.large hardware and Ubuntu 18.04 boot image. In the “Access & Security” tab, we assigned a key pair (see below) to access the instance using SSH. In the “Security Groups” tab, we used the default security group. Finally, click on “Launch” and the instance will be created shortly. Once the instance is finished spawning, below the Action column in the instance, associate a floating IP address to the instance. Allocate a new IP address if one hasn’t been allocated yet. Then associate a public IP address to the instance.

2. Creating a key pair

In the RAC dashboard, select the “Key Pairs” tab under the “Compute” dropdown (left side). This shows a list of all the key pairs on your account. Click on “Create Key Pair” and assign a name to the key pair. Upon creating the key pair, a “<name>.pem” file should be promptly downloaded. This is the file that provides SSH access to any instance associated with the key pair.

3. SSHing into instance

First, for newly created instances, security rules need to be managed to allow ingress connection for SSH connections on port 22. In the RAC dashboard, select the “Security Groups” tab under the “Network” dropdown (left side). Click on “Manage Rules” for the default security group. Add a rule that uses the TCP protocol on port 22 for an ingress connection. For the remote IP address, type in your public IP address and set the CIDR to 24 (the last 8 bits of the address define different hosts on the same network). Now that access is allowed, locate the directory where the key pair “.pem” file is stored. Open a terminal and route to that directory. Afterwards, in that terminal run ```ssh -i ./<name_of_key_pair>.pem ubuntu@<floating_ip_address>```. Upon accepting the RSA fingerprint, an SSH connection should have been successfully made.

Note: If you change to a different network such as your home network versus campus network, SSH may not allow access. Double check the security group has an ingress connection for your public IP address. Alternatively, you could also set the CIDR to 0 and allow any IP address to connect through SSH.

4. Exposing a port to public access

Typically, it would be better to launch a web server to service HTTP requests for resources of the application. For our purposes, we’re exposing the localhost on port 4200, which hosts the YouCanBenefit application. In the RAC dashboard, select the “Security Groups” tab under the “Network” dropdown (left side). Click on “Manage Rules” for the default security group. Add a rule for an ingress connection using the TCP protocol on port 4200 using a remote IP address of 0.0.0.0 and a CIDR of 0. This allows all incoming connection access to the resource on port 4200.

## Launching the application on the instance

### Setting up the environment
1. Install docker: ```$ sudo snap install docker```
2. Start docker: ```$ sudo snap start docker```
3. Clone git repository: ```$ git clone https://github.com/ECE422-2020W-T1/youcanbenefit.git```
	Note: To see the new changes: ```$ git checkout dev```

### Launch the application
1. Change working directory to repo: ```$ cd youcanbenefit/```
2. Run the build and launch app using docker-compose:
	```$ sudo docker-compose -f docker-compose.yml up --build```
