<h1 align=center>Experimental Vercel Runtimes</h1>

<p align=center>
The main goal is to provide experimental Vercel Runtimes on steroids. <br/>
The development started with PHP builder, which has been separated into <a href="https://github.com/juicyfx/now-php">juicyfx/now-php</a>. <br>
At this time this repository contains a testing version of PHP builder, Markdown builder and pure (testing) builder.
</p>

<p align=center>
🔥 This repository is deprecated, take a look at <a href="https://github.com/juicyfx/juicy">juicy monorepo</a>.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

## Builders

### Pure

```json
{
  "version": 2,
  "builds": [
    { "src": "file.xyz", "use": "@juicyfx/pure@canary" }
  ]
}
```

### [🐘 PHP](https://github.com/juicyfx/now-php)

```json
{
  "version": 2,
  "builds": [
    { "src": "index.php", "use": "now-php" }
  ]
}
```

Examples:

- https://php.now.sh/

### Markdown

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*.md",
      "use": "@juicyfx/md@canary",
      "config": {
      "title": "Demo Project",
      "css": [
        "https://CDN/lib.css",
        "/dist/theme.css"
      ],
      "js": [
        "https://CDN/lib.js",
        "/dist/main.js"
      ]
      }
    }
  ]
}
```

## 📝 License

Copyright © 2019 [f3l1x](https://github.com/f3l1x).
This project is [MIT](LICENSE) licensed.
