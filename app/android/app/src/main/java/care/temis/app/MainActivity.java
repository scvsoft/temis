package care.temis.app;

import android.os.Bundle;

import com.crashlytics.android.Crashlytics;
import com.reactnativenavigation.controllers.SplashActivity;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends SplashActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
    }
}
