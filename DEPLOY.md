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

For the first test you can use Resend's onboarding sender:

```env
RESEND_API_KEY=your_resend_api_key
LEAD_TO_EMAIL=bazhenov.maxim@gmail.com
LEAD_FROM_EMAIL=NeiroBridge <onboarding@resend.dev>
```

Later, after verifying `neirobridge.ru` in Resend, replace `LEAD_FROM_EMAIL` with an address on your domain.

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
