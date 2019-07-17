package com.procket;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.paytm.pgsdk.PaytmOrder;
import com.paytm.pgsdk.PaytmPGService;
import com.paytm.pgsdk.PaytmPaymentTransactionCallback;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
  private static ReactApplicationContext mReactContext = null;
//  private static PaytmPGService Service = PaytmPGService.getStagingService();


  public ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
  }

  @Override
  public String getName() {
    return "Paytm";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  @ReactMethod
  public void init(String orderId, String custId, String mobile, String email,String amount, String checksum, final Callback successCallback, final Callback errorCallback) {
    PaytmPGService Service = PaytmPGService.getStagingService();
    Map<String, String> paramMap = new HashMap<String,String>();
    paramMap.put( "MID" , "gzGeYn36130961827220");
    // Key in your staging and production MID available in your dashboard
    paramMap.put( "ORDER_ID" , orderId);
    paramMap.put( "CUST_ID" , custId);
    paramMap.put( "MOBILE_NO" , mobile);
    paramMap.put( "EMAIL" , email);
    paramMap.put( "CHANNEL_ID" , "WAP");
    paramMap.put( "TXN_AMOUNT" , amount);
    paramMap.put( "WEBSITE" , "WEBSTAGING");
    // This is the staging value. Production value is available in your dashboard
    paramMap.put( "INDUSTRY_TYPE_ID" , "Retail");
    // This is the staging value. Production value is available in your dashboard
    paramMap.put( "CALLBACK_URL", "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderId);
    paramMap.put( "CHECKSUMHASH" , checksum);
    Log.d("paramsMap", paramMap.toString());
    PaytmOrder Order = new PaytmOrder((HashMap<String, String>) paramMap);
    Log.d("paytm order", Order.toString());
    Service.initialize(Order, null);
    Service.startPaymentTransaction(getCurrentActivity(), true, true, new PaytmPaymentTransactionCallback() {
      /*Call Backs*/
      public void someUIErrorOccurred(String inErrorMessage) {
        errorCallback.invoke("someUIErrorOccurred" + inErrorMessage);
        Log.d("paytm", inErrorMessage);
      }
      public void onTransactionResponse(Bundle inResponse) {
        Log.d("paytm", "onTransactionResponse");
        successCallback.invoke("onTransactionResponse" + inResponse.toString());
      }
      public void networkNotAvailable() {
        errorCallback.invoke("networkNotAvailable");
        Log.d("paytm", "networkNotAvailable");
      }
      public void clientAuthenticationFailed(String inErrorMessage) {
        errorCallback.invoke("someUIErrorOccurred" + inErrorMessage);
        Log.d("paytm", inErrorMessage);
      }
      public void onErrorLoadingWebPage(int iniErrorCode, String inErrorMessage, String inFailingUrl) {
        errorCallback.invoke("someUIErrorOccurred" + inErrorMessage + inFailingUrl);
        Log.d("paytm", inErrorMessage);
      }
      public void onBackPressedCancelTransaction() {
        errorCallback.invoke("onBackPressedCancelTransaction");
        Log.d("paytm", "onBackPressedCancelTransaction");
      }
      public void onTransactionCancel(String inErrorMessage, Bundle inResponse) {
        errorCallback.invoke("onTransactionCancel" + inErrorMessage);
        Log.d("paytm", inErrorMessage);
      }
    });
  }
}
