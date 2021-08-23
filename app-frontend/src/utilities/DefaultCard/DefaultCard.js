import React from 'react';

import { Card } from './Style';

const DefaultCard = (props) => (
  <Card>
    {props.children}
  </Card>
);

export default DefaultCard;
