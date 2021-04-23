import './ListOrderContainer.css'
import ListOrder from '../../components/listOrderComponent/ListOrder'


const ListOrderContainer = ({ openButton, item }) => {
    return (
        <div className="list-order-container">
            <ListOrder openButton={openButton} item={item} />
        </div>
    )
}

export default ListOrderContainer;