#import <React/RCTBridgeDelegate.h>
#import <Expo/Expo.h>
#import <UIKit/UIKit.h>

//#import <UMCore/UMAppDelegateWrapper.h>

//@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate>
@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
