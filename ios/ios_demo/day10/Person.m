//
//  Person.m
//  day10
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "Person.h"

@implementation Person

@synthesize name;
@synthesize age;

-(instancetype) init
{
    self = [super init];
    if(self){
        name = @"hello";
        age = 12;
        NSLog(@"Person init 初始化,%@,  %i",name, age);
    }
    return self;
}
@end
