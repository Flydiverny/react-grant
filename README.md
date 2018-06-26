# react-grant

Library for conditional rendering based on access

### Installation

```
npm i react-grant
```

or

```
yarn add react-grant
```

## Usage

### Grant
Grant access to specific trees by using the `Grant`.

```js
import { Grant } from 'react-grant';

<div>
  <Grant accessTo="show:a article:edit">
    <Article ... />
  </Grant>
  <Grant accessTo="show:a article:edit article:delete">
    <Article ... />
  </Grant>
</div>
```

### Can
Check access with `Can`

```js
import { Can } from 'react-grant';

const Article = ({}) => (
  <div>
    <span>Hello</span>
    <Can do="article:edit">
      <Link>Edit</Link>
    </Can>
  </div>
);
```

Or do conditional rendering with child function

```js
import { Can } from 'react-grant';

const Article = ({}) => (
  <div>
    <span>Hello</span>
    <Can do="article:edit">
      { can => can ? <Link>Edit</Link> : <span>Cant edit</span> }
    </Can>
  </div>
);
```

## HoCs

### Can
```js
import { canDo } from 'react-grant';

const EditLink = ({}) => (
  <Link>Edit</Link>
);

export default canDo('edit:article', EditLink);
```

### Inject canDo
```js
import { withCan } from 'react-grant';

const EditLink = ({ canDo }) => {
  return (
    {canDo("edit:article") && <Link>Edit</Link>}
  );
};

export default withCan(EditLink);
```


## Programmer error protection
Wrap your entire application in the `GrantDefinitions` to define which actions
are available. If a `Grant` is trying to grant access to an undefined action or
a `Can` is trying to consume an unknown action an error will be thrown.

```js
import { GrantDefinitions } from 'react-grant';

// Both string and array based input works for both acitons & defined
const defined = ["show:a", "show:b", "article:edit", "article:delete"];

<GrantDefinitions defined={defined}>
  {...}
</GrantDefinitions>
```
