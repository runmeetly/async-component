# async-component

AsyncComponent is a simple wrapper for loading React
Components using Javascript dynamic imports.

## Install

```shell script

$ npm i @runmeetly/async-component

$ yarn add @runmeetly/async-component

```

## Why

Dynamic module imports are the future of Javascript,
and making it easy to use inside of React - the
leading Javascript framework - will help improve
the ecosystem overall.

See information like
[this](https://javascript.info/modules-dynamic-imports)
and
[this](https://2ality.com/2017/01/import-operator.html#loading-code-on-demand)
for more information.

## How

There are two ways to use Async components,
`DefaultAsyncComponent` and `NamedAsyncComponent`.

For `default` imports, instead of this:

```javascript
import React from "react";
import Code from "./path/to/Code";

export class App extends React.Component {
  render() {
    return <Code />;
  }
}
```

You can do this:

```javascript
import React from "react";
import { DefaultAsyncComponent } from "@runmeetly/async-component";

const AsyncCode = DefaultAsyncComponent(() => import("./path/to/Code"));

export class App extends React.Component {
  render() {
    return <AsyncCode />;
  }
}
```

For `named` imports, instead of this:

```javascript
import React from "react";
import { NamedCode } from "./path/to/Code";

export class App extends React.Component {
  render() {
    return <NamedCode />;
  }
}
```

You can do this:

```javascript
import React from "react";
import { NamedAsyncComponent } from "@runmeetly/async-component";

const AsyncNamedCode = NamedAsyncComponent(async () => {
  const module = await import("./path/to/Code");
  return module.NamedCode;
});

export class App extends React.Component {
  render() {
    return <AsyncNamedCode />;
  }
}
```

# Credit

`async-components` is primarily developed and maintained by
[Peter](https://github.com/pyamsoft) at
[Meetly](https://www.runmeetly.com).

# License

```
 Copyright 2019 Meetly Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
