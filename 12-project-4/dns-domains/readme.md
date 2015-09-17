# DNS, Domains, and Heroku

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