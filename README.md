
# Create a React App without create-react-app  

> ***Clean, Organized and Secure Code builds a better and reliable product***  


\
Create a React App from a boilerplate with minimalistic packages and reduce the vulnerabilities from unsecure and unmaintained packages.   

# Getting Started  

- `npx create-react-app-v2 <your-app-name>`
	- Creates an app folder `your-app-name`  
- `cd your-app-name`
- `npm start` 
	- It will start a `localhost` server at port 3000.  


TypeScript and JSX support are included.  

To start using TypeScript:
- `npm install typescript @types/node @types/react @types/react-dom`
- Add or modify jsx=>tsx, js=>ts 

\
**`react-app-env.d.ts`** is for media type definitions.  

\
For more info:
- [Add TypeScript to Create-React-App](https://create-react-app.dev/docs/adding-typescript/)  
- [TypeScript Docs](https://www.typescriptlang.org/docs/)  


## For production

- `npm run build`  


## Configuration  

- Modify `webpack` files to meet with your project needs  

`webpack.config`: Primary configurations(no modifications required).  
***Make changes only when you know what you are doing***.  

`webpack.dev`: Development server configurations.  
Contains main configs for building and running the app. For integrating a backend server add ['proxy'](<https://webpack.js.org/configuration/dev-server/#devserverproxy>).  


`webpack.prod`: Production related configurations.  

- - - -  

***Please leave a star if you find it useful*** :star: :star: :star:  
\
*Suggestions and collaboration are welcome* :smiley:  
\
Test your README in a live environment using [MarkDownPreview](https://markdownlivepreview.com/)

