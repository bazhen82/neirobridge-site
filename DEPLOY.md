# Deploy to Timeweb with Portainer and Caddy

## 1. Push project to GitHub

Create a repository and push this project.

## 2. Clone on server

```bash
cd /opt
git clone https://github.com/bazhen82/neirobridge-site.git
cd /opt/neirobridge-site
```

## 3. Configure environment

Create `.env`:

```bash
nano .env
```

Use SMTP credentials from your hosting mailbox, for example `site@neirobridge.ru`:

```env
SMTP_HOST=your_smtp_host
SMTP_PORT=465
SMTP_USER=site@neirobridge.ru
SMTP_PASS=your_mailbox_password
SMTP_FROM=NeiroBridge <site@neirobridge.ru>
LEAD_TO_EMAIL=bazhenov.maxim@gmail.com
```

The public site does not expose `LEAD_TO_EMAIL`. It is used only inside the server container.

## 4. Build and start container

```bash
docker compose -p neirobridge-site up -d --build
```

The container joins the existing `stack_default` network, so Caddy can reach it by name:

```text
neirobridge-site:3000
```

## 5. Add Caddy route

Edit `/opt/stack/Caddyfile` and add:

```caddy
neirobridge.ru {
  reverse_proxy neirobridge-site:3000
}

www.neirobridge.ru {
  redir https://neirobridge.ru{uri} permanent
}
```

Then reload Caddy:

```bash
docker exec stack-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
```

## 6. Update existing deployment

```bash
cd /opt/neirobridge-site
git pull
docker compose -p neirobridge-site up -d --build
```
