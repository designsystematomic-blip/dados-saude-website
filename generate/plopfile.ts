import type { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  // Page component
  
  plop.setGenerator("📄 Page component", {

    description: "Create a page component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your page name?",
      },
    ],
    actions() {
      const basePath = "../app/pages/{{pascalCase name}}";
      const actions: any[] = [];

      actions.push(
        {
          type: "add",
          path: `${basePath}/index.ts`,
          templateFile: "plop-templates/Page/index.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: "plop-templates/Page/Page.tsx.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{pascalCase name}}.module.css`,
          templateFile: "plop-templates/Page/Page.module.css.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{pascalCase name}}.types.ts`,
          templateFile: "plop-templates/Page/Page.types.hbs",
        },
        // To update automatic exports in components index file
        {
          type: "append",
          path: `../app/pages/index.ts`,
          pattern: /$/,
          template: `export { default as {{ pascalCase name}} } from "./{{ pascalCase name}}";`,
        }
      );

      return actions;
    },
  });

  // Common component
  plop.setGenerator("🧩 Common component", {
    description: "Create a common component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions() {
      const basePath = "../app/components/{{pascalCase name}}";
      const actions: any[] = [];

      actions.push(
        {
          type: "add",
          path: `${basePath}/index.ts`,
          templateFile: "plop-templates/Component/index.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{ pascalCase name}}.tsx`,
          templateFile: "plop-templates/Component/Component.tsx.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{ pascalCase name}}.module.css`,
          templateFile: "plop-templates/Component/Component.module.css.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{ pascalCase name}}.types.ts`,
          templateFile: "plop-templates/Component/Component.types.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{ pascalCase name}}.stories.tsx`,
          templateFile: "plop-templates/Component/Component.stories.tsx.hbs",
        },
        // To update automatic exports in components index file
        {
          type: "append",
          path: `../app/components/index.ts`,
          pattern: /$/,
          template: `export { default as {{ pascalCase name}} } from "./{{ pascalCase name}}";`,
        }
        // {
        //   type: "append",
        //   path: `${basePath}/index.ts`,
        //   pattern: /$/,
        //   template: `export { default as {{ pascalCase name}} } from "./{{ pascalCase name}}";`,
        // }
      );

      return actions;
    },
  });
}
