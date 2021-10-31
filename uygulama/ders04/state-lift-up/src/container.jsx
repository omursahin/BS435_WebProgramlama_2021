import React, {Component} from 'react';
import Counter from "./counter";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { containerCounter: 0 }
    }
    containerIncrease = () => {
        this.setState(prev=>({containerCounter: prev.containerCounter+1}))
    }
    containerDecrease = () => {
        this.setState(prev=>({containerCounter: prev.containerCounter-1}))
    }
    render() {
        const n = this.props.counternumber ? this.props.counternumber : 1;

        return (
            <div>
                <h4>Counter</h4>

                {
                    /*
                    Her child component'e global sayaç değerini ve bunu değiştirmek için yazmış olduğumuz fonksiyonları gönderiyoruz.
                    Child component içinde bu fonksiyonların çağırılması ile birlikte parent componentteki state değişmiş oluyor.
                    props olarak gönderdiğimiz için child componentta this.props ile erişim sağlayabilirsiniz.
                    */
                    Array.from(Array(n)).map(
                        (e,i)=> <Counter
                                         key={i}
                                         containerValue={this.state.containerCounter}
                                         containerIncrease={this.containerIncrease}
                                         containerDecrease={this.containerDecrease}
                        />

                    )
                }
                 </div>
        );
    }
}

export default Container;