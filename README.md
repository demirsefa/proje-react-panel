#  React Panel

## Overview
React Panel is a web application built using as the backend framework and React for the frontend. It features a customizable sidebar and supports CRUD operations on entities. This project is designed to be a foundational template for building admin panels or other web-based interfaces.

---
## Features
- **Entity CRUD Operations**: Easily create, read, update, and delete entities through the panel.
- **Sidebar Navigation**: The application includes a sidebar for easy navigation, which is fully customizable.
- **Single Design Template**: Comes with a default design that can be customized to fit your needs.
- **NestJS Integration**: It's designed especially for NestJS applications.
- **Class-validator Support**: If you work with class-validator, you can easily copy-paste entity definitions to create tables and forms based on your entities.
---

## Getting Started
### Installation
1. Install dependencies:
   ```bash
   yarn add
   ```

### TypeScript Configuration
Add these options to your `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "strictPropertyInitialization": false
    // other compiler options...
  }
}
```
