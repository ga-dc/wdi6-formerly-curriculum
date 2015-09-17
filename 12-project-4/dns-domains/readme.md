# DNS, Domains, and Heroku

- [screencast](https://vimeo.com/139603694)

Today is all about purchasing a domain name and setting it up!

## DNS (Domain Name System)

DNS is a is a distributed naming system for mapping domain names to IP addresses.

### You do: Read Episode 1 and 5

- https://howdns.works/ep1/
- https://howdns.works/ep5/

## Purchasing a Domain

There are 1,720 accredited registrars on ICANN's website - https://www.icann.org/registrar-reports/accredited-list.html

ICANN - Internet corporation for assigned names and numbers

Choosing between them can be difficult, but they are mostly all the same. I decide between registrars based on the type
of domain I need.

### Everyday Domains (Common TLDs)

- https://www.namecheap.com/
- https://www.name.com/

### Domain Hacks

Domain hacks are clever domain choices that let you either tell a story or say something interesting with your domain, like:

- https://jesse.sh/awl/
- https://generalassemb.ly 
- http://del.icio.us
- http://jessicahische.is/thinkingthoughts

Here are some useful registrars / tools to help you find a cool domain!

- https://domainr.com/
- http://xona.com/domainhacks/

### International Domains

- https://iwantmyname.com/

### You do: Purchase a domain

Or find one you like and think about buying it later...

## Hosting DNS

Once a domain is purchased, we have to configure a nameserver to specify where the DNS configuration
for this domain is hosted.

That is, we might want all of our requests to www.jesse.com to go to Heroku, all requests to files.jesse.com to
go to Amazon S3, and all email sent to and from jesse@jesse.com to be handled via Gmail.

A nameserver is like a phone book for the Internet. A server is like a phone, and a domain is like that phone's listing in the phone book. What's missing? The actual phone number.

To actually access a domain, you need to know its server's IP address, e.g. 172.20.4.117. These are difficult to remember, so instead we use domains -- generalassemb.ly, google.com, and so on -- which are much more human-readable. For instance, if you type 162.243.23.12 into your address bar, it takes you to the same page as if you typed jshawl.com into your address bar.

When you type jshawl.com into your browser's address bar and hit "send", that request first goes to a special computer called a Nameserver. Its whole job is to look up domains in the Domain Name System -- the "phone book" of the Internet, which has every domain listed alongside its IP address. It sees that jshawl.com is listed alongside 162.243.23.12, similar to how "Jenny Brown" is listed in the phone book alongside "867-5309".

Once it's found the IP address, the nameserver forwards your request onto that IP, and business continues as usual. This all happens extremely quickly.

Where do we configure this?

Typically, your web host will offer free DNS hosting as well. They all work very similarly, but I'll be using
Digital Ocean for this example.

Set the nameservers to point to 

- `ns1.digitalocean.com`
- `ns2.digitalocean.com`
- `ns3.digitalocean.com`

Once the nameservers are set, we can then add a domain with our web host and configure DNS records.

Visit digitalocean and add a domain.

### You do: A records vs CNAME aliases

Read https://support.dnsimple.com/articles/differences-a-cname-records/

If you're curious, MX records allow you to host your email with Google Apps.

>Each MX record points to an email server that’s configured to process mail for that domain. There’s typically one record that points to a primary server, then additional records that point to one or more backup servers. For users to send and receive email, their domain's MX records must point to a server that can process their mail.

- http://www.google.com/support/enterprise/static/postini/docs/admin/en/activate/mx_faq.html

## Connecting the Domain to our App

### Self-Hosted Apps

Remember Adrian's lesson from yesterday? We created a virtual private server and deployed our
application to serve at some ip address: http://45.55.192.227/ 

If we wanted to reference this IP with the domain www.jesse.com, which record would we use?

DNS takes time to propagate - https://kb.intermedia.net/article/797

While we wait for the rest of the internet to acknowlege our purchase, we can fake
the DNS locally.

    $ sudo vim /etc/hosts

Add a line like this:

    45.55.192.227   www.jesse.com

This is a common way to test out DNS changes before they are live to the rest of the world.

### Heroku

https://devcenter.heroku.com/articles/custom-domains

>Q: Heroku *only* allows CNAMEs or Aliases. Why do you think that is?

    $ heroku domains:add www.jammy.com

### GitHub Pages

https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/

This process is very similar to Heroku.