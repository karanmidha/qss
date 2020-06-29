import React from 'react';
import { AccessDB } from 'react-indexed-db';
import styles from './AddAddress.css';
import FacilityTimings from './FacilityTimings';


// TO-DO Impement proptypes

class AddAddress extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.showFacilityTimingModal = this.showFacilityTimingModal.bind(this);
        this.hideFacilityTimingModal = this.hideFacilityTimingModal.bind(this);
        this.setFacilityTimings = this.setFacilityTimings.bind(this);
        this.formatPhone = this.formatPhone.bind(this);
        this.state={
            name: null,
            addressLine1: '',
            addressLine2: '',
            suiteNumber: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            timeZone: '',
            facilityTimings: '',
            showFacilityTimingsModal: false,
        };
    }
    
    formatPhone(phone){
      const formattedNo = ('' + phone).replace(/\D/g, '')
      const phoneArr = formattedNo.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (phoneArr) {
        return '+1 ' + '(' + phoneArr[1] + ') ' + phoneArr[2] + '-' + phoneArr[3]
      }
      return null
    }
    
    handleChange(e){
        const key = e.target.id;
        const val = e.target.value;
        if(val){
            if(key==='phone'){
               this.setState({[key]: this.formatPhone(val)});
               } else {
                this.setState({[key]: val});
               }
        }
    }
    
    showFacilityTimingModal(){
        this.setState({showFacilityTimingsModal: true});
    }
    
    hideFacilityTimingModal(){
        this.setState({showFacilityTimingsModal: false});
    }
    
    setFacilityTimings(data){
        this.setState({facilityTimings: data});
    }
    
    render(){
        return(
        <div>
            <AccessDB objectStore="people">
              {({ add }) => {
            const handleClick = event => {
                event.preventDefault();
              add({ 
                  name: this.state.name,
                  addressLine1: this.state.addressLine1,
                  addressLine2: this.state.addressLine2,
                  suiteNumber: this.state.suiteNumber,
                  city: this.state.city,
                  state: this.state.state,
                  zipcode: this.state.zipcode,
                  phone: this.state.phone,
                  timeZone: this.state.timeZone,
                  facilityTimings: String(this.state.facilityTimings),                  
              }).then(
                event => {
                  console.log('ID Generated: ', event);
                },
                error => {
                  console.log(error);
                }
              );
            this.props.hideAddressModal();
            };
            return (<div className='AddressModal'>
                <section className="AddressModalMain">
                    <form onChange={this.handleChange} onSubmit={handleClick} class='addAdddressForm'>                            <h3>Location Form</h3>
                        <p className='fullWidth'><label for='name' className='required'>Location Name:</label><input type='text' id='name' name='name' required/></p>
                            <p><label for='addressLine1'>Address Line 1:</label><input type='text' id='addressLine1' name='addressLine1'/></p>
                            <p><label for='suiteNumber'>Suite Number:</label><input type='text' id='suiteNumber' name='suiteNumber'/></p>
                           <p><label for='addressLine2'>Address Line 2:</label><input type='text' id='addressLine2' name='addressLine2'/></p>
                            <p><label for='city'>City:</label><input type='text' id='city' name='city'/></p>
                            <p><label for='state'>State:</label>
                            <select id="state" name="state">
                              <option value="NY">NY</option>
                              <option value="CA">CA</option>
                              <option value="SF">SF</option>
                              <option value="DE">DE</option>
                            </select></p>
                            <p><label for='zipcode'>Zip Code:</label><input type='text' id='zipcode' name='zipcode' min='5' pattern='[a-zA-Z0-9]{5,10}' title="5-10 digit alpahnumeric zip only"/></p>
                            <p><label for='phone'>Phone Number:</label><input type='text' id='phone' name='phone' pattern='[0-9]{10}' title="Please enter 10 digit number"/></p>
                            <p><label for='timeZone'>TimeZone:</label>
                            <select id="timeZone" name="timeZone">
                              <option value="+4.00 GMT">+4.00 GMT</option>
                              <option value="+4.30 GMT">+4.30 GMT</option>
                              <option value="+5.00 GMT">+5.00 GMT</option>
                              <option value="+5.30 GMT">+5.30 GMT</option>
                                </select></p>
                                <p><label for='facilityTimings'>Facility Timings: </label><input type='button' id='facilityTimings' name='facilityTimings' value ='choose' onClick={this.showFacilityTimingModal}/></p><p><span>{this.state.facilityTimings}</span></p>
                            <button className='formButtons' onClick={this.props.hideAddressModal}>Close</button>
                            <button className='formButtons' type="submit" id="submit">Submit</button>
                        
                    </form>
                    {this.state.showFacilityTimingsModal ? <FacilityTimings hideFacilityTimingModal={this.hideFacilityTimingModal} setFacilityTimings={this.setFacilityTimings}/> : null}
                </section>            
            </div>);
          }}
            </AccessDB>
    </div>
        );
    }
}

export default AddAddress;