# `Notes for Developers:`

## Support for Start command.

The package json and vite.config has configuration for npm start command. You can simply run the npm start command and the project will not just start but also be automatically in your browser just like it happens in create-react-app.

## Styling.

Except the default files i.e. index.css and App.css styling files are in .scss formats. and the necessary package for sass has been installed in the project as dev dependency. The sass package complies the scss files into css files on the compile time and while the build process.

## Bootstrap Like Classes.

The bootstrap like classes in the App.css where defined by Zubair Arif for display flex properties, margin and padding. Keep in mind bootstrap is neither installed in the project and there's also no CDN used in the project.

## Use of Native HTML Tags.

Only iframe and label are the only native html tags that were used in the project while development because there are no components in antd for iframe and label (Don't try Form.Item it renders a div is label prop is left undefined). Other than these 2 tags none of the html tags were used in the development. iframe was used to render the PDF file in the user details modal. And label was used to wrap the antd upload, CropImage and Avatar component so that the upload component stays hidden and when clicked on the avatar to update image, upload component is triggered.

## Points to be Noted:

- The font used in the project is Poppins and it's constant everywhere in the project.
- The components that where not being used in any other files were created in the same file. They can be easily split into components if needed later ons.
- For country field on the settings page data is comming from a json file.
- Images are stored in the public directory. Always store the images in the public folder in a vite project. Because this way it's easy to define the images path. To define an image's path stored in the public directory simple define it like this: images/dashboard/image.png
- Components for icons used in the figma design has been created in the /src/assets/icons directory. The size and fill props with default values has been defined in the icons components. Those icon components can be reused anywhere in any color or size.
- There are hard code initial values set in the login form for login. Those are just for development purpose set them to empty quotes while integrating the APIs.
- You don't need to use to use live sass compiler or to run watch sass to compile scss file. The sass package will automatically do that for you.
- The antd upload component takes an array of fileList and returns an fileList on change. However you can set the max file limit.
