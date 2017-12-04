package care.temis.app;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.magus.fblogin.FacebookLoginPackage;
import com.reactnativenavigation.NavigationApplication;
import io.fixd.rctlocale.RCTLocalePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new FacebookLoginPackage(),
      new RNI18nPackage(),
      new RCTLocalePackage(),
      BugsnagReactNative.getPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    BugsnagReactNative.start(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
