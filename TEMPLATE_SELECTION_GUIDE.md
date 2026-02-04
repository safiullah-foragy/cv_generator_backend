# Template Selection Guide

## How It Works

The Template Selector allows you to choose which CV templates to generate. Instead of creating all 20 templates every time, you can select only the ones you want.

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Select Templates (Click to choose)                         │
│  [Select All]  [Clear All]                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │  1   │  │  2   │  │  3   │  │  4   │  │  5   │         │
│  │ ████ │  │ ████ │  │ ████ │  │ ████ │  │ ████ │         │
│  │Prof. │  │Mod.  │  │Creat.│  │Bold  │  │Eleg. │         │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘         │
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │  6   │  │  7   │  │  8   │  │  9   │  │ 10   │         │
│  │ ████ │  │ ████ │  │ ████ │  │ ████ │  │ ████ │         │
│  │Clean │  │Minim.│  │Warm  │  │Fresh │  │Class.│         │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘         │
│                                                              │
│  ... (Templates 11-20 continue)                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Template Colors & Styles

| ID | Name | Color | Style | Font Size |
|----|------|-------|-------|-----------|
| 1  | Professional | Dark Blue (#2C3E50) | Professional | 28pt |
| 2  | Modern | Green (#27AE60) | Modern | 24pt |
| 3  | Creative | Purple (#8E44AD) | Creative | 26pt |
| 4  | Bold | Red (#E74C3C) | Bold | 30pt |
| 5  | Elegant | Orange (#F39C12) | Elegant | 25pt |
| 6  | Clean | Teal (#1ABC9C) | Clean | 24pt |
| 7  | Minimal | Gray (#34495E) | Minimal | 22pt |
| 8  | Warm | Deep Orange (#E67E22) | Warm | 27pt |
| 9  | Fresh | Sea Green (#16A085) | Fresh | 26pt |
| 10 | Classic | Blue (#2980B9) | Classic | 28pt |
| 11 | Vibrant | Pumpkin (#D35400) | Vibrant | 32pt |
| 12 | Corporate | Gray (#7F8C8D) | Corporate | 24pt |
| 13 | Executive | Dark Red (#C0392B) | Executive | 29pt |
| 14 | Contemporary | Aqua (#16A085) | Contemporary | 26pt |
| 15 | Artistic | Purple (#8E44AD) | Artistic | 28pt |
| 16 | Professional Dark | Navy (#34495E) | Professional | 25pt |
| 17 | Energetic | Gold (#D68910) | Energetic | 30pt |
| 18 | Nature | Forest (#117A65) | Nature | 26pt |
| 19 | Luxury | Royal Purple (#6C3483) | Luxury | 27pt |
| 20 | Ocean | Ocean Blue (#1F618D) | Ocean | 28pt |

## Selection States

### Unselected Template
```
┌──────────────┐
│  Template 1  │
│  ▄▄▄▄▄▄▄▄▄  │  ← Color preview
│  Professional│
│  Dark Blue   │
└──────────────┘
```

### Selected Template
```
┌──────────────┐  ← Green border (3px)
│  Template 1 ✓│  ← Checkmark badge
│  ▄▄▄▄▄▄▄▄▄  │
│  Professional│
│  Dark Blue   │
└──────────────┘
```

### Hover State
```
┌──────────────┐
│  Template 1  │  ← Slightly raised
│  ▄▄▄▄▄▄▄▄▄  │  ← Shadow effect
│  Professional│  ← Pointer cursor
│  Dark Blue   │
└──────────────┘
```

## User Actions

### 1. Select Individual Template
- **Action**: Click on any template card
- **Result**: 
  - Card gets green border
  - Checkmark appears
  - Added to selectedTemplates array
  - Submit button updates count

### 2. Deselect Template
- **Action**: Click on already selected template
- **Result**:
  - Green border removed
  - Checkmark disappears
  - Removed from selectedTemplates array
  - Submit button updates count

### 3. Select All
- **Action**: Click "Select All" button
- **Result**:
  - All 20 templates selected
  - All cards show green border + checkmark
  - Submit button shows "Generate 20 CVs"

### 4. Clear All
- **Action**: Click "Clear All" button
- **Result**:
  - All selections removed
  - All borders and checkmarks removed
  - Submit button shows "Generate 0 CVs"

## Validation

### Before Generation:
1. Check if at least one template is selected
2. Show error if no templates selected: "Please select at least one template"
3. Check required form fields
4. Show error if fields missing: "Please fill in all required fields"

### After Selection:
- Minimum: 1 template
- Maximum: 20 templates
- Recommended: 3-5 templates for variety

## Responsive Behavior

### Desktop (>1200px)
- 5 templates per row
- Cards: 200px width

### Tablet (768px - 1200px)
- 3 templates per row
- Cards: 200px width

### Mobile (<768px)
- 2 templates per row
- Cards: 150px width

## Code Integration

### In CVForm.js:
```javascript
// State
const [selectedTemplates, setSelectedTemplates] = useState([]);

// Usage
<TemplateSelector 
  selectedTemplates={selectedTemplates}
  setSelectedTemplates={setSelectedTemplates}
/>

// In submit
formDataToSend.append('selectedTemplates', JSON.stringify(selectedTemplates));
```

### In Backend:
```javascript
const selectedTemplates = JSON.parse(req.body.selectedTemplates || '[]');

for (let templateId of selectedTemplates) {
  // Generate only selected templates
}
```

## Tips for Users

1. **For Job Applications**: Select 2-3 professional templates (1, 7, 10, 16)
2. **For Creative Roles**: Choose creative/artistic templates (3, 8, 15, 19)
3. **For Multiple Applications**: Select diverse templates (one professional, one modern, one creative)
4. **For Comparison**: Select similar styles with different colors
5. **Testing**: Start with 1-2 templates to verify data, then select more

## Troubleshooting

### Templates not generating?
- Verify at least one template is selected (green border visible)
- Check browser console for errors
- Ensure backend is running

### Selection not working?
- Refresh the page
- Clear browser cache
- Check if JavaScript is enabled

### All templates still generating?
- Verify backend controller was updated
- Check selectedTemplates is sent in request
- Review server logs

## Accessibility

- **Keyboard Navigation**: Use Tab to navigate, Enter/Space to select
- **Screen Readers**: Each template announces its name and selection state
- **Color Blind Friendly**: Selection indicated by both color AND checkmark
- **High Contrast**: Clear borders and visual feedback

## Performance

- **Fast Selection**: Instant visual feedback
- **Efficient Generation**: Only selected templates processed
- **Reduced Wait Time**: 
  - 1 template: ~2 seconds
  - 5 templates: ~5 seconds
  - 20 templates: ~15 seconds

## Future Enhancements

- [ ] Template preview on hover
- [ ] Favorite templates
- [ ] Template recommendations based on job type
- [ ] Save template preferences
- [ ] Template comparison view
- [ ] Custom template creation

---

**Quick Reference**:
- Green border = Selected
- Checkmark (✓) = Confirmed selection
- Click card = Toggle selection
- Select All = Choose all 20
- Clear All = Remove all selections
