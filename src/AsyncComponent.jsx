/*
 *  Copyright 2019 Meetly Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import React from "react";
import { Validator } from "./Validator";

/**
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
  const validImportComponent = Validator.importComponent(importComponent);

  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
    }

    componentDidMount() {
      validImportComponent().then(module => {
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
  const validImportComponent = Validator.importComponent(importComponent);

  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };
    }

    componentDidMount() {
      validImportComponent().then(component => {
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
