# Résumé source

Edit `resume.txt`, then regenerate the HTML and PDF from the repository root:

```sh
python3 scripts/build-resume.py
weasyprint resume/resume.html public/resume.pdf
```

The renderer uses Python's standard library. PDF export requires WeasyPrint.
`public/resume.pdf` is the version served by the website.

For an employer-specific email alias, render to a local application folder:

```sh
python3 scripts/build-resume.py --email employer@nedlane.com --output career/employer-resume.html
weasyprint career/employer-resume.html career/employer-resume.pdf
```

Career research, trackers and application drafts live in the ignored `career/`
directory. They are not published with the website.
