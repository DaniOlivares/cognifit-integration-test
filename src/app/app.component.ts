import {Component} from '@angular/core';
import { CognifitSdk } from '@cognifit/launcher-js-sdk';
import { CognifitSdkConfig } from '@cognifit/launcher-js-sdk/lib/lib/cognifit.sdk.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cognifit-integration-test';
  clientId = '';
  userToken = '';
  productType = 'ASSESSMENT';
  productKey = '';

  containerId = 'cognifitContainer';

  startCognifit() {
    if(!this._validateInputs()){
      alert('Every field is mandatory.');
      return false;
    }

    const cognifitSdkConfig = new CognifitSdkConfig(
      this.containerId,
      this.clientId,
      this.userToken,
      {
        sandbox: false,            // Default false.
        appType: 'web',           // 'web' or 'app'.
        theme: 'light',           // 'light' or 'dark'.
        showResults: false,
        customCss: '',            // Url to custom css file.
        screensNotToShow: [],     // List of screens not to show after the session.
        scale: 100,               // Default 800. Maximum value used to display values.
        listenEvents: true        // Default false. If true, events will be triggered during session life.
      }
    );

    const cognifitSdk = new CognifitSdk();

    cognifitSdk.init(cognifitSdkConfig).then(response => {

      cognifitSdk.start(
        this.productType,
        this.productKey
      ).subscribe({
        next: (cognifitSdkResponse) => {
          if (cognifitSdkResponse.isSessionCompleted()) {
            cognifitSdkResponse.typeValue;
            cognifitSdkResponse.keyValue;
          }
          if (cognifitSdkResponse.isSessionAborted()) {

          }
          if (cognifitSdkResponse.isErrorLogin()) {

          }
          if (cognifitSdkResponse.isEvent()) {
            const eventPayloadValues = cognifitSdkResponse.eventPayload.getValues();
          }
        },
        complete: () => {

        },
        error: (reason) => {
          console.log(reason)
        }
      });

    }).catch(error => {
      console.log(error);
    });

    return true;
  }

  private _validateInputs(){
    return this.clientId !== ''
      && this.clientId !== ''
      && this.productType !== ''
      && this.productKey !== ''
  }


}
