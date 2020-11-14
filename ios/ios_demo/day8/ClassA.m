//
//  ClassA.m
//  day8
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "ClassA.h"

@implementation ClassA

@synthesize name;

-(void) initVar
{
    x = 100;
}

-(void) printVar
{
    NSLog(@"printVar 方法调用 %i", x);
}

@end
