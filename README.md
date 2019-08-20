
# Arable Developer's Site

https://developer.arable.com

# Quick start

Install this project and run at localhost
```
yarn install
yarn docs:dev
````

Generate static assets for prod deployment
```
yarn docs:build
```

# Default Page Routing

| Relative Path | Page Routing |
|---|---|
| `/README.md` | `/` |
| `/guild/README.md` | `/guide` |
| `/guild/howto.md` | `/guide/howto.html` |
| `/config.md` | `/config.html` |

# Credits

This site is built with vuepress, detailed vuepress documentation can be found here
https://v1.vuepress.vuejs.org/
