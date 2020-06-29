import React from 'react';
import { AccessDB } from 'react-indexed-db';
import AddAddress from './AddAddress.jsx';
import Styles from './DisplayAddress.css';
import DeleteEntry from './DeleteEntry';

class DisplayAddress extends React.PureComponent{
    
    constructor(props){
        super(props);
        this.state = {
            persons: [],
            showAddressModal: false,
            currentPage: 1,
            addressPerPage: 5
        };
        this.showAddressModal = this.showAddressModal.bind(this);
        this.hideAddressModal = this.hideAddressModal.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.updatePaginationState = this.updatePaginationState.bind(this);
    }
    
    handlePagination(e){
        this.setState({
          currentPage: Number(e.target.id)
        });
    }
    
    showAddressModal(){
        this.setState({showAddressModal: true});
    }
    
    hideAddressModal(){
        this.setState({showAddressModal: false});
    }
    
    updatePaginationState(e){
        this.setState({addressPerPage: Number(e.target.value)});
    }
    
    render(){
        return (
        <React.Fragment>
            <h3 id='heading'> Locations </h3>
            <button id='showAddressModal' onClick={this.showAddressModal}>Add Address</button>
                {this.state.showAddressModal ? <AddAddress hideAddressModal={this.hideAddressModal}/> : null}
            <AccessDB objectStore="people">
              {({ getAll }) => {
                getAll().then(
                  peopleFromDB => {
                    this.setState({persons: peopleFromDB});
                  },
                  error => {
                    console.log(error);
                  }
                );
                    
                const { persons, currentPage, addressPerPage } = this.state;
                const indexOfLastAddress = currentPage * addressPerPage;
                const indexOfFirstAddress = indexOfLastAddress - addressPerPage;
                const currentAddress = persons.slice(indexOfFirstAddress, indexOfLastAddress);
                const renderAddress = currentAddress.map((key) => {
                  return (<tr>
                                <td>{key.name}</td>
                                <td>{key.phone}</td>
                                <td>{key.suiteNumber + ' ' +key.addressLine1 + ' ' + key.addressLine2 + ' ' + key.city + ' '  + key.state + ' '+ key.zipcode}</td>
                                <td><DeleteEntry id={key.id}/></td>
                        </tr>);
                });
                const pageNumbers = [];
                for (let i = 1; i <= Math.ceil(persons.length / addressPerPage); i++) {
                    pageNumbers.push(i);
                }
                const renderPageNumbers = pageNumbers.map(number => {
                  return (
                    <a
                      key={number}
                      id={number}
                      onClick={this.handlePagination}
                    className={this.state.currentPage == number ? 'active' : ''}
                    >
                    {number}
                    </a>
                  );
                });
                return (
                  <div>
                    <table class='displayAddress'>
                        <thead>
                            <tr>
                                <th>Location Name</th>
                                <th>Phone No.</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderAddress.length > 0 ? renderAddress : null}
                        </tbody>
                    </table>
                    {renderAddress.length == 0 ? <p>Kindly enter a location</p> : null}
                    <div id='pagination'>
                        <select id="perPage" name="perPage" onChange={this.updatePaginationState}>
                          <option value="5">5 per page</option>
                          <option value="10">10 per page</option>
                          <option value="15">15 per page</option>
                          <option value="20">20 per page</option>
                        </select>
                        <ul id="page-numbers">
                          {renderPageNumbers}
                        </ul>
                    </div>
                  </div>
                );
              }}
            </AccessDB>
            
        </React.Fragment>
        );
    }
}

export default DisplayAddress;