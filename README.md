<h1 align=center>Experimental ZEIT Now Builders</h1>

<p align=center>
The main goal is to provide experimental ZEIT Now Builders on steroids. <br/>
The development started with PHP builder, which has been separated to <a href="https://github.com/juicyfx/now-php">juicyfx/now-php</a>. <br>
At this time this repository contain testing PHP and Markdown builders.
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

Examples:

- https://now-builders-pure.juicyfx1.now.sh


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

- https://now-builders-php.juicyfx1.now.sh

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
