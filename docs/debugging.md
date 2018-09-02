These debug instructions are for VSCode only.

# Frontend
1. Install latest version of [VS Code](https://code.visualstudio.com/) and [VS Code Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

2. Start your app (outside of the docker) by running `npm start`. 

3. Now start debugging in VS Code by choosing correct configuration (ex: `Fe/Panel`).

4. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code, all from your editor. 

# Services

1. Navigate to `.ts` file you would want to debug.

2. Now start debugging in VS Code by choosing correct configuration (ex: `Be/Api`).

3. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code, all from your editor.

For example: you want to debug api, navigate to `src/modules/auth/auth.controller.ts` and add breakpoint to `login` method. Then in postman or from frontend, trigger the api.