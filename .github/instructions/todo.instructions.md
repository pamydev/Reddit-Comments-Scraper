---
applyTo: "**"
---

# Concept to create a reddit thread scraper

The main concept is the user will provide a reddit body html page file and will put in this actual folder with name `source.html`. The script will read this file, parse the html to extract the comments and save them.

The program will ask user the type of output file, between .txt or .md (markdown) or .pdf.

The program will ask either the name of the output file or will generate a default name based on the reddit thread title.

The program will save the output file in the same folder as the script.

The program will log in the console the progress of the operation, like "Reading source file...", "Parsing comments...", "Saving output file...", etc. It will provide a percentage of done work with animated progress bar.

The program will handle errors gracefully, like "Source file not found", "Error parsing html", "Error saving output file", etc.

The program will be written in Node.js and will use libraries like `fs` for file operations, `cheerio` for html parsing, and `pdfkit` for pdf generation if needed.

The program will be run from the command line, and will provide a simple and user-friendly interface for the user to interact with.

# Output format example

I don't need the name of the user who posted the comment, just the comment text itself, in a clean format.

- Separate each comment with a dashed line for better readability.

# How to scrappe the reddit thread html

Reddit `./source.html` page has this kind of structure for comments:

````html
<div
  class="md text-14-scalable rounded-2 pb-2xs overflow-hidden"
  id="t1_nnl2b0k-comment-rtjson-content"
  slot="comment">
  <div
    id="t1_nnl2b0k-post-rtjson-content"
    class="py-0 xs:mx-xs mx-2xs max-w-full scalable-text"
    style="--emote-size: 20px">
    <p>Classes. I like having 1 character</p>
  </div>
</div>
``` The comment text is inside the `
<p>` tag, which is inside a `</p>
<div>
  `, which is inside another div with attribute `slot="comment"`. You must parse
  the html to find all `
  <div>
    ` elements with attribute `slot="comment"`, then get the inner `
    <p>` tag text. Comments can have a lot of `</p>

    <p>` tags if they have multiple paragraphs, so you must get all `</p>
    <p>
      ` tags inside the comment div and join their text with double new lines.
    </p>
  </div>
</div>
````
