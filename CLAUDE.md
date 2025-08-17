# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Always use `bun` as package manager.

### Development

- `bun run dev` - Start the Next.js development server with Turbopack
- `bun run build` - Build the production application
- `bun run start` - Start the production server
- `bun run lint` - Run Next.js linting

### Code Quality

- `bun run biome check .` - Run formatter, linter and import sorting checks
- `bun run biome check --write .` - Auto-fix formatting and linting issues
- `bun run biome format --write .` - Format code only
- `bun run biome lint .` - Run linter only

## Architecture

This is a Next.js 15 blog application using:

- **App Router** with server components
- **TypeScript** with strict mode enabled
- **Biome** for formatting and linting (extends ultracite config)
- **Tailwind CSS v4** with typography plugin for styling
- **Markdown processing** via unified ecosystem (remark/rehype)

### Key Components

**Content Management**

- Blog posts stored as Markdown files in `content/posts/`
- TOML frontmatter (delimited by `+++`) with required fields: `title`, `date` (YYYY-MM-DD format)
- Posts validated using Valibot schemas

**Core Libraries**

- `src/lib/posts.ts` - Handles reading and parsing blog posts from filesystem
- `src/lib/markdown.ts` - Converts Markdown to HTML with syntax highlighting (Shiki with vitesse themes)

**Routing Structure**

- `/` - Homepage listing all blog posts sorted by date
- `/blog/[slug]` - Individual blog post pages with static generation

**Styling**

- Custom fonts: IBM Plex Sans JP (for Japanese text) and IBM Plex Mono
- Dark/light mode syntax highlighting themes
- Prose styling via Tailwind Typography plugin

## Path Aliases

- `@/*` maps to `./src/*`
- `@content/*` maps to `./content/*`
