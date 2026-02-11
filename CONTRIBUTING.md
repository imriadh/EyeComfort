# Contributing to VisionBreak

First off, thank you for considering contributing to VisionBreak! It's people like you that make VisionBreak such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your Android version and device model**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other apps if applicable**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Update the documentation if needed
5. Write a clear commit message

## Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Examples:

```
Add sleep cycle export feature

- Implement JSON export functionality
- Add export button to UI
- Update documentation

Fixes #123
```

### TypeScript/React Style

- Use functional components with hooks
- Use TypeScript for type safety
- Follow the existing code structure
- Add comments for complex logic
- Use meaningful variable and function names

### CSS Style

- Use CSS custom properties for theming
- Follow mobile-first approach
- Keep specificity low
- Use BEM-like naming conventions
- Ensure 60fps animations

### Rust Style

- Follow standard Rust conventions
- Use `cargo fmt` before committing
- Run `cargo clippy` and fix warnings
- Add documentation comments for public items

## Testing

Before submitting a pull request:

1. Test on web preview (`npm run dev`)
2. Test on Android device if possible
3. Test both light and dark themes
4. Test all three main features
5. Check for console errors

## Project Structure

Familiarize yourself with the project structure:

```
vision-break/
├── src/              # React frontend
├── src-tauri/        # Rust backend
├── scripts/          # Build scripts
└── .github/          # CI/CD workflows
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README and release notes. Thank you for making VisionBreak better!
