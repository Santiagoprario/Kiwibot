import React from 'react';
import { useState , useEffect} from 'react';
import styles from './Styles/Deliveries.module.css';
import Axios  from 'axios';
import axios from '../../../Api/node_modules/axios';
import Delivery from './Delivery';
import Details from './Details';

function Deliveries() {
    
    const [state, setState] = useState({
        deliveries : [],                       
        filteredDeliveries : false,
        filter : '',
    });

    const [details,setDetails]= useState({
        order : false,
        show: false,
    })
    
    const getInfo = () => {
      if (state.filter === 'asc') {
          return state;
      }
      axios.get(`http://localhost:3001/`)
      .then((response) => { 
        setState({ 
         ...state,
         deliveries : response.data.map( d => d._fieldsProto),
         filter: 'asc',
        }) 
        })
    };

    useEffect(() => {
        getInfo()
    }, [])

    const filterAsc = () => {
        let sort = state.deliveries.sort((a,b) => {return a.creation_date.timestampValue.seconds - b.creation_date.timestampValue.seconds})
        console.log(sort)
        setState({
            ...state,
            filteredDeliveries : false,
        })
    }
    const filterDesc = () => {
        let sort = state.deliveries.sort((a,b) => {return b.creation_date.timestampValue.seconds - a.creation_date.timestampValue.seconds})
        setState({
            ...state,
            filteredDeliveries : false,
        })
    }

    const filterState = (filter) => {
       let sort = state.deliveries.filter(a => a.state.stringValue === filter)
        console.log(sort)
        setState({
        ...state,
        filteredDeliveries : sort,
        filter : filter,
       })
    }  
    const filterChange = function(e) {
        filterState(e.target.value)
      }
 
    const searchId = (id) => {
        let orderId = state.deliveries.filter(a => a.id.stringValue === id)
        setDetails({
            ...details,
            order: orderId[0],
            show: true,
        })
        return details
    }
    
    return (
        <div className={styles.container}>
          <div className={styles.deliveries}>
              <h4>Deliveries</h4>
              <Delivery className={styles.header}/>
              <ul className={styles.list}
                  onClick={(e) => {
                      searchId(e.target.innerText)
                      console.log(details.order)
                    }} 
              >{
                                    state.filteredDeliveries ? state.filteredDeliveries?.map(d => <Delivery
                                        key={d?.id.stringValue}
                                        id={d?.id.stringValue}
                                        state={d?.state.stringValue}
                                        date={d?.creation_date.timestampValue.seconds}
                                        pickup={d?.pickup}
                                        dropoff={d?.dropoff}
                                        
                                    />)
                                    : state.deliveries?.map(d => <Delivery
                                        key={d?.id.stringValue}
                                        id={d?.id.stringValue}
                                        state={d?.state.stringValue}
                                        date={d?.creation_date.timestampValue.seconds}
                                        pickup={d?.pickup}
                                        dropoff={d?.dropoff}  
                                    />)
                                }
                </ul>
                <section className={styles.filters}>
                <button onClick={filterAsc}>ASC</button>
                <button onClick={filterDesc}>DESC</button>
                <select className={styles.filterState}  onChange={filterChange} name="filter" id="" >
                    <option disabled selected>Filtrar por Estado</option>
                    <option value="Pending"  >Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In_transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                </select>
                </section>          
         </div> 
          <div className={styles.bots}> 
            <h2>Detalles de Ordenes</h2>
            {details.show ? <Details key={details.order?.id.stringValue}
                                        id={details.order?.id.stringValue}
                                        state={details.order?.state.stringValue}
                                        date={details.order?.creation_date?.timestampValue.seconds}
                                        pickup={details.order?.pickup}
                                        dropoff={details.order?.dropoff} /> : <h4>Por favor, seleccione sobre el numero de Orden para ver los detalles</h4>}

          </div>
        </div>
    )
}

export default Deliveries
