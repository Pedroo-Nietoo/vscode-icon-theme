<div align="center">

<img src="https://github.com/Pedroo-Nietoo/vscode-icon-theme/raw/main/flow.png" width="140" />

# Flow Icon Theme

A file icon theme for VSCode

![Preview of extension working](https://github.com/Pedroo-Nietoo/vscode-icon-theme/raw/main/preview.png)

</div>

## Icon Preview

You can preview the icons from the theme by reading the the [preview.md](./preview/preview.md) file.


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
    "schemas": "folder-light-blue-outline"
}
```

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Peroo-Nietoo/vscode-icon-theme/raw/main/LICENSE) file for details.