/*
    REDDIT THREAD DOWNLOADER
    A simple Node.js application to download Reddit threads as text files.
    Author: Pamela Sedrez
    License: MIT
*/

const fs = require("fs").promises;
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");
const PDFDocument = require("pdfkit");
const inquirer = require("inquirer");
const path = require("path");
const fsSync = require("fs");

// Configuration
const SOURCE_FILE = "./source.html";
const OUTPUT_FORMATS = ["txt", "md", "pdf"];

/**
 * Parse HTML and extract Reddit comments
 * @param {string} html - HTML content to parse
 * @returns {Array<string>} - Array of comment texts
 */
function parseComments(html) {
  const $ = cheerio.load(html);
  const comments = [];

  // Find all divs with slot="comment"
  $('div[slot="comment"]').each((index, element) => {
    const paragraphs = [];

    // Get all <p> tags within the comment div
    $(element)
      .find("p")
      .each((i, p) => {
        const text = $(p).text().trim();
        if (text) {
          paragraphs.push(text);
        }
      });

    // Join paragraphs with double newlines
    if (paragraphs.length > 0) {
      comments.push(paragraphs.join("\n\n"));
    }
  });

  return comments;
}

/**
 * Generate text file output
 * @param {Array<string>} comments - Array of comments
 * @param {string} filename - Output filename
 */
async function generateTxtFile(comments, filename) {
  const separator = "\n" + "-".repeat(80) + "\n\n";
  const content = comments.join(separator);
  await fs.writeFile(filename, content, "utf8");
}

/**
 * Generate markdown file output
 * @param {Array<string>} comments - Array of comments
 * @param {string} filename - Output filename
 */
async function generateMdFile(comments, filename) {
  const separator = "\n\n---\n\n";
  const content = comments.join(separator);
  await fs.writeFile(filename, content, "utf8");
}

/**
 * Generate PDF file output
 * @param {Array<string>} comments - Array of comments
 * @param {string} filename - Output filename
 */
function generatePdfFile(comments, filename) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fsSync.createWriteStream(filename);

    stream.on("finish", resolve);
    stream.on("error", reject);

    doc.pipe(stream);

    // Add title
    doc.fontSize(20).text("Reddit Thread Comments", { align: "center" });
    doc.moveDown(2);

    // Add each comment
    comments.forEach((comment, index) => {
      if (index > 0) {
        doc.moveDown();
        doc
          .strokeColor("#cccccc")
          .lineWidth(1)
          .moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .stroke();
        doc.moveDown();
      }

      doc.fontSize(11).fillColor("#000000").text(comment, {
        align: "left",
        lineGap: 5,
      });

      // Check if we need a new page
      if (doc.y > 700 && index < comments.length - 1) {
        doc.addPage();
      }
    });

    doc.end();
  });
}

/**
 * Prompt user for output format and filename
 * @returns {Object} - User preferences
 */
async function getUserPreferences() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "format",
      message: "Select output format:",
      choices: [
        { name: "Text (.txt)", value: "txt" },
        { name: "Markdown (.md)", value: "md" },
        { name: "PDF (.pdf)", value: "pdf" },
      ],
    },
    {
      type: "input",
      name: "filename",
      message: "Enter the output filename (without extension):",
      default: "reddit-thread-comments",
      validate: input => {
        if (!input.trim()) {
          return "Filename cannot be empty";
        }
        return true;
      },
    },
  ]);

  return answers;
}

/**
 * Main execution function
 */
async function main() {
  console.log("\n🚀 Reddit Thread Downloader\n");

  const progressBar = new cliProgress.SingleBar({
    format: "Progress |{bar}| {percentage}% | {stage}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  try {
    // Start progress bar
    progressBar.start(100, 0, { stage: "Initializing..." });

    // Step 1: Read source file (20%)
    progressBar.update(0, { stage: "Reading source file..." });

    try {
      await fs.access(SOURCE_FILE);
    } catch (error) {
      throw new Error(`Source file not found: ${SOURCE_FILE}`);
    }

    const html = await fs.readFile(SOURCE_FILE, "utf8");
    progressBar.update(20, { stage: "Source file loaded" });

    // Step 2: Parse comments (40%)
    progressBar.update(20, { stage: "Parsing comments..." });
    const comments = parseComments(html);

    if (comments.length === 0) {
      throw new Error("No comments found in the HTML file");
    }

    progressBar.update(40, { stage: `Found ${comments.length} comments` });

    // Step 3: Get user preferences (50%)
    progressBar.stop();
    console.log(`\n✓ Found ${comments.length} comments\n`);

    const { format, filename } = await getUserPreferences();
    const outputFile = `${filename}.${format}`;

    progressBar.start(100, 50, { stage: "Preparing output..." });

    // Step 4: Generate output file (90%)
    progressBar.update(50, {
      stage: `Generating ${format.toUpperCase()} file...`,
    });

    switch (format) {
      case "txt":
        await generateTxtFile(comments, outputFile);
        break;
      case "md":
        await generateMdFile(comments, outputFile);
        break;
      case "pdf":
        await generatePdfFile(comments, outputFile);
        break;
    }

    progressBar.update(90, { stage: "Saving output file..." });

    // Step 5: Complete (100%)
    progressBar.update(100, { stage: "Complete!" });
    progressBar.stop();

    console.log(`\n✓ Successfully saved to: ${outputFile}`);
    console.log(`✓ Total comments extracted: ${comments.length}\n`);
  } catch (error) {
    progressBar.stop();
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

// Run the application
main();
