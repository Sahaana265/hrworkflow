This project is a high-performance, single-page application built for designing and testing HR workflows. It uses React, Vite, and React Flow to create an interactive and responsive experience. The UI is styled with a custom Tailwind CSS setup that follows a sleek, technical “blueprint-style” design.


How to run:
install: npm install
run: npm run dev
check the app at: http://localhost:5173/

Architecture Overview

The application is designed with scalability in mind. The codebase is organized into clear, modular folders based on responsibility, making it easy to maintain and extend as the project grows.
src/
├── api/             # Mock API layer (abstracted from components)
├── components/      # UI components grouped by functionality
│   ├── canvas/      # Workflow grid and node interactions
│   ├── forms/       # Dynamic forms for editing node data
│   ├── layout/      # App layout (top bar, structure)
│   ├── nodes/       # Custom node designs for React Flow
│   ├── sandbox/     # Testing and simulation modal
│   └── ui/          # Reusable UI elements (buttons, inputs, etc.)
├── constants/       # Default configurations and node mappings
├── hooks/           # Custom hooks connecting UI and global state
├── store/           # Zustand-based global state management
└── utils/           # Utility functions (graph validation, DFS, etc.)


Design Decisions:

State Management (Zustand)
Zustand was chosen instead of React Context because it handles frequent updates much more efficiently. Since the app involves dragging and repositioning nodes continuously, Zustand helps avoid unnecessary re-renders and keeps the UI smooth.

Mock API Layer
Instead of calling APIs directly, all requests go through a mock API layer using Promises and setTimeout. This keeps the frontend completely independent from the backend. When real APIs are ready, they can be integrated without changing the UI code.

Form Handling Strategy
To keep things clean and scalable, forms are dynamically rendered based on the node type. Each form uses a shared useNodeForm hook to sync data with the global state. This avoids messy conditional logic and keeps everything consistent.

Features and Progress

Completed Features
   Interactive workflow canvas with 5 custom HR-related node types
   Centralized validation system (cycle detection, disconnected nodes)
   Dynamic forms that update nodes in real time
   Simulation system that runs workflows in topological order with a 15% mock failure rate
   Custom design system built using Tailwind CSS
   Export functionality to download workflows as JSON


Planned Improvements
   Auto-layout (Dagre / ELKjs): Automatically arrange nodes for better readability when loading complex workflows
   Undo/Redo Support: Allow users to revert accidental changes easily
   Visual Validation Indicators: Show warnings directly on the canvas (e.g., icons for disconnected nodes)

Assumptions
The application does not persist data, so refreshing the browser resets the workflow
Icons are implemented using lucide-react for consistency and simplicity
The app targets modern browsers, so no legacy polyfills are included# hrworkflow
