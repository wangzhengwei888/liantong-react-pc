import React , { Component } from 'react';
import Error from '../../components/404/404';

class  ErrorPag extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }


  render(){
    return(
      <div>
        <Error/>
      </div>

      )

  }
}
export default ErrorPag;
