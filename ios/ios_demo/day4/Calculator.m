//
//  Calculator.m
//  day4
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "Calculator.h"

@implementation Calculator
{
    double n;
}
-(double) getN
{
    return n;
}
-(void) setN: (double) x
{
    n = x;
}
-(void) add:(double)x
{
    n += x;
}
-(void) minus:(double)x
{
    n -= x;
}
@end
