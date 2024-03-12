import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class GroupList extends Component{
    state = {
        groupList: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        fetch('/data/groups.json')
            .then((res) => res.json())
            .then((data) => this.onGroupListLoaded(data))
            .catch(this.onError)
    }

    onGroupListLoaded = (groupList) => {
        
        this.setState(() => (
            {
                groupList: [...groupList], 
                loading: false,
            }
        ))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    renderItems(arr) {
        const items =  arr.map((item, i) => {
            
            const closed = (item.closed) ? 'Открытая' : 'Закрытая'
            
            return (
                <div 
                    className="char__item"
                    key={item.id}
                    
                    >
                        <div className="title">Название: {item.name}</div>
                        <div className="closed">Открытость: {closed}</div>
                        <div className="avatar" style={{width: "100px", height: "100px", borderRadius: "100%", backgroundColor: `${item.avatar_color}`}}></div>
                        <div className="closed">members: {item.members_count}</div>

                </div>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <div className="char__grid">
                {items}
            </div>
        )
    }

    render() {
        const {groupList, loading, error} = this.state;
        
        const items = this.renderItems(groupList);
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div>
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

export default GroupList;