//
//  Fraction.m
//  day3
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "Fraction.h"

@implementation Fraction
{
    int numerator;
    int denominator;
    int c;
}
-(void) print
{
    NSLog(@"%i/%i", numerator, denominator);
}
-(void) setNumerator:(int)n
{
    numerator = n;
}
-(void) setDenominator:(int)d
{
    denominator = d;
}
-(int) numerator
{
    return numerator;
}
-(int) denominator
{
    return denominator;
}
@end
