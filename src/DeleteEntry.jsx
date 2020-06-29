import React from 'react';
import { AccessDB } from 'react-indexed-db';

class DeleteEntry extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
      return  (
        <AccessDB objectStore="people">
          {({ deleteRecord }) => {
            const handleClick = () => {
              deleteRecord(Number(this.props.id)).then(event => {
                alert('Deleted!');
              });
            };
            return <button id='deleteButton' onClick={handleClick}>Delete</button>;
          }}
        </AccessDB>);
    }
}

export default DeleteEntry;