# Reddit Comments Scraper

A simple and efficient Node.js application to extract and save Reddit thread comments from HTML files.

## Features

- 📥 Extract all comments from a Reddit thread HTML file
- 📝 Multiple output formats: Text (`.txt`), Markdown (`.md`), or PDF (`.pdf`)
- 🎨 Interactive CLI with progress tracking
- 🚀 Clean, formatted output with comment separation
- ⚡ Fast HTML parsing with cheerio
- 📊 Real-time progress bar

## Installation

1. Clone this repository:

```bash
git clone https://github.com/pamydev/Reddit-Thread-Downloader.git
cd Reddit-Thread-Downloader
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Step 1: Get the Reddit Thread HTML

1. Open the Reddit thread you want to download in your browser
2. Right-click anywhere on the page and select **"Save As"** or **"Save Page As"**
3. Save the complete HTML file as `source.html` in the project directory

### Step 2: Run the Downloader

```bash
npm start
```

Or:

```bash
node main.js
```

### Step 3: Follow the Prompts

The application will guide you through:

1. **Select output format:**

   - Text (`.txt`) - Plain text with dashed separators
   - Markdown (`.md`) - Markdown format with horizontal rules
   - PDF (`.pdf`) - Formatted PDF document

2. **Enter filename:**
   - Type your desired filename (without extension)
   - Or press Enter to use the default: `reddit-thread-comments`

### Step 4: Done!

Your file will be saved in the same directory with all the extracted comments.

## Output Format

### Text (.txt)

Comments are separated by dashed lines (80 characters):

```
This is the first comment.

--------------------------------------------------------------------------------

This is the second comment.
```

### Markdown (.md)

Comments are separated by horizontal rules:

```markdown
This is the first comment.

---

This is the second comment.
```

### PDF (.pdf)

Professional-looking PDF with:

- Title header
- Proper spacing and formatting
- Horizontal separators between comments
- Automatic page breaks

## Example

```bash
$ npm start

🚀 Reddit Thread Downloader

Progress |████████████████████████████████████████| 40% | Found 147 comments

✓ Found 147 comments

? Select output format: Text (.txt)
? Enter the output filename (without extension): my-reddit-thread

Progress |████████████████████████████████████████| 100% | Complete!

✓ Successfully saved to: my-reddit-thread.txt
✓ Total comments extracted: 147
```

## Error Handling

The application handles common errors gracefully:

- **Source file not found**: Make sure `source.html` exists in the project directory
- **No comments found**: Verify the HTML file contains Reddit comments
- **Invalid filename**: Filename cannot be empty

## Technical Details

### Dependencies

- **cheerio** - Fast HTML parsing
- **cli-progress** - Animated progress bars
- **pdfkit** - PDF generation
- **inquirer** - Interactive command-line prompts

### How It Works

1. Reads the `source.html` file
2. Parses HTML using cheerio to find all `div[slot="comment"]` elements
3. Extracts text from all `<p>` tags within each comment
4. Joins multi-paragraph comments with double newlines
5. Generates output in the selected format
6. Saves the file with the user-specified name

## Requirements

- Node.js 12.0 or higher
- npm

## License

MIT

## Author

Pamela Sedrez

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/pamydev/Reddit-Thread-Downloader/issues) on GitHub.
