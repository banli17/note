//
//  ViewController.m
//  SampleApp
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "ViewController.h"

@interface TestView : UIView

@end

@implementation TestView

- (instancetype) init{
    self = [super init];
    if(self){
        
    }
    return self;
}

-(void) willMoveToSuperview:(UIView *)newSuperview
{
    [super willMoveToSuperview: newSuperview];
}

-(void) didMoveToSuperview
{
    [super didMoveToSuperview];
}

-(void)willMoveToWindow:(UIWindow *)newWindow
{
    [super willMoveToWindow: newWindow];
}

-(void)didMoveToWindow
{
    [super didMoveToWindow];
}
@end

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    

//    TestView *view = [[TestView alloc] init];
//    view.backgroundColor = [UIColor redColor];
//    view.frame = CGRectMake(100, 100, 100, 100);
//    [self.view addSubview:view];
}


@end
