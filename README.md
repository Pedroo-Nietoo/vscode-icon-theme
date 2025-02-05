<div align="center">

<img src="https://github.com/Peroo-Nietoo/vscode-icon-theme/raw/main/flow.png" width="140" />

# Flow Icon Theme

A file icon theme for VSCode

![Preview of extension](https://github.com/Peroo-Nietoo/vscode-icon-theme/raw/main/preview.png)

</div>

## Contributing

If you'd like to contribute to this extension, check out the open issues or create a new one. If you're adding a new icon, refer to the [Flow - File Icon Figma file](https://www.figma.com/file/HYLMyRbIdSbIJQlqnd9pSN/Symbols---File-Icons?node-id=20521%3A84115&t=PyBzZOlVG5TXyEdx-1). You can either make a copy or follow the existing styles (Tailwind color scheme). Whenever possible, use colors from the existing icons before introducing a new color scheme.

When submitting a PR, ensure you've tested the extension locally to confirm that your new icon appears correctly in the file tree view with its associated file extension. Also, include a screenshot of the proposed icon in your PR.

## Configuration

You can customize which files and folders icons are displayed by using the following settings:

### Files

```json
"flow.files.associations": {
    "{file name}": "{icon name}"
}
```

And here is an example:

```json
"flow.files.associations": {
    "app.module.ts": "nest",
    "*.service.ts": "nest-service"
}
```

_Note: For file names, you can use `*` to match all files with a specific file extension._

### Folders

```json
"flow.folders.associations": {
    "{folder name}": "{icon name}"
}
```

And here is an example using this setting:

```json
"flow.folders.associations": {
    "cat": "folder-yarn",
    "infra": "folder-api",
    "schemas": "folder-purple"
}
```

## Icon Preview

You can preview the icons by reading the the [preview.md](./preview/preview.md) file.


## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Peroo-Nietoo/vscode-icon-theme/raw/main/LICENSE) file for details.