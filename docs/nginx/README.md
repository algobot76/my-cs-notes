# Nginx

[[toc]]

## Snippets

### Authentication

#### Authenticate using a third-party authentication service

```
location /private/ {
    auth_request /auth;
    auth_request_set $auth_status $upstream_status;
}

location = /auth {
    internal;
    proxy_pass http://auth-server;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
}
```
