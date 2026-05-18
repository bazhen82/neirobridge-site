# Deploy to Timeweb with Portainer and Caddy

## 1. Push project to GitHub

Create a repository and push this project.

## 2. Clone on server

```bash
cd /opt
git clone https://github.com/bazhen82/neirobridge-site.git
cd /opt/neirobridge-site
```

## 3. Build and start container

```bash
docker compose up -d --build
```

The container joins the existing `stack_default` network, so Caddy can reach it by name:

```text
neirobridge-site:3000
```

## 4. Add Caddy route

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
