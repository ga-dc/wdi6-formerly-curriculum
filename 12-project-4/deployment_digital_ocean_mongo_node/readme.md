# Deploying to Digital Ocean

## Learning Objectives
* Create a Digital Ocean droplet.
* Log into a server via SSH.
* Install dependencies on a server.
* Install a webserver.
* Clone an application to a Virtual Private Server (VPS).
* Set up a domain and proxy server.
* Configure a reverse proxy.

## Before Class: Create a Digital Ocean account

Digital Ocean only offers paid accounts, but they charge fractions of a cent per hour your server is running.
* You can probably find a promo code online [through Google](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=digitalocean+promo+code).
* If you choose not to go with Digital Ocean for your project, feel free to delete your droplet/account after this class.

## Why are we doing this?

Why do we use Heroku?
* **Automation.** Very little server-side installation required. Don't have to manage server infrastructure.
* **Easy.** Depending on app complexity, deploying to Heroku can be a quick and easy process. Can do it in literally one CLI command -- `git push`.

What are the drawbacks of Heroku?
* **Convention.** Deploying to Heroku requires specific configuration.
* **Very little customization.**

Why go with an alternate web server?
* **Customization.** We can set up our production environment much like we do our development.
  * Can install whatever dependencies -- whether they be gems, npm modules, etc. -- however we see fit.

Digital Ocean, in particular, has its benefits.  
* **Quick set-up.** Can set up a new Virtual Private Server (VPS) in 60 seconds.
* **Very fast.** Their VPS's run on solid state drives.
* **Cheaper.** In a sense. You're paying for convenience and reliability.

## Choose an Application to Deploy

While you are more than welcome to try uploading your own, I suggest you use a finished product to familiarize yourself with this process.
* Today we'll be working with the [Express version of Tunr](https://github.com/ga-dc/tunr_mongo_oojs).
* **NOTE:** The deployment process will vary depending on what backend you are using. If you are using Rails for your final project, there are a number of helpful resources like [this](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-rails-app-with-unicorn-and-nginx-on-ubuntu-14-04).

## Create a Droplet

A "droplet" is simply a virtual private server (VPS) in Digital-Ocean-speak.  

Once you have set up a Digital Ocean account, click the "Create Droplet" button in the upper-right corner of your dashboard. Once there, do the following...

1. **Name your droplet.** This can be anything.
2. **Select Size.** The $5 option works fine in this case.
3. **Select region.** We'll go with the default option of New York 3.
4. **Select Image.** Choose Ubuntu 14.04 x64.
5. **Add SSH Key.** Generate one by running this in your Terminal: `$ cat ~/.ssh/id_rsa.pub | pbcopy`
  * **Note:** This is a Mac-only command.
  * This automatically copies your SSH key to your clipboard.
  * Provides increased security and easy log-in from your computer.

## Log into Droplet

Once your server is up and running, let's log into it via the Terminal: `$ ssh root@your-droplets-ip`
* We'll be logging in as the `root` user.
* Your droplet's IP address is available on the droplet dashboard.
* You might be prompted for a new password. Keep it simple for this example.

![Log into Droplet](img/log-in-to-droplet.png)

## Install Node, Npm and Git

Because we're running an Express application and need to clone it from a GitHub repo, we need to install Node, Npm and Git.

```
$ sudo apt-get update
$ sudo apt-get install nodejs npm git
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
```
> `apt-get` is Ubuntu's package management program, not unlike npm for Node and gem for Ruby.  

> `sudo apt-get update` downloads package lists from their source repositories and downloads the latest version. Essentially, `bundle update` for Ubuntu.  It's good practice to do this before adding new dependencies via `apt-get`.  

> That last line aliases `node` from the existing `nodejs` so we can later run commands like `node app.js`.  
* You won't see any output after running this line of code.
* `ln` creates links between files.

You can verify if Node and Git were properly installed by typing `$ which git` or `$ which node` into the server console.
* You should see something like this: `/usr/bin/node`

## Install MongoDB

We also need to set up a database for our application. For this app, we'll go with MongoDB.

```
$ sudo apt-get install mongodb
```

## Install a web server

### What is a web server?

A web server is what will process and respond to incoming HTTP requests to our deployed application.
* Yes, there is a difference between our droplet "server" and a "web server". The former hosts and runs our application.
* You're no strangers do web servers. Do you remember what the equivalent for Rails is?
* Today we'll be using one called **nginx.**

### What is nginx?

A fast web server with low memory usage.
* Key feature is that it can also act as a **reverse proxy server**. More on that later.
* Apache is a popular alternative.
* We can install nginx like so...

`$ sudo apt-get install nginx`

You'll know nginx is up and running it you visit your server's IP address (e.g., `http://INSERT.IP.ADDRESS`) in the browser. You should see something like this...  

![Welcome to nginx](img/welcome-to-nginx.png)

nginx is ready! Now we need our application to tell it what exactly to do with those HTTP requests...  

## Clone the app to VPS

Typically you would create a user account to handle deploys and permissions. **Why is that?**
* If you're logged in as root, that means every application is running with root privileges. Any security vulnerability in one of those applications could allow for unwanted access everywhere, whether that be by a third party or accidental deletion of files.
* If we're logged in as a user that is given superuser privileges, we need to explicitly say (e.g., `sudo`) when we want to run an administrative task that requires root privileges.

In the interest of time, however, we'll continue using the root user.  

```
$ mkdir /var/www
$ cd /var/www
$ git clone https://github.com/ga-dc/tunr_mongo_oojs.git
$ git checkout deploy
```
> `/var/www` is going to be the base directory for all applications in this server.  

> It's important that we run this application from the deploy branch!  

```
$ node db/seeds.js
$ node app.js
```

Visit http://YOUR.IP.ADDRESS:3000/

It works!

## Set up Domain

Ultimately, we don't want to access our application by typing its IP address into our browser. Instead, we'd like to use a custom domain. Let's see how that would work...

Enter the following into your **local** terminal, **not your droplet!** `$ sudo vim /etc/hosts`  
* Enter whatever password you use to log into your computer.  

Once in that file, enter the following line below the one that reads: `127.0.0.1  localhost`
* `your-droplet-ip-address    tunr.com`

What do you see when you visit http://tunr.com:3000 in the browser?
* WOAH. We just aliased the `tunr.com` URL to our droplet's IP address.
* We already do the same thing with `localhost` and `http://127.0.0.1`.
* We're going to make a similar adjustment to our server next.
* You may have gotten the sense that we're "faking" a URL here. And you're right! Jesse will be teaching a class tomorrow about getting your application up and running on a custom domain.

## Configure a Reverse Proxy Server

Now we're going to use nginx to receive and direct HTTP requests (i.e., act as a "reverse proxy server").  

Enter the below commands in your **droplet console**...

```
$ cd /etc/nginx/sites-enabled/
$ sudo vim tunr.com
```
> Each file in this `sites-enabled` directory is a "virtual host" that represents an application hosted on our server. We don't actually host tunr.com, but because we set up a local proxy server we can pretend we do!

Enter the following in our new file, or "virtual host"...

```
server{
  server_name tunr.com;
  listen 80;
  root /var/www/tunr_node_oojs/public;
  location / {
    // First checks to see if the requested file exists in the assigned root directory.
    // If not, then asks the app if it's storing it elsewhere.
    try_files $uri @tunr;
  }
  location @tunr {
    // Allows us to log incoming requests to our application.
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $host;
    proxy_pass http://127.0.0.1:3000;
  }
}
```

Now, restart nginx. What do you see?

```
$ sudo service nginx restart
$ node /var/www/tunr_node_oojs
```

![Bad gateway](img/bad-gateway.png)

Hm, a "bad gateway" error...
* This just means are app isn't running.
* We could fix this by going back and running `node app.js`. Or we could make it so our app runs..."forever."

```
$ npm install -g forever
$ cd /path/to/app
$ forever start app.js
```
> Forever is an npm module that allows a node script to run continuously. Learn more about it [here](https://www.npmjs.com/package/forever).

Ta-da! All done!

## Next Steps

* [Configure git-push auto deploy](http://joemaller.com/990/a-web-focused-git-workflow/).
