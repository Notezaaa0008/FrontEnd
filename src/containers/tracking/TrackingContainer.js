import Search from '../../components/trackingComponent/search/Search';
import ListOrderContainer from '../listOrder/ListOrderContainer';
import './TrackingContainer.css';
import { useSelector } from 'react-redux';

const TrackingContainer = () => {
    const item = useSelector((state) => state.search.order);
    const track = useSelector((state) => state.search.track);

    return (
        <div className="track-container">
            <div className="track-search-box">
                <div><h1>Track&amp;Trace</h1></div>
                <div>
                    <Search />
                </div>
            </div>
            <div className="track-list">
                {track && <div className="track-list-inner">
                    <ListOrderContainer openButton={false} item={item} />
                </div>}


            </div>
        </div>
    )
}
export default TrackingContainer;