# HR Workflow Designer

A prototype built for Tredence Analytics as part of the Full Stack Engineering Intern case study. The goal was to design and implement a visual workflow builder where an HR admin can create, configure, and test internal processes — things like employee onboarding, leave approvals, or document verification — without writing a single line of code.

The project was built and completed within the suggested 4–6 hour window, with a focus on clean architecture and working functionality over pixel-perfect polish.

---

## Getting Started

```bash
npm install
npm run dev
```

Open your browser at `http://localhost:5173/` and you're good to go. No environment variables, no backend, no database — everything runs entirely in the browser.

---

## What This App Does

At its core, this is a drag-and-drop workflow canvas. You pull nodes from the left sidebar onto the canvas, connect them together, configure each step using the properties panel on the right, and then hit "Test Workflow" to simulate the entire flow running from start to finish.

There are five node types you can work with:

- **Start Event** — the entry point of every workflow
- **Human Task** — a step that requires a person to do something (collect documents, fill a form, etc.)
- **Approval Step** — a decision gate where a manager or HR role approves or rejects
- **Automated Action** — a system-triggered step like sending an email or generating a PDF
- **End Event** — marks the workflow as complete

Each node has its own configuration form. Click any node on the canvas and the properties panel opens on the right, letting you set the title, assign people, set due dates, choose automation actions, and more.

Once your workflow is built, hit "Test Workflow" to run a simulation. The app serializes the entire graph, validates its structure, and walks through each node in the correct execution order — showing you which steps passed, which were skipped, and which failed (with a small random failure rate built in to make it realistic).

---

## Project Structure

```
src/
├── api/             # All mock API calls live here. Nothing in the UI ever calls fetch directly.
├── components/
│   ├── canvas/      # The React Flow canvas and everything on it
│   ├── forms/       # The per-node-type configuration forms
│   ├── layout/      # Top bar and overall page structure
│   ├── nodes/       # Custom node card designs rendered inside React Flow
│   ├── sandbox/     # The simulation/test modal
│   └── ui/          # Shared building blocks — buttons, inputs, toggles, etc.
├── constants/       # Default node data shapes and node type definitions
├── hooks/           # Custom hooks that connect the UI to global state
├── store/           # Zustand store — the single source of truth
└── utils/           # Graph validation, cycle detection, topological sort
```

The structure is intentionally layered so that each concern is isolated. The canvas doesn't know anything about forms. The forms don't know anything about the API. The API doesn't know anything about state. If you want to add a new node type, you touch exactly three things: the constants file, a new form component, and a new node component. Nothing else needs to change.

---

## Key Design Decisions

### Why Zustand over React Context

The canvas involves nodes being dragged and repositioned continuously — that's dozens of state updates per second during a single drag. React Context re-renders every consumer on every update, which would make the canvas feel sluggish and janky. Zustand uses a subscription model, so only the components that care about a specific slice of state re-render. The drag experience stays smooth even with a complex workflow on the canvas.

### Mock API as an Abstraction Layer

Every API call in the app goes through `src/api/` — the components never call `fetch` directly. Right now those functions return hardcoded mock data with a `setTimeout` delay to simulate network latency. The benefit is that when real backend endpoints are ready, you swap out the implementation in one place and the entire UI continues working without any changes. The interface stays the same; only the internals change.

### Forms That Scale

Rather than writing a giant `if/else` block or a massive switch statement to decide which form to show, each node type maps to its own form component. A shared `useNodeForm` hook handles reading from and writing to the Zustand store, so every form works the same way under the hood. Adding a sixth node type in the future means adding one form component and one entry in the node type map — no existing code needs to be touched.

### Validation Lives in Utils, Not Components

All graph validation logic — checking for cycles, detecting disconnected nodes, ensuring a Start node exists, confirming an End node is reachable — lives in `src/utils/`. The canvas and the sandbox both call these same utility functions. This means the validation rules are tested and maintained in one place, and both surfaces always agree on what "valid" means.

---

## What Was Built

| Feature | Status |
|---|---|
| Interactive canvas with 5 custom node types | Done |
| Drag nodes from sidebar onto canvas | Done |
| Connect nodes with edges | Done |
| Click to select and configure any node | Done |
| Dynamic per-node-type configuration forms | Done |
| Controlled form inputs with validation | Done |
| Mock API layer (GET /automations, POST /simulate) | Done |
| Dynamic action parameters in Automated Action form | Done |
| Workflow simulation with topological execution order | Done |
| 15% random step failure rate in simulation | Done |
| Pre-flight validation (no start, no end, cycles) | Done |
| Export workflow as JSON | Done |
| Delete nodes and edges | Done |
| Edge labels for annotating connections | Done |
| Blueprint-style dark UI with Tailwind CSS | Done |

---

## What I'd Add With More Time

**Auto-layout (Dagre / ELKjs)**
When you import a complex workflow or build a large one from scratch, nodes end up overlapping or arranged awkwardly. A one-click auto-layout button using Dagre would arrange everything into a clean top-down hierarchy automatically. The utility function is straightforward to write — I just ran out of time to wire it into the UI cleanly.

**Undo / Redo**
The most common accidental action is deleting a node or connection and wanting it back. A history stack in the Zustand store (capped at 50 steps, with debouncing on node moves) would cover this. The architecture is already set up for it — the store is a single object, so pushing snapshots is clean.

**Validation Error Indicators on the Canvas**
Right now, validation errors show up in the simulation panel before you run the test. It would be much better UX to show a small red badge directly on the offending node on the canvas — so you can see at a glance that an Approval node is missing its "Rejected" edge without having to run the simulation first.

**Import Workflow from JSON**
Export is implemented. Import is the natural counterpart — letting users load a saved workflow back onto the canvas. The parser and validator are already written as part of the export serialization logic, so this is mostly a file picker and a canvas reset away from working.

**Persistent State**
Currently, refreshing the browser clears everything. Saving the workflow state to `localStorage` on every change would make the app feel much more like a real tool and less like a demo.

---

## Assumptions Made

- No authentication or user accounts are needed — this is a single-user prototype
- The app targets modern browsers only, so no legacy polyfills were added
- Icons use `lucide-react` throughout for visual consistency
- Node positions are not validated (a node can be placed anywhere on the canvas, including off-screen — this is standard React Flow behavior)
- The simulation result is entirely mocked — the 15% failure rate and step messages are generated client-side, not from a real execution engine