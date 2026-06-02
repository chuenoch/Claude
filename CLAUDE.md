# CLAUDE.md

AI assistant guidance for the **Electrical One-Line Diagram Tool**.

---

## Project Overview

A drag-and-drop electrical single-line (one-line) diagram editor built for engineers. Users drag ANSI/IEEE standard electrical symbols onto a canvas, wire them together, and annotate them with voltage and ampacity ratings. Diagrams persist in the browser via localStorage.

**Stack:** Vite 8 · React 19 · TypeScript · React Flow 11

---

## Project Structure

All application code lives in the `one-line-app/` subfolder.

```
one-line-app/
  src/
  App.tsx / App.css           # Root layout (3-column CSS Grid), global dark theme
  main.tsx                    # React DOM entry

  types/diagram.ts            # NodeData, ComponentType interfaces
  constants/grid.ts           # GRID_SIZE=20, SNAP_THRESHOLD=30, node sizes, default labels

  components/
    Sidebar/                  # Draggable palette of 6 component tiles
      symbols/                # Inline SVG previews used in palette items
    Canvas/                   # ReactFlow wrapper with drop handler and all RF props
    nodes/                    # Custom React Flow node components (one per component type)
    PropertiesPanel/          # Right-side editable form for selected node

  hooks/
    useDiagramState.ts        # nodes/edges state, addNode, updateNode, onConnect
    useAutoConnect.ts         # onNodeDragStop: proximity scan → auto-create step edge
    usePersistence.ts         # debounced localStorage save + load on mount

  utils/
    snapToGrid.ts             # Snaps (x,y) to nearest 20px grid point
    getHandlePositions.ts     # Absolute {x,y} of each handle for auto-connect math
    autoConnectUtils.ts       # euclidean distance + duplicate-edge guard
```

---

## Dev Setup

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # type-check + production bundle
```

---

## Electrical Components

| Type key | ANSI/IEEE Symbol | Handles |
|---|---|---|
| `transformer` | Two tangent circles (primary/secondary windings) | top, bottom |
| `circuitBreaker` | Square with X | top, bottom |
| `disconnectSwitch` | Open knife-blade switch | top, bottom |
| `busBar` | Bold horizontal line (160×30) | left, right, tap-1, tap-2, tap-3 |
| `utilitySource` | Circle with three horizontal lines | out (bottom) |
| `load` | Downward triangle | in (top) |

---

## Key Behaviours

- **Snap-to-grid**: 20px grid enforced on both drop and drag via `snapToGrid` util + React Flow `snapGrid={[20,20]}`
- **Auto-connect**: `useAutoConnect` fires on `onNodeDragStop`, scans all handles within 30px, picks closest pair, creates a `step` edge — skips duplicates
- **Wire style**: always `type: 'step'` (orthogonal, no bezier curves)
- **Properties panel**: click a node → panel populates; edit fields → live update via `updateNode`
- **Persistence**: `usePersistence` debounces localStorage write by 300ms; loads on mount; key `eld-diagram-v1`

---

## AI Assistant Rules

- **Never delete files without explicit user confirmation.**
- Do not push directly to `main` — always use a branch + PR.
- Do not add comments describing what code does; only add comments for non-obvious *why*.
- `nodeTypes` object in `Canvas.tsx` must stay **outside** the component (or memoized) — React Flow re-registers types on every render otherwise.
- Never commit secrets or `.env` files.

---

## Coding Conventions

- TypeScript strict mode — no `any` without `// eslint-disable-next-line` justification
- React Flow state: always use `useNodesState` / `useEdgesState` hooks — never mutate nodes/edges directly
- Component CSS lives next to the component file (`.css` colocated)
- Hooks in `src/hooks/`, pure utils in `src/utils/`

---

## Key Files

| File | Purpose |
|---|---|
| `src/App.tsx` | Layout root, selection state, wires all hooks together |
| `src/components/Canvas/Canvas.tsx` | All React Flow config and event wiring |
| `src/hooks/useDiagramState.ts` | Single source of truth for nodes + edges |
| `src/hooks/useAutoConnect.ts` | Proximity-based auto-wiring algorithm |
| `src/utils/getHandlePositions.ts` | Handle offset table — update when adding new node types |
| `src/constants/grid.ts` | Node sizes + default labels — update when adding new node types |
