#!/usr/bin/env node

/**
 * Template Validator Script
 * Validates all n8n templates in the repository
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const REQUIRED_FILES = ['README.md', 'workflow.json', '.env.example'];

/**
 * Validates a single template directory
 * @param {string} templatePath - Path to template directory
 * @returns {object} Validation result
 */
function validateTemplate(templatePath) {
  const templateName = path.basename(templatePath);
  const errors = [];
  const warnings = [];

  // Check required files
  REQUIRED_FILES.forEach(file => {
    const filePath = path.join(templatePath, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing required file: ${file}`);
    }
  });

  // Validate workflow.json
  const workflowPath = path.join(templatePath, 'workflow.json');
  if (fs.existsSync(workflowPath)) {
    try {
      const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

      // Check for required workflow properties
      if (!workflow.name) {
        errors.push('workflow.json missing name property');
      }
      if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
        errors.push('workflow.json missing or invalid nodes array');
      }
      if (!workflow.connections) {
        warnings.push('workflow.json missing connections object');
      }

      // Check for nodes
      if (workflow.nodes && workflow.nodes.length === 0) {
        warnings.push('workflow.json has no nodes');
      }

    } catch (error) {
      errors.push(`Invalid JSON in workflow.json: ${error.message}`);
    }
  }

  // Validate README.md
  const readmePath = path.join(templatePath, 'README.md');
  if (fs.existsSync(readmePath)) {
    const content = fs.readFileSync(readmePath, 'utf8');

    // Check for required sections
    const requiredSections = ['# ', '## Overview', '## Setup Instructions'];
    requiredSections.forEach(section => {
      if (!content.includes(section)) {
        warnings.push(`README.md missing section: ${section}`);
      }
    });

    if (content.length < 500) {
      warnings.push('README.md seems too short (less than 500 characters)');
    }
  }

  return {
    templateName,
    path: templatePath,
    errors,
    warnings,
    valid: errors.length === 0
  };
}

/**
 * Recursively finds all template directories
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of template paths
 */
function findTemplates(dir) {
  const templates = [];

  function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    // Check if this directory contains a workflow.json (making it a template)
    if (items.includes('workflow.json')) {
      templates.push(currentDir);
      return;
    }

    // Otherwise, search subdirectories
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
 * Main validation function
 */
function main() {
  console.log('🔍 Validating n8n templates...\n');

  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error('❌ Templates directory not found:', TEMPLATES_DIR);
    process.exit(1);
  }

  const templatePaths = findTemplates(TEMPLATES_DIR);

  if (templatePaths.length === 0) {
    console.log('⚠️  No templates found in', TEMPLATES_DIR);
    return;
  }

  console.log(`Found ${templatePaths.length} template(s)\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  let validTemplates = 0;

  templatePaths.forEach(templatePath => {
    const result = validateTemplate(templatePath);

    console.log(`📁 ${result.templateName}`);

    if (result.errors.length > 0) {
      console.log('   ❌ Errors:');
      result.errors.forEach(error => {
        console.log(`      - ${error}`);
      });
      totalErrors += result.errors.length;
    }

    if (result.warnings.length > 0) {
      console.log('   ⚠️  Warnings:');
      result.warnings.forEach(warning => {
        console.log(`      - ${warning}`);
      });
      totalWarnings += result.warnings.length;
    }

    if (result.valid) {
      console.log('   ✅ Valid');
      validTemplates++;
    }

    console.log();
  });

  // Summary
  console.log('📊 Validation Summary:');
  console.log(`   Templates processed: ${templatePaths.length}`);
  console.log(`   Valid templates: ${validTemplates}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Validation failed. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n✅ All templates are valid!');
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateTemplate, findTemplates };
