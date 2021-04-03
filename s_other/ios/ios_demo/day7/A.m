//
//  A.m
//  day7
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "A.h"

@implementation A

@synthesize name;

-(void) say
{
    NSLog(@"say hello");
}


-(void) eat: (int) food drink: (int) joice
{
    int c;
    static int d;
    NSLog(@"吃的食物是 %i, 喝的饮料是 %i, c is %i, d is %i", food, joice, c, d);
}
@end
