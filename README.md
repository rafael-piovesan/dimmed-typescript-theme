# Dimmed TypeScript

A dimmed dark theme for VS Code, tuned for TypeScript. Built on the
GitHub Dark Dimmed (Primer `dark_dimmed`) palette, with extra roles so
TypeScript constructs get distinct colors.

## Palette

| Role                              | Color     |
| --------------------------------- | --------- |
| Editor background                 | `#22272e` |
| Sidebar / panels                  | `#1c2128` |
| Widgets                           | `#2d333b` |
| Foreground / variables            | `#adbac7` |
| Comments                          | `#768390` |
| Keywords / storage / import       | `#f47067` |
| Functions / methods               | `#dcbdfb` |
| Types / classes / interfaces      | `#eac55f` |
| Type parameters                   | `#daaa3f` |
| Strings                           | `#96d0ff` |
| Numbers / constants / primitives  | `#6cb6ff` |
| Parameters                        | `#f69d50` |
| Properties                        | `#a3b8cc` |
| Namespaces / regex / JSON keys    | `#8ddb8c` |
| Decorators                        | `#e275ad` |

Semantic highlighting is on, so TypeScript's language service colors
interfaces (italic), type parameters, readonly variables and enum members.

## Try it

Open this folder in VS Code and press `F5` to run the **Preview theme** launch configuration. It
starts an Extension Development Host: a second VS Code window with this theme loaded and
[`samples/showcase.ts`](samples/showcase.ts) open. Select **Dimmed TypeScript** with
**Preferences: Color Theme** in that window.

The sample uses every color role in
the palette: imports, namespaces, enums, generics, decorators, classes, async code, template
strings, regex and JSDoc. [`samples/models.ts`](samples/models.ts) holds the types it imports.

## Install

```bash
npx @vscode/vsce package
code --install-extension dimmed-typescript-theme-0.2.0.vsix
```

Then run **Preferences: Color Theme** and pick **Dimmed TypeScript**.

## Sample
![theme in action](images/screen01.png)