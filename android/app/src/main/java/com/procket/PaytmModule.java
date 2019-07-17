package com.procket;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.paytm.pgsdk.PaytmPGService;

class PaytmModule extends ReactContextBaseJavaModule {
  ReactApplicationContext mReactContext;
  PaytmPGService Service;

  public PaytmModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
    Service = PaytmPGService.getStagingService();
  }


  @Override
  public String getName() {
    return "PaytmModule";
  }

  public void init(final Callback successCallback, final Callback errorCallback) {

  }


}
