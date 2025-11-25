# Maximizing Cursor Usage with Claude Code for Voxelize

This guide provides practical examples and tips for using Cursor effectively with the voxelize project.

## 1. Code Generation

### Example 1: Generate a new utility function

**Cursor Prompt:**
```
I need a utility function to convert world coordinates to voxel coordinates in the voxelize core. Let me see how the current coordinate system works by looking at the common.ts file, then generate the function.
```

<seed:tool_call>
<function=Read>
<parameter=file_path>C:\Users\97034\voxelize\packages\core\src\common.ts