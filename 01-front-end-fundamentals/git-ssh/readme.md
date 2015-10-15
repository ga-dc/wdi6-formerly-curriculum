# Generating SSH Keys and Linking with Github

## Learning Objectives
* Explain how SSH serves as extra layer of security
* Define and Differentiate between HTTPS and SSH
* List the advantages of an SSH connection

## Opening
Secure Shell (SSH) is a command interface and protocol for securely getting access to a remote computer.
SSH uses public-key cryptography to authenticate the remote computer and allow it to authenticate the user, if necessary. Both ends of the client/server connection are authenticated using a digital certificate, and passwords are protected by being encrypted.

## Step 0: Checking for existing Keys
First, we need to check for existing SSH keys on your computer. Open Terminal and enter:

  ```
  $ ls -al ~/.ssh
  # Lists the files in your .ssh directory, if they exist
  ```

If you already have a key, skip to step 2. Otherwise proceed to step 1.


## Step 1: Generate a new SSH Key
1. With Terminal still open, copy and paste the text below. Make sure you substitute in your GitHub email address.

  ```
  $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  # Creates a new ssh key, using the provided email as a label
  # Generating public/private rsa key pair.
  ```

2. We strongly suggest keeping the default settings as they are, so when you're prompted to "Enter a file in which to save the key", just press Enter to continue.

  ```
  Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
  ```

3. You'll be asked to enter a passphrase.

  ```
  Enter passphrase (empty for no passphrase): [Type a passphrase]
  # Enter same passphrase again: [Type passphrase again]
  ```

4. After you enter a passphrase, you'll be given the fingerprint, or id, of your SSH key. It will look something like this:

  ```
  Your identification has been saved in /Users/you/.ssh/id_rsa.
  # Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
  # The key fingerprint is:
  # 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
  ```
Great now that we have created a new key, we need to add it to the ssh-agent so we can easily access it.

## Step 3: Add Your Key to the SSH-Agent
To configure the ssh-agent program to use your SSH key:
1. Ensure ssh-agent is enabled:

  ```
  # start the ssh-agent in the background
  $ eval "$(ssh-agent -s)"
  # Agent pid 59566
  ```

2. Add your SSH key to the ssh-agent:

  ```
  $ ssh-add ~/.ssh/id_rsa
  ```

*Note*: If you didn't generate a new SSH key in Step 1, and used an existing SSH key instead, you will need to replace `id_rsa` in the above command with the name of your existing private key file.

## Step 3: Add Your SSH Key to your Github Account
To configure your GitHub account to use your SSH key:

Copy the SSH key to your clipboard with:

  ```
  $ pbcopy < ~/.ssh/id_rsa.pub
  # Copies the contents of the id_rsa.pub file to your clipboard
  ```

*Note*: It's important to copy the key exactly without adding newlines or whitespace.

Keep in mind that your key may also be named id_dsa.pub, id_ecdsa.pub or id_ed25519.pub, in which case you must change the filename in the above command

Then in Github:

1. In the top right corner of any page, click your  profile photo, then click Settings.
2. In the user settings sidebar, click SSH keys.
3. Click Add SSH key.
4. In the Title field, add a descriptive label for the key.
5. Paste your key into the "Key" field
6. Click Add key
7. Confirm the action by entering your GitHub password

## Step 5: Checking your Connection
To make sure everything is working, you'll now try to SSH into GitHub. When you do this, you will be asked to authenticate this action using your password, which is the SSH key passphrase you created earlier.

To do this let's:

1. Open Terminal and enter:

  ```
  $ ssh -T git@github.com
  # Attempts to ssh to GitHub
  ```

2. You may see this warning:

  ```
  The authenticity of host 'github.com (207.97.227.239)' can't be established.
  # RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
  # Are you sure you want to continue connecting (yes/no)?
  ```

Verify the fingerprint in the message you see matches the following message, then type yes

3. You should then see output similar to this:
  ```
  Hi username! You've successfully authenticated, but GitHub does not
  # provide shell access.
  ```
If the username in the message is yours, you've successfully set up your SSH key!

*Note*: If you If you receive a message about "access denied," please notify an instructor or you can [read these instructions for diagnosing the issue](https://help.github.com/articles/error-permission-denied-publickey/)

*Note*: If you're switching from HTTPS to SSH, you'll now need to update your remote repository URLs. For more information, [see Changing a remote's URL](https://help.github.com/articles/changing-a-remote-s-url/).

## Setup Upstream for Curriculum Repo
Since we have all already forked and cloned the GA-DC/Curriculum repository onto our local machine - we need a way to be able to update our local copy with any changes being made to the master repository.

One of the ways we can do this is by establishing a link to this remote repository so that we can get all the changes anytime we want.

The convention is to add an `upstream` remote.

This remote is where we can pull from at any time, but do not have permission to push our changes.

So let's go ahead and set up our new remote for our local curriculum repository.

## YOU-DO: Setup Upstream for Curriculum Repo
1. Students should visit the [Curriculum](https://github.com/ga-dc/curriculum)'s page and copy the ssh clone url to the clipboard
2. In our terminal, change directories into our local curriculum directory
```
# in ~/wdi
$ cd curriculum
```
3. See all current remotes with:
`$ git remote -v`
4. Add a new remote named upstream to our repository
5. Pull down updates from the upstream remote

When you finish, please go back into Github and make sure your profile has your accurate FULL NAME, and a relevant Photo of you.

## Closing
Go over learning objectives, and make sure everyone's profiles are up to date.

## Resources
* [Github guide to configure SSH keys](https://help.github.com/articles/generating-ssh-keys/#step-1-check-for-ssh-keys)
* [Changing a remote's URL](https://help.github.com/articles/changing-a-remote-s-url/)
* [Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
