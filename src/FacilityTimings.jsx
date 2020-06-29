import React from 'react';
import styles from './FacilityTimings.css';

class FacilityTimings extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.applyToAll = this.applyToAll.bind(this);
        this.days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
        this.state = {
            sun:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
            mon:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
            tues:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
            wed:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
            thurs:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
            fri:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
            sat:{
                from:{
                    time: '',
                    meridian: '',
                },
                to:{
                    time: '',
                    meridian: '',
                },
            },
        }
    }
    
    applyToAll(e, day){
        e.stopPropagation();
        const dayState= this.state[day];
        this.days.forEach(key=>{
            this.setState({
                [key]: dayState,
            })
        })
        /* document.querySelectorAll('input[name="fromTime"]').forEach(key=>{
            key.value = this.state[day].from.time;
        }); */
        
    }
    
    handleFormChange(e){
        //console.log('print target', e.target);
        // console.log('print target', e.target.value);
        const targetArr = e.target.id.split('-');
        const timing = this.state[targetArr[0]];
        console.log('targetArr', targetArr);
           this.setState({
            [targetArr[0]]:{
                ...timing,
                [targetArr[1]]:{
                    ...timing[targetArr[1]],
                    [targetArr[2]]: e.target.value,
                }
            }
        });
    }
    
    handleSubmit = () =>{
        console.log('inside submit')
        const facilityString = [];
        this.days.forEach(key=>{
            const currentDay = this.state[key];
            const currentDayFrom = currentDay.from;
            const currentDayTo = currentDay.to;
            if(currentDayFrom.time && currentDayFrom.meridian && currentDayTo.time && currentDayTo.meridian){
            facilityString.push(
            <span>
                <span>{key}:</span><span>{currentDayFrom.time + ' ' +currentDayFrom.meridian + ' to ' + currentDayTo.time + ' to ' + currentDayTo.meridian}</span><br/>
            </span>
            );
        }
        });
        console.log(facilityString);
        this.props.setFacilityTimings(facilityString);
        this.props.hideFacilityTimingModal();
        
    }
    
    render(){
        const facilityMap = this.days.map(key=>{
            return (
                <tr onChange={this.handleFormChange}>
                    <td><strong>{key}</strong></td>
                    <td>
                        <input type='text' name='fromTime' className='timeField' id={`${key}-from-time`} value={`${this.state[key].from.time}`}/>
                        <div class='radioBtn'>
                            <input type='radio' name={`${key}FromTimeRadio`} value='AM' id={`${key}-from-meridian`} className='meridian' checked={this.state[key].from.meridian === 'AM'}/><span>AM</span>
                            <input type='radio' name={`${key}FromTimeRadio`} value='PM' id={`${key}-from-meridian`} className='meridian' checked={this.state[key].from.meridian === 'PM'}/><span>PM</span>
                        </div>
                    </td>
                    <td>
                        <input type='text' name='toTime' className='timeField' id={`${key}-to-time`} value={`${this.state[key].to.time}`}/>
                        <div class='radioBtn'>
                            <input type='radio' name={`${key}ToTimeRadio`} value='AM' id={`${key}-to-meridian`} className='meridian' checked={this.state[key].to.meridian === 'AM'}/><span>AM</span>
                            <input type='radio' name={`${key}ToTimeRadio`} value='PM' id={`${key}-to-meridian`} className='meridian' checked={this.state[key].to.meridian === 'PM'}/><span>PM</span>
                        </div>
                    </td>
                    <td>
                    <button class='applyAll' onClick={(e)=>(this.applyToAll(e,key))}>Apply to all</button>
                    </td>
                </tr>
            );
        });
        return (
            <div className='facility-modal'>
                <section className="facility-modal-main">
                    <h3>Facility Timings</h3>
                    <table class='facilityTiming' >
                        <thead>
                            <tr>
                                <td></td>
                                <td>From</td>
                                <td>To</td>
                            </tr>
                        </thead>
                        {facilityMap}
                    </table>
                    <button onClick={this.props.hideFacilityTimingModal} class='facilityButtons'>Close</button>
                    <button onClick={this.handleSubmit} class='facilityButtons'>Submit</button>
                    {console.log(this.state)}
                </section>            
            </div>
        );
    }
}

export default FacilityTimings;