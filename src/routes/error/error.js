import React , { Component } from 'react';
import Error from '../../components/404/404';
import Search from '../../components/Search/Search';

class  ErrorPag extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }


  render(){
    return(
      <div>
        <Search/>
        <Error/>
      </div>

      )

  }
}
export default ErrorPag;
