# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Mintlify documentation site for Garden Finance, a cross-chain atomic swap protocol. The documentation covers APIs, SDKs, smart contracts, and user guides for multiple blockchain networks.

## Development Commands

### Prerequisites
Install Mintlify CLI globally:
```bash
npm i -g mint
```

### Common Commands
- **Start development server**: `mint dev` (run from repository root)
- **Update Mintlify CLI**: `mint update`

Note: This project doesn't use npm scripts or package.json. All commands use the Mintlify CLI directly.

## Architecture and Structure

### Documentation Organization
The site is organized into multiple sections:
- **api-reference/**: OpenAPI-based API documentation with endpoints for blockchain operations, orders, and solvers
- **contracts/**: Smart contract documentation for Bitcoin, EVM chains, Solana, Starknet, and SUI
- **developers/**: Technical guides including API usage, SDK documentation (React, NodeJS), and implementation examples
- **home/**: Main content including fundamentals, governance, and user resources

### Key Configuration
- **docs.json**: Main Mintlify configuration defining navigation, theming, and site structure
- **api-reference/openapi.json**: OpenAPI 3.1.0 specification for the Garden Finance API

### Content Format
All documentation is written in MDX (Markdown with JSX support). When editing:
- Use MDX syntax for interactive components
- Place images in the `images/` directory
- Reusable content goes in `snippets/`
- Follow existing navigation structure defined in docs.json

### Navigation Structure
The site has multiple tabs:
1. Home: General documentation and resources
2. Developers: Technical guides and SDK docs
3. Contracts: Smart contract documentation by chain
4. API Reference: Auto-generated from OpenAPI spec
5. Changelog: Project updates

## Working with API Documentation

The API documentation is generated from the OpenAPI specification at `api-reference/openapi.json`. Individual endpoint pages in `api-reference/endpoint/` provide additional examples and context beyond the OpenAPI spec.

## Mintlify Documentation Guidelines

### Working Relationship
- You can push back on ideas - this can lead to better documentation. Cite sources and explain your reasoning when you do so
- ALWAYS ask for clarification rather than making assumptions
- NEVER lie, guess, or make up information

### Project Context
- Format: MDX files with YAML frontmatter
- Config: docs.json for navigation, theme, settings
- Components: Mintlify components

### Content Strategy
- Document just enough for user success - not too much, not too little
- Prioritize accuracy and usability of information
- Make content evergreen when possible
- Search for existing information before adding new content. Avoid duplication unless it is done for a strategic reason
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

### Frontmatter Requirements for Pages
- title: Clear, descriptive page title
- description: Concise summary for SEO/navigation

### Writing Standards
- Second-person voice ("you")
- Prerequisites at start of procedural content
- Test all code examples before publishing
- Match style and formatting of existing pages
- Include both basic and advanced use cases
- Language tags on all code blocks
- Alt text on all images
- Relative paths for internal links

### Git Workflow
- NEVER use --no-verify when committing
- Ask how to handle uncommitted changes before starting
- Create a new branch when no clear branch exists for changes
- Commit frequently throughout development
- NEVER skip or disable pre-commit hooks

### Do Not
- Skip frontmatter on any MDX file
- Use absolute URLs for internal links
- Include untested code examples
- Make assumptions - always ask for clarification