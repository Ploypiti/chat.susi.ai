import React, { Component } from 'react';
import Translate from '../../Translate/Translate.react';
import RaisedButton from 'material-ui/RaisedButton';
export default class ShareOnFacebook extends Component{
	constructor(props){
		super(props);
		this.state={
			style:{ margin:20,},
			loginStatus: 'not connected',
		};
		this.Share=this.Share.bind(this);
		this.facebookLogin=this.facebookLogin.bind(this);
		this.statusChangeCallback=this.statusChangeCallback.bind(this);
		this.testAPI=this.testAPI.bind(this);
		this.checkLoginStatus=this.checkLoginStatus.bind(this);
	}

	facebookLoginAPI() {
    window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '136831073699181',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.11'
    });
    window.FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = 'https://connect.facebook.net/en_US/sdk.js';
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
		  }
		  componentDidMount()
      {
				this.facebookLoginAPI();
			}
			testAPI()
      {
				window.FB.api('/me', function(response){});
				this.setState({loginStatus:'connected'});
			}
			statusChangeCallback (response)
      {
				if (response.status === 'connected')
        {
				  this.testAPI();
				} else if (response.status === 'not_authorized')
        {
					// console.log("login to SUSI");
				} else
        {
					// console.log("login to facebook.");
				}
			}

			checkLoginStatus()
      {
	      window.FB.getLoginStatus(function(response)
        {
          this.statusChangeCallback(response);
	      }.bind(this));
			}

			  facebookLogin()
        {
				      window.FB.login(this.checkLoginStatus);
				}

				Share(){
          if(this.state.loginStatus === 'connected' || this.state.loginStatus === 'not connected')
          {
            window.FB.ui({
            method: 'feed',
            link: 'https://chat.susi.ai',
            caption: 'SUSI by FOSSASIA',
            }, function(response){});
          }
				}

    render(){
        return (
					<div>
						<div>
							<div style={{
								marginTop: '10px',
								'marginBottom':'0px',
								fontSize: '15px',
								fontWeight: 'bold'}}>
								<Translate text="Share about SUSI on Facebook"/>
								<br/>
								<RaisedButton label="Share" onClick={this.Share} style={this.state.style}/>
							</div>
						</div>
					</div>
        );
    }
}
// Resources:
// https://developers.facebook.com/docs/facebook-login/web
// https://developers.facebook.com/docs/sharing/reference/share-dialog
// https://developers.facebook.com/docs/sharing/reference/feed-dialog
// https://developers.facebook.com/docs/javascript/quickstart
