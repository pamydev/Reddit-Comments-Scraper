---
applyTo: "**"
---

# Concept to create a reddit thread scraper

The main concept is the user will provide a reddit body html page file and will put in this actual folder with name `source.html`. The script will read this file, parse the html to extract the comments and save them.

The program will ask user the type of output file, between .txt or .md (markdown) or .pdf.

The program will ask either the name of the output file or will generate a default name based on the reddit thread title.

The program will save the output file in the same folder as the script.

The program will log in the console the progress of the operation, like "Reading source file...", "Parsing comments...", "Saving output file...", etc.

The program will handle errors gracefully, like "Source file not found", "Error parsing html", "Error saving output file", etc.

The program will be written in Node.js and will use libraries like `fs` for file operations, `cheerio` for html parsing, and `pdfkit` for pdf generation if needed.

The program will be run from the command line, and will provide a simple and user-friendly interface for the user to interact with.

# Output format example

```
Reddit Thread Title
====================
Comment by u/username1:
This is the first comment in the thread.
Comment by u/username2:
This is the second comment in the thread.
Comment by u/username3:
This is the third comment in the thread.
```
