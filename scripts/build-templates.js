#!/usr/bin/env node

/**
 * Build Templates Script
 * Builds and packages all n8n templates
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const BUILD_DIR = path.join(__dirname, '..', 'dist');

/**
 * Creates the build directory structure
 */
function createBuildDir() {
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }

  // Clear existing build
  const buildContents = fs.readdirSync(BUILD_DIR);
  buildContents.forEach(item => {
    const itemPath = path.join(BUILD_DIR, item);
    if (fs.statSync(itemPath).isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(itemPath);
    }
  });
}

/**
 * Copies template files to build directory
 * @param {string} templatePath - Source template path
 * @param {string} buildPath - Destination build path
 */
function copyTemplate(templatePath, buildPath) {
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath, { recursive: true });
  }

  const files = fs.readdirSync(templatePath);
  files.forEach(file => {
    const srcPath = path.join(templatePath, file);
    const destPath = path.join(buildPath, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyTemplate(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/**
 * Generates template index
 * @param {string[]} templatePaths - Array of template paths
 */
function generateIndex(templatePaths) {
  const index = {
    generated: new Date().toISOString(),
    version: '1.0.0',
    templates: []
  };

  templatePaths.forEach(templatePath => {
    const workflowPath = path.join(templatePath, 'workflow.json');
    const readmePath = path.join(templatePath, 'README.md');

    if (fs.existsSync(workflowPath)) {
      try {
        const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
        const readme = fs.existsSync(readmePath)
          ? fs.readFileSync(readmePath, 'utf8')
          : '';

        // Extract description from README
        const descriptionMatch = readme.match(/^[^#\n]*\n\n([^#]+)/);
        const description = descriptionMatch
          ? descriptionMatch[1].trim()
          : 'No description available';

        // Extract category from path
        const relativePath = path.relative(TEMPLATES_DIR, templatePath);
        const category = relativePath.split(path.sep)[0];

        index.templates.push({
          id: path.basename(templatePath),
          name: workflow.name || path.basename(templatePath),
          description,
          category,
          path: relativePath,
          tags: workflow.tags || [],
          nodes: workflow.nodes ? workflow.nodes.length : 0,
          version: workflow.versionId || '1'
        });

      } catch (error) {
        console.warn(`⚠️  Could not process template: ${templatePath}`, error.message);
      }
    }
  });

  // Write index file
  fs.writeFileSync(
    path.join(BUILD_DIR, 'index.json'),
    JSON.stringify(index, null, 2)
  );

  return index;
}

/**
 * Finds all template directories
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of template paths
 */
function findTemplates(dir) {
  const templates = [];

  function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    if (items.includes('workflow.json')) {
      templates.push(currentDir);
      return;
    }

    items.forEach(item => {
      const itemPath = path.join(currentDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        searchDir(itemPath);
      }
    });
  }

  searchDir(dir);
  return templates;
}

/**
 * Main build function
 */
function main() {
  console.log('🏗️  Building n8n templates...\n');

  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error('❌ Templates directory not found:', TEMPLATES_DIR);
    process.exit(1);
  }

  // Create build directory
  createBuildDir();

  // Find templates
  const templatePaths = findTemplates(TEMPLATES_DIR);

  if (templatePaths.length === 0) {
    console.log('⚠️  No templates found in', TEMPLATES_DIR);
    return;
  }

  console.log(`Found ${templatePaths.length} template(s)\n`);

  // Copy templates to build directory
  templatePaths.forEach(templatePath => {
    const relativePath = path.relative(TEMPLATES_DIR, templatePath);
    const buildPath = path.join(BUILD_DIR, 'templates', relativePath);

    console.log(`📁 Building ${relativePath}...`);
    copyTemplate(templatePath, buildPath);
  });

  // Generate index
  console.log('\n📋 Generating template index...');
  const index = generateIndex(templatePaths);

  // Copy additional files
  const additionalFiles = ['README.md', 'LICENSE.md', 'package.json'];
  additionalFiles.forEach(file => {
    const srcPath = path.join(__dirname, '..', file);
    const destPath = path.join(BUILD_DIR, file);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📄 Copied ${file}`);
    }
  });

  console.log('\n✅ Build completed successfully!');
  console.log(`📁 Output directory: ${BUILD_DIR}`);
  console.log(`📊 Templates built: ${index.templates.length}`);

  // Print summary by category
  const categories = {};
  index.templates.forEach(template => {
    categories[template.category] = (categories[template.category] || 0) + 1;
  });

  console.log('\n📈 Templates by category:');
  Object.entries(categories).forEach(([category, count]) => {
    console.log(`   ${category}: ${count}`);
  });
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
