# crocodile-backend

## nginx conf

```nginx configuration
server {
    listen 80;
    listen [::]:80;
    server_name crocodile-backend.std-1822.ist.mospolytech.ru;

    root /home/std/crocodile-backend;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Access-Control-Allow-Origin 'http://crocodile-frontend.std-1822.ist.mospolytech.ru';
        # proxy_http_version 1.1;
        # proxy_set_header Upgrade $http_upgrade;
        # proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        # proxy_cache_bypass $http_upgrade;
        # try_files $uri $uri/ =404;
    }

}
```