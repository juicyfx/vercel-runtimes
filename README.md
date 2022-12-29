<h1 align=center>Vercel Runtimes</h1>

<p align=center>
The main goal is to dig deeper into Vercel Runtimes. <br/>
The development started with PHP builder, which has been separated into <a href="https://github.com/vercel-community/php">vercel-php</a>. <br>
At this time this repository contains a testing versions of various runtimes.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

## Builders

### Plain

```json
{
  "builds": [
    { "src": "file.txt", "use": "vercel-plain@0.0.2" }
  ]
}
```

### [🐘 PHP](https://github.com/vercel-community/php)

```json
{
  "builds": [
    { "src": "index.php", "use": "vercel-php@0.5.2" }
  ]
}
```

### Markdown

```json
{
  "builds": [
    {
      "src": "**/*.md",
      "use": "vercel-md@0.0.5",
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

### Debug

```json
{
  "builds": [
    { "src": "file.txt", "use": "vercel-debug@0.0.1" }
  ]
```

## 📝 License

Copyright © 2019 [f3l1x](https://github.com/f3l1x).
This project is [MIT](LICENSE) licensed.
