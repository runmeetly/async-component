import React from "react";

/**
 *
 *  For `default` imports, instead of this:
 *
 *       import React from "react";
 *       import Code from "./path/to/Code";
 *
 *       export class App extends React.Component {
 *         render() {
 *           return <Code />;
 *         }
 *       }
 *
 *
 *  You can do this:
 *
 *       import React from "react";
 *       import { DefaultAsyncComponent } from "@runmeetly/async-component";
 *
 *       const AsyncCode = DefaultAsyncComponent(() => import("./path/to/Code"));
 *
 *       export class App extends React.Component {
 *         render() {
 *           return <AsyncCode />;
 *         }
 *       }
 */
export const DefaultAsyncComponent = importComponent => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
    }

    componentDidMount() {
      importComponent().then(module => {
        const component = module.default;
        this.setState({ Component: component });
      });
    }

    render() {
      const { Component } = this.state;
      return !!Component ? <Component {...this.props} /> : null;
    }
  }

  return AsyncComponent;
};

/**
 *
 *  For `named` imports, instead of this:
 *
 *       import React from "react";
 *       import { NamedCode } from "./path/to/Code";
 *
 *       export class App extends React.Component {
 *         render() {
 *           return <NamedCode />;
 *         }
 *       }
 *
 *
 *  You can do this:
 *
 *       import React from "react";
 *       import { NamedAsyncComponent } from "@runmeetly/async-component";
 *
 *       const AsyncNamedCode = NamedAsyncComponent(async () => {
 *         const module = import("./path/to/Code");
 *         return module.NamedCode;
 *       });
 *
 *       export class App extends React.Component {
 *         render() {
 *           return <AsyncNamedCode />;
 *         }
 *       }
 */
export const NamedAsyncComponent = importComponent => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
    }

    async componentDidMount() {
      importComponent().then(component => {
        this.setState({ Component: component });
      });
    }

    render() {
      const { Component } = this.state;
      return !!Component ? <Component {...this.props} /> : null;
    }
  }

  return AsyncComponent;
};
