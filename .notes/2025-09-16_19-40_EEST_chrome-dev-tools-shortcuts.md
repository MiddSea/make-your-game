# Chrome Developer Tools Shortcuts - 2025-09-16_19-40_EEST

**System**: Chrome 140.0.7339.133 (arm64) on macOS Sequoia 15.6.1 (M1 iMac)

## FPS Monitoring

### FPS Meter (Real-time overlay)

```text
Cmd + Option + I          # Open DevTools
Cmd + Shift + P           # Open Command Menu
Type: "FPS"               # Search for FPS commands
Select: "Show Frames Per Second (FPS) Meter"
```

**Result**: Live FPS counter in top-left corner of viewport

### Hide FPS Meter

```text
Cmd + Shift + P           # Open Command Menu
Type: "FPS"               # Search for FPS commands
Select: "Hide Frames Per Second (FPS) Meter"
```

## Layer Visualization

### Show Layer Borders

```text
Cmd + Shift + P           # Open Command Menu
Type: "Rendering"         # Search for rendering panel
Select: "Show Rendering"
Enable: "Layer borders"   # Shows composited layers
```

### Show Paint Flashing

```text
In Rendering Panel:
Enable: "Paint flashing"  # Shows repainted areas
```

### Show Scrolling Performance Issues

```text
n Rendering Panel:
Enable: "Scrolling performance issues"  # Highlights slow scroll areas
```

## Performance Analysis

### Record Performance Profile

```text
md + Option + I          # Open DevTools
Click: "Performance" tab
Click: Record button (red circle)
Interact with game/app
Click: Stop button
```

### Performance Monitor (Live metrics)

```text
md + Shift + P           # Open Command Menu
Type: "Performance monitor"
Select: "Show Performance monitor"
```

**Shows**: CPU usage, JS heap, DOM nodes, Layout/sec

## Quick Access Summary

| Task | Shortcut | Result |
|------|----------|---------|
| **FPS Meter** | `Cmd+Shift+P` → "FPS" | Live FPS overlay |
| **Layer Borders** | `Cmd+Shift+P` → "Rendering" → Layer borders | See layer composition |
| **Paint Flash** | Rendering Panel → Paint flashing | See repaints |
| **Performance** | DevTools → Performance → Record | Detailed analysis |

---
**Status**: 60 FPS achieved! (31.8 → 59.4-60 FPS)  
**Method**: Removed delta time calculations from game loop  
**Next**: Layer separation implementation
